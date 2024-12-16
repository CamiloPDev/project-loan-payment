locals {
  tables = {
    payment = {
      hash_key = "paymentId"
      attributes = [
        {
          name = "paymentId"
          type = "S"
        }
      ]
    }
    loan = {
      hash_key = "loanId"
      attributes = [
        {
          name = "loanId"
          type = "S"
        }
      ]
    }
    client = {
      hash_key = "clientId"
      attributes = [
        {
          name = "clientId"
          type = "N"
        }
      ]
    }
  }
}

module "tables" {
  providers = {
    aws.main = aws.main
  }
  source = "./modules/dynamo"

  for_each = local.tables

  table_name = each.key
  env        = var.env
  hash_key   = each.value.hash_key
  attributes = each.value.attributes
}