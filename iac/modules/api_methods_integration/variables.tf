variable "api_id" {
  description = "Id de la Api"
  type = string
  nullable = false
}

variable "api_configuration" {
  description = "Configuracion de metodos, integraciones de la api"
  type = map(object(
    {
      resource_id = string
      http_method = string
      authorization = optional(string, "NONE")
    }
  ))
}