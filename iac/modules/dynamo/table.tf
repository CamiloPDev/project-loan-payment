resource "aws_dynamodb_table" "table" {
  provider = aws.main

  name = "table-loan-${var.table_name}-${var.env}"

  billing_mode = "PAY_PER_REQUEST"
  hash_key     = var.hash_key

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }
}