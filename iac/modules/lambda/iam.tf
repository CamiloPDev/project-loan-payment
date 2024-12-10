data "aws_iam_policy_document" "assume_role" {
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

resource "aws_iam_role" "rol" {
  provider = aws.main

  name = local.rol_name

  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}