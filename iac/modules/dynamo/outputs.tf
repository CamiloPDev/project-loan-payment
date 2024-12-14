output "table_arn" {
  description = "Arn de la tabla de dynamo"
  value       = aws_dynamodb_table.table.arn
}