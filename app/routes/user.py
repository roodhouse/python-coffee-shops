from os import getenv
import sys
from dotenv import load_dotenv
import json
from flask import Blueprint, jsonify, request, session
from app.models import Users
from app.db import get_db
import logging

load_dotenv()

user_bp = Blueprint("user", __name__, url_prefix="/")

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
    return jsonify(id = newUser.id)

# logout route
@user_bp.route('users/logout', methods=['POST'])
def logout():
    session.clear()
    return '', 204

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
                'email' : user.email
            }
            return jsonify(user_info)
    # return an error if user is not found
    return jsonify(message='Not authenticated')

# update user with reviews
@user_bp.route('api/user/<int:id>', methods=['PUT'])
def update_user(id):
    db = get_db()

    if 'user_id' in session and session['loggedIn']:
        user_id = session['user_id']
        user = db.query(Users).filter_by(id=user_id).one_or_none()

    if user:
        try:
            # update user with review
            reviews_ids_data = user.review_ids or {}
            new_review_data = request.get_json('venue', {})
            reviews_ids_data = {**reviews_ids_data, **new_review_data}
            user.review_ids = reviews_ids_data
            
            db.commit()
            return jsonify({'message': 'Review added to user'})
        
        except KeyError as e:
            logging.error(f'KeyError: {e}')
            db.rollback()
            return jsonify(message = 'Invalid data'), 400
    else:
        return jsonify({'error': 'Review not added to user'}), 404