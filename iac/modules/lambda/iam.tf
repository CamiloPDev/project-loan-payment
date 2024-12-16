data "aws_iam_policy_document" "assume_role" {
  provider = aws.main

  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]

    condition {
      variable = "aws:SourceArn"
      test     = "ArnLike"
      values   = ["arn:aws:lambda:${data.aws_region.current.id}:${data.aws_caller_identity.current.account_id}:function:${local.lambda_name}"]
    }
  }
}

data "aws_iam_policy_document" "custom" {
  provider = aws.main

  count = length(var.lambda_policies) > 0 ? 1 : 0

  dynamic "statement" {
    for_each = var.lambda_policies
    content {
      sid       = statement.value.sid
      actions   = statement.value.actions
      effect    = statement.value.effect
      resources = statement.value.resources
    }
  }
}

resource "aws_iam_role" "rol" {
  provider = aws.main

  name = local.rol_name

  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_policy" "custom_policy" {
  provider = aws.main

  count = length(var.lambda_policies) > 0 ? 1 : 0

  name   = local.policy_name
  policy = data.aws_iam_policy_document.custom[0].json
}

resource "aws_iam_role_policy_attachment" "attachment" {
  provider = aws.main

  count = length(var.lambda_policies) > 0 ? 1 : 0

  role       = aws_iam_role.rol.name
  policy_arn = aws_iam_policy.custom_policy[0].arn
}

resource "aws_iam_role_policy_attachment" "attachment_basic_policy" {
  provider = aws.main

  role       = aws_iam_role.rol.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}