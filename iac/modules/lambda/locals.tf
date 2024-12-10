locals {
  lambda_name = "lambda-loan-${var.lambda_name}-${var.env}"
  rol_name    = "role-${local.lambda_name}"
  policy_name = "policy-${local.rol_name}"
}