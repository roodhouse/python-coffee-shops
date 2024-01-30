from os import getenv
import sys
from dotenv import load_dotenv
import json
from flask import Blueprint, jsonify, request
from app.models import Reviews, VenueAggregates
from app.db import get_db
import logging

from app.models.Venues import Venues

load_dotenv()

review_bp = Blueprint("review", __name__, url_prefix="/")

# get all reviews
@review_bp.route('/api/reviews', methods=['GET'])
def get_reviews():
    db = get_db()

    reviews = db.query(Reviews).order_by(Reviews.id).all()

    reviews_data = [
        {
            'id' : review.id,
            'venue' : review.venue_name,
            'user' : review.user_email,
            'answers' : review.answers
        }
        for review in reviews
    ]

    return jsonify({'reviews': reviews_data})

# get individual review
@review_bp.route('/api/reviews/<int:id>', methods=['GET'])
def get_review(id):
    db = get_db()

    review = db.query(Reviews).filter_by(id = id).one_or_none()

    if review:
        review_details = {
           "review_id": review.id,
           "venue": review.venue_name,
           "user": review.user_email,
           "answers": review.answers 
        }
        return jsonify(review_details)
    else: 
        return jsonify({"error": "review not found"}), 404

# post review
@review_bp.route('/api/reviews', methods=['POST'])
def new_review():
    data = request.get_json()
    print(data)
    db = get_db()

    try:
        new_review = Reviews(
            venue_name = data['venue_name'],
            user_email = data['user_email'],
            answers = data['answers'],
        )
        db.add(new_review)

        venue = db.query(Venues).filter_by(name=new_review.venue_name).one()
        venue.review_count += 1

        db.commit()

        return jsonify(message = 'review added'), 201
    except KeyError as e:
        logging.error(f'KeyError: {e}')
        db.rollback()
        return jsonify(message = 'review failed to be added'), 500
    
# update review
@review_bp.route('/api/reviews/<int:id>', methods=['PUT'])
def update_review(id):
    data = request.get_json()
    db = get_db()

    review = db.query(Reviews).filter_by(id=id).one_or_none()

    if review:
        try:
            # update review
            review.answers = data['answers'],
        
            db.commit()
            return jsonify({'message': 'Review was updated'})
        
        except KeyError as e:
            logging.error(f'KeyError: {e}')
            db.rollback()
            return jsonify(message = 'Invalid data'), 400
    else:
        return jsonify({'error': 'Review was not found'}), 404
    
# delete review
@review_bp.route('/api/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    db = get_db()

    review = db.query(Reviews).get(id)

    if review:
        try:
            db.delete(review)
            db.commit()
            return jsonify({'error': 'Review has been deleted'})
        except Exception as e:
            db.rollback()
            return jsonify({"error": "Failed to delete review", "details": str(e)}), 500
    else:
        return jsonify({'error': 'review was not found'}), 404