terraform {
  required_version = "1.6.6"

  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "5.78.0"
        configuration_aliases = [ aws.main ]
    }
  }
}