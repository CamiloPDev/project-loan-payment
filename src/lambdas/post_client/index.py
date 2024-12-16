import os
import boto3
import json

TABLE_CLIENT = os.getenv('TABLE_CLIENT')

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(TABLE_CLIENT)

def handler(event, context):
    try:
        body = json.loads(event['body'])
        
        required_fields = ['clientId', 'name', 'phoneNumber']
        for field in required_fields:
            if field not in body:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"error": f"El campo '{field}' es obligatorio."})
                }
        
        new_client = {
            'clientId': body['clientId'],
            'name': body['name'],
            'phoneNumber': body['phoneNumber']
        }
        
        table.put_item(Item=new_client)
        
        return {
            "statusCode": 201,
            "body": json.dumps(
                {
                    "message": "Cliente creado exitosamente.",
                    "cliente": new_client
                }
            )
        }
    
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

