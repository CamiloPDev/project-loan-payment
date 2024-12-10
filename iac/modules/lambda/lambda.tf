resource "aws_lambda_function" "lambda" {
  provider = aws.main

  function_name = local.lambda_name

  role         = aws_iam_role.rol.arn
  package_type = "Zip"
  filename     = "${path.module}/lambda.zip"
  handler      = var.handler
  runtime      = "python3.13"
}