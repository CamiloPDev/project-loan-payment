locals {
  base_source_api = "arn:aws:execute-api:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.api.id}/*"

  lambdas = {
    get_client = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["get_client"].http_method}${aws_api_gateway_resource.client.path}"
    }
    post_client = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["post_client"].http_method}${aws_api_gateway_resource.client.path}"
    }
    get_client_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["get_client_id"].http_method}${aws_api_gateway_resource.client_id.path}"
    }
    put_client_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["put_client_id"].http_method}${aws_api_gateway_resource.client_id.path}"
    }
    delete_client_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["delete_client_id"].http_method}${aws_api_gateway_resource.client_id.path}"
    }
    get_payment = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["get_payment"].http_method}${aws_api_gateway_resource.payment.path}"
    }
    post_payment = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["post_payment"].http_method}${aws_api_gateway_resource.payment.path}"
    }
    get_payment_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["get_payment_id"].http_method}${aws_api_gateway_resource.payment_id.path}"
    }
    put_payment_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["put_payment_id"].http_method}${aws_api_gateway_resource.payment_id.path}"
    }
    delete_payment_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["delete_payment_id"].http_method}${aws_api_gateway_resource.payment_id.path}"
    }
    get_payment_loan_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["get_payment_loan_id"].http_method}${aws_api_gateway_resource.payment_loan_id.path}"
    }
    get_loan = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["get_loan"].http_method}${aws_api_gateway_resource.loan.path}"
    }
    post_loan = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["post_loan"].http_method}${aws_api_gateway_resource.loan.path}"
    }
    get_loan_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["get_loan_id"].http_method}${aws_api_gateway_resource.loan_id.path}"
    }
    put_loan_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["put_loan_id"].http_method}${aws_api_gateway_resource.loan_id.path}"
    }
    delete_loan_id = {
      source_api_permission = "${local.base_source_api}/${local.api_configuration["delete_loan_id"].http_method}${aws_api_gateway_resource.loan_id.path}"
    }
  }
}
module "lambdas" {
  providers = {
    aws.main = aws.main
  }
  source = "./modules/lambda"

  for_each = local.lambdas

  lambda_name           = replace(each.key, "_", "-")
  env                   = var.env
  handler               = "index.handler"
  # lambda_policies       = each.value.lambda_policies
  source_api_permission = each.value.source_api_permission
}