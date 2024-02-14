from crypt import methods
from os import getenv
import sys
from dotenv import load_dotenv
import json
from flask import Blueprint, jsonify, request
from app.models import Reviews, Users
from app.db import get_db
import logging
from app.utils import token_required
from sqlalchemy.orm import sessionmaker

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
           "answers": review.answers 
        }
        return jsonify(review_details)
    else: 
        return jsonify({"error": "review not found"}), 404

# get individual review by email
@review_bp.route('/api/reviews/<string:venue_name>/<string:user_email>', methods=['GET'])
@token_required
def get_user_review(current_user, current_user_email, venue_name, user_email):
    db = get_db()

    user = db.query(Users).filter_by(id=current_user).one_or_none()
    if user.email != user_email:
        return jsonify({'error': 'Unauthorized access to this review'}), 403

    review = db.query(Reviews).filter_by(venue_name = venue_name, user_email = user_email).one_or_none()

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
@token_required
def new_review(current_user, current_user_email):
    data = request.get_json()
    print(data)
    db = get_db()

    user = db.query(Users).filter_by(id=current_user).one_or_none()
    if user.email != current_user_email:
        return jsonify({'error': 'Unauthorized to post a review'}), 403

    try:
        new_review = Reviews(
            venue_name = data['venue_name'],
            user_email = current_user_email,
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
    
# update review, single answer or all answers
# @review_bp.route('/api/reviews/<int:id>', methods=['PATCH'])
# @token_required
# def update_review(current_user, current_user_email, id):
#     data = request.get_json()
#     db = get_db()
    
#     review = db.query(Reviews).filter_by(id = id, user_email = current_user_email).one_or_none()

#     print('review.answers before if')
#     print(review.answers)

#     if review:
#         print(type(review.answers[0]))
#         print(review.answers[0])
#         try:
#             # check if we are updating a single answer or all of the answers
#             if 'answers' in data:
#                 # determine if updating all answers or just one based on the structure of 'answers' in the request
#                 if isinstance(data['answers'], dict) and len(data['answers']) == 1:
#                     print("Updating a single answer")
#                     # then this is a single answer
#                     print(f'the data .items: {data['answers'].items()} ')
#                     for key, value in data['answers'].items():
#                         # make sure the key exists
#                         if key in review.answers[0]:
#                             review.answers[0][key] = value
#                         else:
#                             return jsonify({'error': f'Answer {key} does not exist'}), 400
#                     #reassign the entire list
#                     # data['answers'] = review.answers
#                     data['answers'][0] = review.answers[0]
#                     # review.answers = [data['answers']]
#                     print('review.answers')
#                     print(review.answers)
#                     print(review.answers[0])
#                     # review.answers = [review.answers]
#                     # review.answers[0] = {review.answers}
#                     review.answers = data['answers'][0]
#                     print('new review.answers')
#                     print(review.answers)
#                     print(review.answers[0])
#                 else:
#                     #update all the answers
#                     print("Updating all answers")
#                     review.answers = [data['answers']]

#                 print("Before Committed changes:")
#                 print(f"Review ID: {review.id}")
#                 print(f"Venue Name: {review.venue_name}")
#                 print(f"User Email: {review.user_email}")
#                 print(f"Answers: {review.answers}")
                
#                 db.commit()

#                 return jsonify({'message': 'Review updated successfully'})
#             else:
#                 return jsonify({'message': 'No updatable fields provided'})
#         except Exception as e:
#             logging.error(f'Exception: {e}')
#             db.rollback()
#             return jsonify({'message': 'Failed to update review'}), 500
#     else:
#         return jsonify({'message': 'Review was not found, or you do not have permission to update this review'}), 404
    
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

# update review (one answer only)
@review_bp.route('/api/review-single/<int:id>', methods=['PATCH'])
@token_required
def update_review_single_answer(current_user, current_user_email, id):
    data = request.get_json()
    db = get_db()

    print(f'the data is: {data}')
    print(type(data))
    print(f'the answer data is: {data['answers']}')

    key = data['answers'][0]
    value = data['answers'][1]

    print(key, value)

    review = db.query(Reviews).filter_by(id=id, user_email=current_user_email).one_or_none()

    print(review.answers)
    print(review.answers[0])
    print(review.answers[0]['sum']) 
    # -- here make the data look like this
    if review:
        try:
            # update review
            if 'answers' in data: 
                print('here')
                review.answers[0][key] = value
                db.commit()
                return jsonify({'message': 'Single review answer updated'})
            else:
                return jsonify({'message': 'No updatable fields provided'}), 400
        
        except Exception as e:
            logging.error(f'Exception: {e}')
            db.rollback()
            return jsonify({'error': 'Failed to single answer in review'}), 500
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