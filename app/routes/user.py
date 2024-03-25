from crypt import methods
from email import message
import json
import sys
from os import getenv
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request, session
from pymysql import IntegrityError
from app.models import Users, Venues
from app.db import get_db
import logging
import jwt
import datetime
from app.utils import token_required
from app.utils import process_image

load_dotenv()

SECRET_KEY = getenv('SECRET_KEY')

user_bp = Blueprint("user", __name__, url_prefix="/")

# login route
@user_bp.route("/users/login", methods=['POST'])
def login():
    data = request.get_json()
    db = get_db()

    try:
        user = db.query(Users).filter(Users.email == data['email']).one()
        if user.verify_password(data['password']):
            # generate token
            token_data = {
                'user_id': user.id,
                'email': user.email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1) # token expires after 1 day
            }
            # encode token
            token = jwt.encode(token_data, SECRET_KEY, algorithm='HS256')
            return jsonify(token=token), 200
        else:
            return jsonify(message='Incorrect Credentials'), 400
    except Exception as e:  # noqa: E722
        # print(sys.exc_info()[0])
        print(type(e), e)
        return jsonify(message = 'Login Failed'), 500

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

        # generate token
        token_data = {
            'user_id': newUser.id,
            'email': newUser.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1) # token expires after 1 day
        }
        # encode token
        token = jwt.encode(token_data, SECRET_KEY, algorithm='HS256')
        return jsonify(token=token), 201


    except IntegrityError:  # noqa: E722
        db.rollback()
        return jsonify(message = 'Email already exists'), 400
    except Exception as e:  # noqa: E722
        db.rollback()
        return jsonify(message =str(e)), 500

# logout route
@user_bp.route('users/logout', methods=['POST'])
def logout():
    session.clear()
    return '', 204

# get user info
@user_bp.route('/api/user', methods=['GET'])
@token_required
def get_user_info(current_user, current_user_email):
    db = get_db()
    user = db.query(Users).filter_by(id=current_user).first()

    if user:
        # serialize user info and send back as json
        user_info = {
            'user_id' : user.id,
            'email' : user.email,
            'reviews' : user.review_ids,
            'avatar' : user.avatar,
            'review_content': [
                {
                    'review_id': review.id,
                    'venue_name': review.venue_name,
                    'venue_location': db.query(Venues.city).filter_by(place_id=review.venue_place_id).scalar(),
                    'answers': review.answers[0],
                    'place_id': review.venue_place_id
                }

                for review in user.reviews
            ]

        }
        return jsonify(user_info)
    
    # return an error if user is not found
    return jsonify(message='Not authenticated')

# get user individual user info
@user_bp.route('/api/user/<int:id>', methods=['GET'])
@token_required
def get_user_info_for_post(current_user, current_user_email, id):
    db = get_db()
    user = db.query(Users).filter_by(id=current_user).first()

    if user:
        # serialize user info and send back as json
        user_info = {
            'user_id' : user.id,
            'email' : user.email,
            'reviews' : user.review_ids,
            'avatar' : user.avatar
        }
        return jsonify(user_info)
    
    # return an error if user is not found
    return jsonify(message='Not authenticated')

# update user with reviews
@user_bp.route('api/user/<int:id>', methods=['PUT'])
@token_required
def update_user(current_user, current_user_email, id):
    data = request.get_json()
    db = get_db()

    user = db.query(Users).filter_by(id=current_user).one_or_none()
    
    if user and user.id == int(id):
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

# patch user with color for avatar
@user_bp.route('api/user/<int:id>', methods=['PATCH'])
def add_color_for_avatar(id):
    db = get_db()

    user = db.query(Users).filter_by(id=id).one_or_none()

    if user is None:
        return jsonify({'error': 'User not found'}), 404
    
    # check if req has a file name
    if 'file' in request.files:
        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if file:
            # save the file and process
            image_path = process_image(file, id, 'user')
            user.avatar = image_path
            db.commit()
            return jsonify({'message': 'File uploaded and user avatar updated'}), 200
        else:
            return jsonify({'error': 'Unsupported file'}), 415
    
    else:
        data = request.get_json()

        if 'avatar' in data:
            try:
                user.avatar = data['avatar']
                db.commit()
                return jsonify({'message': 'Color added to user avatar'})
            except Exception as e:
                logging.error(f'Exception: {e}')
                db.rollback()
                return jsonify({'error': 'Failed to update with color'}), 500
            
        else:
            return jsonify({'message': 'No avatar update data provided'}), 400