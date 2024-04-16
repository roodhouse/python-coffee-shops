from os import getenv
import sys
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request
from app.models import Venues, VenueAggregates, Users
from app.db import get_db
import logging
from app.utils import token_required, process_image, update_city_state_data, city_state_data

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
            'city': venue.city,
            'state': venue.state,
            'map': venue.map,
            'website': venue.website,
            'place_id': venue.place_id,
            'hours': venue.hours,
            'rating': venue.rating,
            'review_count': venue.review_count
        }
        for venue in venues
    ]

    return jsonify({'venues': venues_data})

# venues get single route
@venue_bp.route('/api/venues/<string(length=27):place_id>', methods=['GET'])
def get_venue(place_id):
    db = get_db()

    venue = db.query(Venues).filter_by(place_id = place_id).one_or_none()
    
    if venue:
        venue_details = {
            'venue_id': venue.id,
            'venue': venue.name,
            'image': venue.image,
            'location': venue.location,
            'address': venue.address,
            'city': venue.city,
            'state': venue.state,
            'map': venue.map,
            'website': venue.website,
            'place_id': venue.place_id,
            'hours': venue.hours,
            'rating': venue.rating,
            'review_count': venue.review_count,
            'reviews' : [
                {
                    'user_email': review.user_email,
                    'user_id': db.query(Users.id).filter_by(email=review.user_email).scalar(), 
                    'avatar' : db.query(Users.avatar).filter_by(email=review.user_email).scalar(),
                    'answers' : review.answers,
                    'date' : review.date
                } 
                
                for review in venue.reviews]
        }
        return jsonify(venue_details)
    else:
        return jsonify({"error": "venue not found"}), 404
    
# venues get current city route
@venue_bp.route('/api/venues/<string:city>', methods=['GET']) 
def get_current_city_venues(city):
    db = get_db()
    # venues = db.query(Venues).order_by(Venues.id).all()
    venues = db.query(Venues).filter_by(city = city)
    # convert venues data to a list of dictionaries
    venues_data = []
    for venue in venues:    
        venues_dict = {
                'id': venue.id,
                'name': venue.name,
                'image': venue.image,
                'location': venue.location,
                'address': venue.address,
                'city': venue.city,
                'state': venue.state,
                'map': venue.map,
                'website': venue.website,
                'place_id': venue.place_id,
                'hours': venue.hours,
                'rating': venue.rating,
                'review_count': venue.review_count,
                'aggregates': None
            }
        
        # include agg data for venue
        if venue.aggregates:
            aggregate = venue.aggregates[0]
            venues_dict['aggregates'] = {
                'Work Vibe': aggregate.c1,
                'Groups': aggregate.c2,
                'Wi-Fi': aggregate.p1,
                'Sockets': aggregate.p2,
                'Long Stays': aggregate.p3,
                'Tables': aggregate.p4,
                'Quiet': aggregate.p5,
                'Calls': aggregate.p6,
                'Coffee': aggregate.ser1,
                'Food': aggregate.ser2,
                'Veggie': aggregate.ser3,
                'Alcohol': aggregate.ser4,
                'Cards': aggregate.ser5,
                'Light': aggregate.sp1,
                'Outdoor': aggregate.sp2,
                'Spacious': aggregate.sp3,
                'Restroom': aggregate.sp4,
                'Accessible': aggregate.sp5,
                'A/C': aggregate.sp6,
                'No smoke': aggregate.sp7,
                'Pets': aggregate.sp8,
                'Parking': aggregate.sp9,
                'Summary': aggregate.sum
            }

        venues_data.append(venues_dict)
    
    return jsonify({'venues': venues_data})

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
                'city': latest_venue.city,
                'state': latest_venue.state,
                'map': latest_venue.map,
                'website': latest_venue.website,
                'hours': latest_venue.hours,
                'place_id': latest_venue.place_id,
                'rating': latest_venue.rating,
                'review_count': latest_venue.review_count
        }
        
        return jsonify({'venues': [venue_data]})
    else:
        return jsonify({'venues': []})

# route to get current city and state data
@venue_bp.route('/api/venues/city', methods=['GET'])
def get_city_data():
    return jsonify(city_state_data)

# venues post route
@venue_bp.route('/api/venues', methods=['POST'])
@token_required
def new_venue(current_user, current_user_email):
    data = request.get_json()
    db = get_db()
    
    # send city/state data to add to dictionary if new
    update_city_state_data(data['city'], data['state'])
    # get and download the picture here and send my copy to the db
    image_path = process_image(data['image'], data['placeId'], 'venue')

    try:
        new_venue = Venues(
            name = data['venue'],
            image = image_path,
            location = data['location'],
            address = data['address'],
            city = data['city'],
            state = data['state'],
            map = data['map'],
            website = data['website'],
            place_id = data['placeId'],
            hours = data['hours'],
            rating = data['rating']
        )
        db.add(new_venue)
        db.commit()
        return jsonify(message = 'venue added'), 200
    except KeyError as e:
        print(f"KeyError: {e}")
        db.rollback()
        return jsonify(message = 'venue failed to be added'), 500

# venues update route
@venue_bp.route('/api/venues/<string:place_id>', methods=['PUT'])
@token_required
def update_venue(current_user, current_user_email, place_id):
    data = request.get_json()
    db = get_db()

    venue = db.query(Venues).filter_by(place_id=place_id).one_or_none()

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
            if 'city' in data:
                venue.city = data['city']
            if 'state' in data:
                venue.state = data['state']
            if 'map' in data:
                venue.map = data['map']
            if 'website' in data:
                venue.website = data['website']
            if 'hours' in data:
                venue.hours = data['hours']
            if 'placeId' in data:
                venue.place_id = data['placeId']
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
@token_required
def delete_venue(current_user, current_user_email, id):
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