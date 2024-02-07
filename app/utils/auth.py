import sys
from os import getenv
from dotenv import load_dotenv
from flask import jsonify, request
import jwt
from functools import wraps

load_dotenv()

SECRET_KEY = getenv('SECRET_KEY')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing'}), 403
        
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = data['user_id']
            current_user_email = data['email']
        except:
            return jsonify({'message': 'Token is invalid'}), 403
        
        return f(current_user, current_user_email, *args, **kwargs)
    
    return decorated