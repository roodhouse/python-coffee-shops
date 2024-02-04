import sys
from os import getenv
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request, session, make_response
from app.models import Users
from app.db import get_db
import logging
import jwt
import datetime
from functools import wraps

load_dotenv()

SECRET_KEY = getenv('SECRET_KEY')

user_bp = Blueprint("user", __name__, url_prefix="/")

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
        except:
            return jsonify({'message': 'Token is invalid'}), 403
        
        return f(current_user, *args, **kwargs)
    
    return decorated

# login route
@user_bp.route("/users/login", methods=['POST'])
def login():
    data = request.get_json()
    db = get_db()

    try:
        user = db.query(Users).filter(Users.email == data['email']).one()
    except:  # noqa: E722
        print(sys.exc_info()[0])
        return jsonify(message = 'Incorrect credentials'), 400
    
    if user.verify_password(data['password']) == False:
        return jsonify(message = "Incorrect credentials"), 400
    
    session.clear()
    session['user_id'] = user.id
    session['loggedIn'] = True

    return jsonify(id = user.id)

# base user route
@user_bp.route('/users', methods=['POST'])
def signup():
    data = request.get_json()
    db = get_db()

    try:
        # attempt to create new user
        newUser = Users(
            email = data['email'],
            password = data['password']
        )

        # save to db
        db.add(newUser)
        db.commit()

    except:  # noqa: E722
        # insert failed, send error to frontend
        print(sys.exc_info()[0])
        # insert failed, rollback and send error to frontend
        db.rollback()
        return jsonify(message = 'Signup failed'), 500
    
    session.clear()
    session['user_id'] = newUser.id
    session['loggedIn'] = True
    session.permanent = True
    return jsonify(id = newUser.id)

# logout route
@user_bp.route('users/logout', methods=['POST'])
def logout():
    session.clear()
    return '', 204

# get user info
@user_bp.route('/api/user', methods=['GET'])
def get_user_info():
    db = get_db()
    # check if user is authenticated
    if 'user_id' in session and session['loggedIn']:
        # retrieve user info based on user_id
        user_id = session['user_id']
        user = db.query(Users).filter_by(id=user_id).first()

        if user:
            # serialize user info and send back as json
            user_info = {
                'user_id' : user.id,
                'email' : user.email,
                'reviews' : user.review_ids
            }
            return jsonify(user_info)
    # return an error if user is not found
    return jsonify(message='Not authenticated')

# update user with reviews
@user_bp.route('api/user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    db = get_db()

    print(data)

    if 'user_id' in session and session['loggedIn']:
        user_id = session['user_id']
        user = db.query(Users).filter_by(id=user_id).one_or_none()

    if user:
        try:
            # update user with review
            new_review_data = request.get_json(force=True).get('venue', [])
            user.review_ids = new_review_data
            
            db.commit()
            return jsonify({'message': 'Review added to user'})
        
        except KeyError as e:
            logging.error(f'KeyError: {e}')
            db.rollback()
            return jsonify(message = 'Invalid data'), 400
    else:
        return jsonify({'error': 'Review not added to user'}), 404