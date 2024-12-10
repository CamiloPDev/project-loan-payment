resource "aws_api_gateway_method" "methods" {
  provider = aws.main

  for_each = var.api_configuration

  rest_api_id = var.api_id
  authorization = each.value.authorization
  http_method = each.value.http_method
  resource_id = each.value.resource_id
}