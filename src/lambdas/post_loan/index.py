from datetime import datetime
import os
import boto3
import json
import uuid


TABLE_LOAN = os.getenv('TABLE_LOAN')

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(TABLE_LOAN)

def handler(event, context):
    try:
        body = json.loads(event['body'])
        
        required_fields = [
            'clientId',
            'description',
            'amount',
            'interestRate',
        ]
        for field in required_fields:
            if field not in body:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"error": f"El campo '{field}' es obligatorio."})
                }
        
        loan_id = str(uuid.uuid4())

        new_loan = {
            'loanId': loan_id,
            'clientId': body['clientId'],
            'description': body['description'],
            'amount': body['amount'],
            'interestRate': body['interestRate'],
            'startDate': str(datetime.now().date()),
            'state': 'Active',
        }
        
        table.put_item(Item=new_loan)
        
        return {
            "statusCode": 201,
            "body": json.dumps(
                {
                    "message": "Prestamo creado exitosamente.",
                    "cliente": new_loan
                }
            )
        }
    
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

