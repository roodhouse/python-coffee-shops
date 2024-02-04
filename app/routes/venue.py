from crypt import methods
from os import getenv
import sys
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request
from app.models import Venues, VenueAggregates
from app.db import get_db
import logging

load_dotenv()

venue_bp = Blueprint("venue", __name__, url_prefix="/")

# venues get all route
@venue_bp.route('/api/venues', methods=['GET'])
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
            'rating': venue.rating,
            'review_count': venue.review_count
        }
        for venue in venues
    ]

    return jsonify({'venues': venues_data})

# venues get single route
@venue_bp.route('/api/venues/<string:name>', methods=['GET'])
def get_venue(name):
    db = get_db()

    venue = db.query(Venues).filter_by(name = name).one_or_none()
    rating = db.query(VenueAggregates).filter_by(name = name).one_or_none()
# here, can't create because rating.sum is not available because VenueAggregates is not seeding correctly?
    # should I seed data in venue aggregates and then tackle the issue?
    if venue:
        venue_details = {
            'venue_id': venue.id,
            'venue': venue.name,
            'image': venue.image,
            'location': venue.location,
            'address': venue.address,
            'rating': rating.sum,
            'review_count': venue.review_count
        }
        return jsonify(venue_details)
    else:
        return jsonify({"error": "venue not found"}), 404

# venues latest
@venue_bp.route('api/venues/last', methods=['GET'])
def get_last_venue():
    db = get_db()

    latest_venue = db.query(Venues).order_by(Venues.id.desc()).limit(1).first()

    if latest_venue:

        venue_data = {
                'id': latest_venue.id,
                'name': latest_venue.name,
                'image': latest_venue.image,
                'location': latest_venue.location,
                'address': latest_venue.address,
                'hours': latest_venue.hours,
                'rating': latest_venue.rating,
                'review_count': latest_venue.review_count
        }
        
        return jsonify({'venues': [venue_data]})
    else:
        return jsonify({'venues': []})


# venues post route
@venue_bp.route('/api/venues', methods=['POST'])
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
@venue_bp.route('/api/venues/<string:name>', methods=['PUT'])
def update_venue(name):
    data = request.get_json()
    db = get_db()

    venue = db.query(Venues).filter_by(name=name).one_or_none()

    if venue:
        try:
            # update venue
            if 'venue' in data:    
                venue.name = data['venue']
            if 'image' in data:
                venue.image = data['image']
            if 'location' in data:
                venue.location = data['location']
            if 'address' in data:
                venue.address = data['address']
            if 'hours' in data:
                venue.hours = data['hours']
            if 'rating' in data:
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
@venue_bp.route('/api/venues/<int:id>', methods=['DELETE'])
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