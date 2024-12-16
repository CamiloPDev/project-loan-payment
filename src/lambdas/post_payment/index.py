from datetime import datetime
import os
import boto3
import json
import uuid


TABLE_PAYMENT = os.getenv('TABLE_PAYMENT')

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(TABLE_PAYMENT)

def handler(event, context):
    try:
        body = json.loads(event['body'])
        
        required_fields = [
            'loanId',
            'amountPass',
            'amountInterest'
        ]
        for field in required_fields:
            if field not in body:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"error": f"El campo '{field}' es obligatorio."})
                }
        
        payment_id = str(uuid.uuid4())

        new_loan = {
            'paymentId': payment_id,
            'loanId': body['loanId'],
            'date': str(datetime.now().date()),
            'amountPass': body['amountPass'],
            'amountInterest': body['amountInterest'],
            'total': body['interestRate'] + body['amountPass']
        }
        
        table.put_item(Item=new_loan)
        
        return {
            "statusCode": 201,
            "body": json.dumps(
                {
                    "message": "Pago creado exitosamente.",
                    "cliente": new_loan
                }
            )
        }
    
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

