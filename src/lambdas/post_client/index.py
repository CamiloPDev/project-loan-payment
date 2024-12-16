import os
import boto3
import uuid
import json


table_name = os.getenv('TABLE_CLIENT')

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(table_name)

def handler(event, context):
    try:
        # Cargar el cuerpo de la solicitud
        body = json.loads(event['body'])
        
        # Validar los campos requeridos
        required_fields = ['name', 'phoneNumber']
        for field in required_fields:
            if field not in body:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"error": f"El campo '{field}' es obligatorio."})
                }
        
        # Generar clientId único
        client_id = str(uuid.uuid4())
        
        # Crear el cliente
        nuevo_cliente = {
            'clientId': client_id,
            'name': body['name'],
            'phoneNumber': body['phoneNumber']
        }
        
        # Guardar en DynamoDB
        table.put_item(Item=nuevo_cliente)
        
        # Respuesta exitosa
        return {
            "statusCode": 201,
            "body": json.dumps(
                {
                    "message": "Cliente creado exitosamente.",
                    "cliente": nuevo_cliente
                }
            )
        }
    
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

