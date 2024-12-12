resource "aws_api_gateway_method" "methods" {
  provider = aws.main

  for_each = var.api_configuration

  rest_api_id   = var.api_id
  authorization = each.value.authorization
  http_method   = each.value.http_method
  resource_id   = each.value.resource_id
}

resource "aws_api_gateway_integration" "integration" {
  provider = aws.main

  for_each = var.api_configuration

  rest_api_id             = var.api_id
  type                    = "AWS_PROXY"
  http_method             = aws_api_gateway_method.methods[each.key].http_method
  integration_http_method = "POST"
  resource_id             = each.value.resource_id
  uri                     = each.value.lambda_invoke_arn
}

resource "aws_api_gateway_deployment" "deploy" {
  provider = aws.main

  rest_api_id = var.api_id

  triggers = {
    redeployment = sha1(jsonencode(
      [
        local.relevant_properties
      ]
    ))
  }

  lifecycle {
    create_before_destroy = true
  }
}