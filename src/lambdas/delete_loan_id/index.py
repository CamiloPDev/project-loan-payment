import os
import boto3

table_name = os.getenv('')

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(table_name)

def handler(event, context):
    
    return True
