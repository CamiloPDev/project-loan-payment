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

variable "lambda_policies" {
  description = "Lista de politicas de la lambda"
  type = list(
    object(
      {
        sid = optional(string)
        actions = list(string)
        effect = string
        resources = list(string)
      }
    )
  )
  default = []
}

variable "source_api_permission" {
  description = "Dirreccion del path de la api que va a invocar a la lambda"
  type = string
  nullable = false
}