locals {
  tables = {
    payment = {
      hash_key = "testkey"
      attributes = [
        {
          name = "testkey"
          type = "S"
        }
      ]
    }
    loan = {
      hash_key = "testkey"
      attributes = [
        {
          name = "testkey"
          type = "S"
        }
      ]
    }
    client = {
      hash_key = "testkey"
      attributes = [
        {
          name = "testkey"
          type = "S"
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