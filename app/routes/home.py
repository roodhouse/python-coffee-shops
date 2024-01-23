from crypt import methods
from os import getenv
import sys
from dotenv import load_dotenv
import json
from flask import Blueprint, send_from_directory, current_app, jsonify, request, session
from app.models import Users, Venues, Reviews, Comments
from app.db import get_db
import logging

load_dotenv()

bp = Blueprint("home", __name__, url_prefix="/")

@bp.route("/")
def index():
    return send_from_directory("../frontend/build", "index.html")

# base user route
@bp.route('/users', methods=['POST'])
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
@bp.route('users/logout', methods=['POST'])
def logout():
    session.clear()
    return '', 204

# login route
@bp.route("/users/login", methods=['POST'])
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
@bp.route('/api/user', methods=['GET'])
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

## venues routes

# venues get route
@bp.route('/api/venues', methods=['GET'])
def get_venues():
    db = get_db()
    venues = db.query(Venues).order_by(Venues.id).all()

    # convert venues data to a list of dictionaries
    venues_data = [
        {
            'id': venue.id,
            'name': venue.name,
            'image': venue.image,
            'location': venue.location,
            'address': venue.address,
            'hours': venue.hours,
            'rating': venue.rating
        }
        for venue in venues
    ]

    return jsonify({'venues': venues_data})

# venues post route
@bp.route('/api/venues', methods=['POST'])
def new_venue():
    data = request.get_json()
    print(data)
    db = get_db()

    try:
        new_venue = Venues(
            name = data['venue'],
            image = data['image'],
            location = data['location'],
            address = data['address'],
            hours = data['hours'],
            rating = data['rating']
        )
        db.add(new_venue)
        db.commit()
        return jsonify(message = 'venue added'), 200
    except:
        print(sys.exc_info()[0])
        db.rollback()
        return jsonify(message = 'venue failed to be added'), 500


# venues update route
@bp.route('/api/venues/<int:id>', methods=['PUT'])
def update_venue(id):
    data = request.get_json()
    db = get_db()

    venue = db.query(Venues).filter_by(id=id).one_or_none()

    if venue:
        try:
            # update venue
            venue.name = data['venue'],
            venue.image = data['image'],
            venue.location = data['location'],
            venue.address = data['address'],
            venue.hours = data['hours'],
            venue.rating = data['rating']
        
            db.commit()
            return jsonify({'message': 'Venue was updated'})
        
        except KeyError as e:
            logging.error(f'KeyError: {e}')
            db.rollback()
            return jsonify(message = 'Invalid data'), 400
    else:
        return jsonify({'error': 'Venue was not found'}), 404
    
# venues delete route
@bp.route('/api/venues/<int:id>', methods=['DELETE'])
def delete_venue(id):
    db = get_db()

    venue = db.query(Venues).get(id)

    if venue:
        try:
            db.delete(venue)
            db.commit()
            return jsonify({'error': 'Venue has been deleted'})
        except Exception as e:
            db.rollback()
            return jsonify({"error": "Failed to delete venue", "details": str(e)}), 500
    else:
        return jsonify({'error': 'venue was not found'}), 404

# review routes

# get all reviews
@bp.route('/api/reviews', methods=['GET'])
def get_reviews():
    db = get_db()

    reviews = db.query(Reviews).order_by(Reviews.id).all()

    reviews_data = [
        {
            'id' : review.id,
            'venue' : review.venue_id,
            'user' : review.user_id,
            'answers' : review.answers
        }
        for review in reviews
    ]

    return jsonify({'reviews': reviews_data})
# get individual review
#  here !
@bp.route('/api/reviews/<int:id>', methods=['GET'])
def get_review(id):
    db = get_db()

    review = db.query(Reviews).filter_by(id = id).one_or_none()

    if review:
        review_details = {
           "review_id": review.id,
           "venue": review.venue_id,
           "user": review.user_id,
           "answers": review.answers 
        }
        return jsonify(review_details)
    else: 
        return jsonify({"error": "review not found"}), 404

# post review
# update review
# delete review


# static file routes
@bp.route("/static/css/<path:filename>")
def serve_static_css(filename):
    return send_from_directory("../frontend/build/static/css", filename)


@bp.route("/static/js/<path:filename>")
def serve_static_js(filename):
    return send_from_directory("../frontend/build/static/js", filename)


@bp.route("/static/media/<path:filename>")
def serve_static_media(filename):
    return send_from_directory("../frontend/build/static/media", filename)


@bp.route("/assets/<path:filename>")
def serve_static_assets(filename):
    return send_from_directory("../frontend/build/assets", filename)


@bp.route("/manifest.json")
def serve_manifest():
    with current_app.open_resource("../frontend/build/manifest.json") as f:
        mainifest_data = json.load(f)
    return jsonify(mainifest_data)


@bp.route("/favicon.ico")
def serve_favicon():
    return send_from_directory("../frontend/build", "favicon.ico")


@bp.route("/logo192.png")
def serve_logo192():
    return send_from_directory("../frontend/build", "logo192.png")


@bp.route("/logo512.png")
def serve_logo512():
    return send_from_directory("../frontend/build", "logo512.png")
