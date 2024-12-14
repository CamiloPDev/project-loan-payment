variable "table_name" {
  description = "nombre de la tabla"
  type        = string
  nullable    = true
}

variable "env" {
  description = "env del proyecto"
  type        = string
  nullable    = false
}

variable "attributes" {
  description = "atributos de la base de datos"
  type = list(
    object(
      {
        name = string
        type = string
      }
    )
  )
  validation {
    condition = alltrue([
      for atribute in var.attributes : contains(["S", "N", "B"], atribute.type)
    ])
    error_message = "Solo pueden existir los types, S(string), N(number), B(binary)"
  }
}

variable "hash_key" {
  description = "hast key de la tabla de dynamo."
  type        = string
  nullable    = false
}