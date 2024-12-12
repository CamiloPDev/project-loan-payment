resource "aws_api_gateway_rest_api" "api" {
  provider = aws.main

  name        = "api-project-loan-${var.env}"
  description = "Api que maneja la logica del proyecto"

  tags = local.project_tags
}

resource "aws_api_gateway_resource" "root" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id

  path_part = "api"
}

resource "aws_api_gateway_stage" "name" {
  provider = aws.main

  stage_name    = var.env
  deployment_id = aws_api_gateway_deployment.deploy.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

# ---------- Client ---------- #
resource "aws_api_gateway_resource" "client" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.root.id

  path_part = "client"
}

resource "aws_api_gateway_resource" "client_id" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.client.id

  path_part = "{client_id}"
}

# ---------- Payment ---------- #
resource "aws_api_gateway_resource" "payment" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.root.id

  path_part = "payment"
}

resource "aws_api_gateway_resource" "payment_id" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.payment.id

  path_part = "{payment_id}"
}


resource "aws_api_gateway_resource" "payment_loan" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.payment.id

  path_part = "loan"
}

resource "aws_api_gateway_resource" "payment_loan_id" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.payment_loan.id

  path_part = "{loan_id}"
}

# ---------- Loan ---------- #
resource "aws_api_gateway_resource" "loan" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.root.id

  path_part = "loan"
}

resource "aws_api_gateway_resource" "loan_id" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.loan.id

  path_part = "{loan_id}"
}

# --------- Methods and Integration
module "api_configuration" {
  providers = {
    aws.main = aws.main
  }
  source = "./modules/api_methods_integration"

  api_id            = aws_api_gateway_rest_api.api.id
  api_configuration = local.api_configuration
}

resource "aws_api_gateway_deployment" "deploy" {
  provider = aws.main

  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode(
      [
        aws_api_gateway_rest_api.api.body,
        aws_api_gateway_rest_api.api.policy
      ]
    ))
  }

  depends_on = [module.api_configuration]
}