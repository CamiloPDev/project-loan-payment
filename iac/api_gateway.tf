resource "aws_api_gateway_rest_api" "api" {
  provider = aws.main

  name = "api-project-loan-${var.env}"
  description = "Api que maneja la logica del proyecto"

  tags = local.project_tags
}

resource "aws_api_gateway_resource" "root" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_rest_api.api.root_resource_id

  path_part = "v1"
}

# ---------- Client ---------- #
resource "aws_api_gateway_resource" "client" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.root.id

  path_part = "client"
}

resource "aws_api_gateway_resource" "client_id" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.client.id

  path_part = "{client_id}"
}


# ---------- Payment ---------- #
resource "aws_api_gateway_resource" "payment" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.root.id

  path_part = "payment"
}

resource "aws_api_gateway_resource" "payment_loan_id" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.payment.id

  path_part = "{loan_id}"
}

resource "aws_api_gateway_resource" "payment_id" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.payment.id

  path_part = "{payment_id}"
}

# ---------- Loan ---------- #
resource "aws_api_gateway_resource" "loan" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.root.id

  path_part = "loan"
}

resource "aws_api_gateway_resource" "loan_id" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.loan.id

  path_part = "{loan_id}"
}

# ---------- Deploy ---------- #
# resource "aws_api_gateway_deployment" "example" {
#   provider = aws.main
#   rest_api_id = aws_api_gateway_rest_api.api.id

#   triggers = {
#     redeployment = sha1(jsonencode(
#       [
#         aws_api_gateway_resource.example.id,
#         aws_api_gateway_method.example.id,
#         aws_api_gateway_integration.integration.id,
#       ]
#     ))
#   }

#   lifecycle {
#     create_before_destroy = true
#   }
# }