locals {
  project_tags = {
    # owner = "Camilo Perez"
  }

  api_configuration = {
    get_client = {
      resource_id       = aws_api_gateway_resource.client.id
      http_method       = "GET"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("get_client", "_", "-")}-${var.env}/invocations"
    }
    post_client = {
      resource_id       = aws_api_gateway_resource.client.id
      http_method       = "POST"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("post_client", "_", "-")}-${var.env}/invocations"
    }
    get_client_id = {
      resource_id       = aws_api_gateway_resource.client_id.id
      http_method       = "GET"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("get_client_id", "_", "-")}-${var.env}/invocations"
    }
    put_client_id = {
      resource_id       = aws_api_gateway_resource.client_id.id
      http_method       = "PUT"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("put_client_id", "_", "-")}-${var.env}/invocations"
    }
    delete_client_id = {
      resource_id       = aws_api_gateway_resource.client_id.id
      http_method       = "DELETE"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("delete_client_id", "_", "-")}-${var.env}/invocations"
    }
    get_payment = {
      resource_id       = aws_api_gateway_resource.payment.id
      http_method       = "GET"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("get_payment", "_", "-")}-${var.env}/invocations"
    }
    post_payment = {
      resource_id       = aws_api_gateway_resource.payment.id
      http_method       = "POST"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("post_payment", "_", "-")}-${var.env}/invocations"
    }
    get_payment_id = {
      resource_id       = aws_api_gateway_resource.payment_id.id
      http_method       = "GET"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("get_payment_id", "_", "-")}-${var.env}/invocations"
    }
    put_payment_id = {
      resource_id       = aws_api_gateway_resource.payment_id.id
      http_method       = "PUT"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("put_payment_id", "_", "-")}-${var.env}/invocations"
    }
    delete_payment_id = {
      resource_id       = aws_api_gateway_resource.payment_id.id
      http_method       = "DELETE"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("delete_payment_id", "_", "-")}-${var.env}/invocations"
    }
    get_payment_loan_id = {
      resource_id       = aws_api_gateway_resource.payment_loan_id.id
      http_method       = "GET"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("get_payment_loan_id", "_", "-")}-${var.env}/invocations"
    }
    get_loan = {
      resource_id       = aws_api_gateway_resource.loan.id
      http_method       = "GET"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("get_loan", "_", "-")}-${var.env}/invocations"
    }
    post_loan = {
      resource_id       = aws_api_gateway_resource.loan.id
      http_method       = "POST"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("post_loan", "_", "-")}-${var.env}/invocations"
    }
    get_loan_id = {
      resource_id       = aws_api_gateway_resource.loan_id.id
      http_method       = "GET"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("get_loan_id", "_", "-")}-${var.env}/invocations"
    }
    put_loan_id = {
      resource_id       = aws_api_gateway_resource.loan_id.id
      http_method       = "PUT"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("put_loan_id", "_", "-")}-${var.env}/invocations"
    }
    delete_loan_id = {
      resource_id       = aws_api_gateway_resource.loan_id.id
      http_method       = "DELETE"
      lambda_invoke_arn = "arn:aws:apigateway:${data.aws_region.current.id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:lambda-loan-${replace("delete_loan_id", "_", "-")}-${var.env}/invocations"
    }
  }
}