locals {
  relevant_properties = [
    for k, r in var.api_configuration : {
      resource_id       = r.resource_id
      http_method       = r.http_method
      authorization     = r.authorization
      lambda_invoke_arn = r.lambda_invoke_arn
    }
  ]
}