locals {
  project_tags = {
    # owner = "Camilo Perez"
  }

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