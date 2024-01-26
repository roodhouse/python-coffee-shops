from os import getenv
import sys
from dotenv import load_dotenv
import json
from flask import Blueprint, send_from_directory, current_app, jsonify, request, session
from app.models import Users, Venues, Reviews, Comments
from app.db import get_db
import logging

load_dotenv()

comment_bp = Blueprint("comment", __name__, url_prefix="/")

# get all comments
@comment_bp.route('/api/comments', methods=['GET'])
def get_comments():
    db = get_db()

    comments = db.query(Comments).order_by(Comments.id).all()

    if comments:
        comments_data = [
            {
                'id' : comment.id,
                'venue' : comment.venue_id,
                'user' : comment.user_id,
                'body' : comment.body
            }
            for comment in comments
        ]

        return jsonify({'comments': comments_data})
    else: 
        return jsonify({"error": "comment not found"}), 404

# get all comments by post
@comment_bp.route('/api/comments/<int:post_id>', methods=['GET'])
def get_comments_by_post(post_id):
    db = get_db()

    comments = db.query(Comments).filter_by(venue_id = post_id).order_by(Comments.id).all()

    if comments:
        comments_data = [
            {
                'id' : comment.id,
                'venue' : comment.venue_id,
                'user' : comment.user_id,
                'body' : comment.body
            }
            for comment in comments
        ]
        return jsonify({'comments': comments_data})
    else: 
        return jsonify({"error": "comment not found"}), 404
    
# get all comments by user
@comment_bp.route('/api/comments/<int:user_id>', methods=['GET'])
def get_comments_by_user(user_id):
    db = get_db()

    comments = db.query(Comments).filter_by(venue_id = user_id).order_by(Comments.id).all()

    if comments:
        comments_data = [
            {
                'id' : comment.id,
                'venue' : comment.venue_id,
                'user' : comment.user_id,
                'body' : comment.body
            }
            for comment in comments
        ]

        return jsonify({'comments': comments_data})
    else: 
        return jsonify({"error": "comment not found"}), 404

# get individual comment
@comment_bp.route('/api/comments/<int:id>', methods=['GET'])
def get_comment(id):
    db = get_db()

    comment = db.query(Comments).filter_by(id = id).one_or_none()

    if comment:
        comment_details = {
           'id' : comment.id,
            'venue' : comment.venue_id,
            'user' : comment.user_id,
            'body' : comment.body
        }
        return jsonify(comment_details)
    else: 
        return jsonify({"error": "comment not found"}), 404
    
# create new comment (post)
@comment_bp.route('/api/comments', methods=['POST'])
def new_comment():
    db = get_db()
    data = request.get_json()
    try:
        new_comment = Comments(
            venue = data['venue'],
            user = data['user'],
            body = data['body'],
        )
        db.add(new_comment)
        db.commit()
        return jsonify(message = 'comment added'), 200
    except:
        print(sys.exc_info()[0])
        db.rollback()
        return jsonify(message = 'comment failed to be added'), 500
    
# update comment
@comment_bp.route('/api/comments/<int:id>', methods=['PUT'])
def update_comment(id):
    data = request.get_json()
    db = get_db()

    comment = db.query(Comments).filter_by(id=id).one_or_none()

    if comment:
        try:
            # update comment
            comment.answers = data['body'],
        
            db.commit()
            return jsonify({'message': 'Comment was updated'})
        
        except KeyError as e:
            logging.error(f'KeyError: {e}')
            db.rollback()
            return jsonify(message = 'Invalid data'), 400
    else:
        return jsonify({'error': 'Comment was not found'}), 404
    
# delete comment (deletes)
@comment_bp.route('/api/comments/<int:id>', methods=['DELETE'])
def delete_comment(id):
    db = get_db()

    comment = db.query(Comments).get(id)

    if comment:
        try:
            db.delete(comment)
            db.commit()
            return jsonify({'error': 'Comment has been deleted'})
        except Exception as e:
            db.rollback()
            return jsonify({"error": "Failed to delete comment", "details": str(e)}), 500
    else:
        return jsonify({'error': 'comment was not found'}), 404

