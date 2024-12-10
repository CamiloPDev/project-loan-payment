variable "env" {
  description = "env del proyecto"
  type        = string
  nullable    = false
}

variable "lambda_name" {
  description = "nombre de la lambda"
  type        = string
  nullable    = false
}

variable "handler" {
  description = "Handler de la lambda"
  type        = string
  nullable    = false
}