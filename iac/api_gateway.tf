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

resource "aws_api_gateway_resource" "payment_id" {
  provider = aws.main
  
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.payment.id

  path_part = "{payment_id}"
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

# --------- Methods and Integration
module "api_configuration" {
  providers = {
    aws.main = aws.main
  }
  source = "./modules/api_methods_integration"

  api_id = aws_api_gateway_rest_api.api.id
  api_configuration = {
    get_client = {
      resource_id = aws_api_gateway_resource.client.id
      http_method = "GET"
    }
    post_client = {
      resource_id = aws_api_gateway_resource.client.id
      http_method = "POST"
    }
    get_client_id = {
      resource_id = aws_api_gateway_resource.client_id.id
      http_method = "GET"
    }
    put_client_id = {
      resource_id = aws_api_gateway_resource.client_id.id
      http_method = "PUT"
    }
    delete_client_id = {
      resource_id = aws_api_gateway_resource.client_id.id
      http_method = "DELETE"
    }
    get_payment = {
      resource_id = aws_api_gateway_resource.payment.id
      http_method = "GET"
    }
    post_payment = {
      resource_id = aws_api_gateway_resource.payment.id
      http_method = "POST"
    }
    get_payment_id = {
      resource_id = aws_api_gateway_resource.payment_id.id
      http_method = "GET"
    }
    put_payment_id = {
      resource_id = aws_api_gateway_resource.payment_id.id
      http_method = "PUT"
    }
    delete_payment_id = {
      resource_id = aws_api_gateway_resource.payment_id.id
      http_method = "DELETE"
    }
    get_payment_loan_id = {
      resource_id = aws_api_gateway_resource.payment_loan_id.id
      http_method = "GET"
    }
    get_loan = {
      resource_id = aws_api_gateway_resource.loan.id
      http_method = "GET"
    }
    post_loan = {
      resource_id = aws_api_gateway_resource.loan.id
      http_method = "POST"
    }
    get_loan_id = {
      resource_id = aws_api_gateway_resource.loan_id.id
      http_method = "GET"
    }
    put_loan_id = {
      resource_id = aws_api_gateway_resource.loan_id.id
      http_method = "PUT"
    }
    delete_loan_id = {
      resource_id = aws_api_gateway_resource.loan_id.id
      http_method = "DELETE"
    }
  }
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