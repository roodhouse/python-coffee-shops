from crypt import methods
from operator import and_
from os import getenv
import sys
from dotenv import load_dotenv
import json
from flask import Blueprint, jsonify, request
from app.models import Reviews, Users
from app.db import get_db
import logging
from app.utils import token_required
from sqlalchemy.orm import joinedload
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound

from app.models.Venues import Venues

load_dotenv()

review_bp = Blueprint("review", __name__, url_prefix="/")

# get all reviews
@review_bp.route('/api/reviews', methods=['GET'])
def get_reviews():
    db = get_db()

    reviews = db.query(Reviews).order_by(Reviews.id).all()

    if reviews: 
        reviews_data = [
            {
                'id' : review.id,
                'venue' : review.venue_name,
                'user' : review.user_email,
                'answers' : review.answers,
                'venue_rated': review.venue_rated.place_id
            }
            for review in reviews
        ]

    return jsonify({'reviews': reviews_data})

# get individual review by id
@review_bp.route('/api/reviews/<int:id>', methods=['GET'])
def get_review(id):
    db = get_db()

    review = db.query(Reviews).filter_by(id = id).one_or_none()

    if review:
        review_details = {
           "review_id": review.id,
           "venue": review.venue_name,
           "user": review.user_email,
           "answers": review.answers,
           "date" : review.date
        }
        return jsonify(review_details)
    else: 
        return jsonify({"error": "review not found"}), 404

# get individual review by email
@review_bp.route('/api/reviews/<string:place_id>/<string:user_email>', methods=['GET'])
@token_required
def get_user_review(current_user, current_user_email, place_id, user_email):
    db = get_db()
    user = db.query(Users).filter_by(id=current_user).one_or_none()
    if user.email != user_email:
        return jsonify({'error': 'Unauthorized access to this review'}), 403

    # review = db.query(Reviews).join(Venues, Reviews.venue_name == Venues.name).filter(Venues.place_id == place_id, Reviews.user_email == user_email).options(joinedload(Reviews.venue_rated)).one_or_none()

    review = db.query(Reviews)\
        .join(Venues, Reviews.venue_name == Venues.name)\
        .filter(Venues.place_id == place_id, Reviews.user_email == user_email)\
        .options(joinedload(Reviews.venue_rated))\
        .one_or_none()

    # review = db.query(Reviews).filter(Reviews.venue_rated.place_id == place_id)    

    if review:
        
        venue_rated = {
            'place_id': review.venue_rated.place_id
        }

        review_details = {
           "review_id": review.id,
           "venue": review.venue_name,
           "user": review.user_email,
           "answers": review.answers,
           "date": review.date,
           "venue_rated": venue_rated
        }
        return jsonify(review_details)
    else: 
        return jsonify({"error": "review not found"}), 404 

# post review
@review_bp.route('/api/reviews', methods=['POST'])
@token_required
def new_review(current_user, current_user_email):
    data = request.get_json()
    db = get_db()

    user = db.query(Users).filter_by(id=current_user).one_or_none()
    if user.email != current_user_email:
        return jsonify({'error': 'Unauthorized to post a review'}), 403

    try:
        new_review = Reviews(
            venue_name = data['venue_name'],
            user_email = current_user_email,
            answers = data['answers'],
            date = data['date']
        )
        db.add(new_review)

        venue = db.query(Venues).filter_by(place_id=data['placeId']).one()
        venue.review_count += 1

        db.commit()

        return jsonify(message = 'review added'), 201
    except KeyError as e:
        logging.error(f'KeyError: {e}')
        db.rollback()
        return jsonify(message = 'review failed to be added'), 500
    
# update review
@review_bp.route('/api/reviews/<int:id>', methods=['PATCH'])
@token_required
def update_review(current_user, current_user_email, id):
    data = request.get_json()
    db = get_db()

    review = db.query(Reviews).filter_by(id=id, user_email=current_user_email).one_or_none()

    if review:
        try:
            # update review
            if 'answers' in data: 
                review.answers = [data['answers']]
                review.date = data['date']
                db.commit()
                return jsonify({'message': 'Review answers were updated'})
            else:
                return jsonify({'message': 'No updatable fields provided'}), 400
        
        except Exception as e:
            logging.error(f'Exception: {e}')
            db.rollback()
            return jsonify({'error': 'Failed to update review'}), 500
    else:
        return jsonify({'error': 'Review was not found or you do not have permission to update this review'}), 404
    
# delete review
@review_bp.route('/api/reviews/<int:id>', methods=['DELETE'])
@token_required
def delete_review(current_user, current_user_email, id):
    db = get_db()

    review = db.query(Reviews).filter_by(id=id, user_email=current_user_email).one_or_none()

    if review:
        try:
            db.delete(review)
            db.commit()
            return jsonify({'error': 'Review has been deleted'}), 200
        except Exception as e:
            db.rollback()
            return jsonify({"error": "Failed to delete review", "details": str(e)}), 500
    else:
        return jsonify({'error': 'review was not found'}), 404