resource "aws_lambda_function" "lambda" {
  provider = aws.main

  function_name = local.lambda_name

  role         = aws_iam_role.rol.arn
  package_type = "Zip"
  filename     = "${path.module}/lambda.zip"
  handler      = var.handler
  runtime      = "python3.13"
  
  dynamic "environment" {
    for_each = length(var.environment) > 0 ? [true] : []
    content {
      variables = var.environment
    }
  }
}

resource "aws_lambda_permission" "apigw_lambda" {
  provider = aws.main

  function_name = aws_lambda_function.lambda.function_name
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"

  source_arn = var.source_api_permission
}