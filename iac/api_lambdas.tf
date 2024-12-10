locals {
  lambdas = {
    get_client = {

    }
    post_client = {

    }
    get_client_id = {

    }
    put_client_id = {

    }
    delete_client_id = {

    }
    get_payment = {

    }
    post_payment = {

    }
    get_payment_id = {

    }
    put_payment_id = {

    }
    delete_payment_id = {

    }
    get_payment_loan_id = {

    }
    get_loan = {

    }
    post_loan = {

    }
    get_loan_id = {

    }
    put_loan_id = {

    }
    delete_loan_id = {

    }
  }
}
module "lambdas" {
  providers = {
    aws.main = aws.main
  }
  source = "./modules/lambda"

  for_each = local.lambdas

  lambda_name = replace(each.key, "_", "-")
  env         = var.env
  handler     = "index.handler"
  lambda_policies = each.value.lambda_policies
}