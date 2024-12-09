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

resource "aws_api_gateway_method" "get_client" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.client.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "post_client" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.client.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_resource" "client_id" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.client.id

  path_part = "{client_id}"
}

resource "aws_api_gateway_method" "get_client_id" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.client_id.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "put_client_id" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "PUT"
  resource_id   = aws_api_gateway_resource.client_id.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "delete_client_id" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "DELETE"
  resource_id   = aws_api_gateway_resource.client_id.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

# ---------- Payment ---------- #
resource "aws_api_gateway_resource" "payment" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.root.id

  path_part = "payment"
}

resource "aws_api_gateway_method" "get_payment" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.payment.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "post_payment" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.payment.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_resource" "payment_id" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.payment.id

  path_part = "{payment_id}"
}

resource "aws_api_gateway_method" "get_payment_id" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.payment_id.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_resource" "payment_loan" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.payment.id

  path_part = "loan"
}

resource "aws_api_gateway_resource" "payment_loan_id" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.payment_loan.id

  path_part = "{loan_id}"
}

resource "aws_api_gateway_method" "get_payment_loan_id" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.payment_loan_id.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

# ---------- Loan ---------- #
resource "aws_api_gateway_resource" "loan" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.root.id

  path_part = "loan"
}

resource "aws_api_gateway_method" "get_loan" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.loan.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "post_loan" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.loan.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}


resource "aws_api_gateway_resource" "loan_id" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.loan.id

  path_part = "{loan_id}"
}

resource "aws_api_gateway_method" "get_loan_id" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.loan_id.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "put_loan_id" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "PUT"
  resource_id   = aws_api_gateway_resource.loan_id.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "delete_loan_id" {
  provider = aws.main

  authorization = "NONE"
  http_method   = "DELETE"
  resource_id   = aws_api_gateway_resource.loan_id.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
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