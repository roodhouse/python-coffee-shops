from os import getenv
import sys
from dotenv import load_dotenv
import json
from flask import Blueprint, jsonify, request
from app.models import Reviews, VenueAggregates
from app.db import get_db
import logging

load_dotenv()

aggregate_bp = Blueprint("aggregate", __name__, url_prefix="/")

# get all aggregates
@aggregate_bp.route('/api/aggregate', methods=['GET'])
def get_aggregates():
    db = get_db()

    aggregates = db.query(VenueAggregates).order_by(VenueAggregates.id).all()

    aggregates_data = [
        {
            'id' : aggregate.id,
            'venue' : aggregate.venue_name,
            'aggregate answers' : aggregate.aggregate_data,
        }
        for aggregate in aggregates
    ]

    return jsonify({'aggregates': aggregates_data})

# post aggregate
@aggregate_bp.route('/api/aggregate', methods=['POST'])
def new_aggregate():
    print('test from venueAggregates new_aggreate()')
    data = request.get_json()
    print('the data recieved is: ')
    print(data)
    db = get_db()

    try:
        new_aggregate = VenueAggregates(
            venue_name = data['venue_name'],
            # aggregate_answers = data['aggregate_answers'],
            aggregate_answers = data['answers'],
        )
        db.add(new_aggregate)
        db.commit()

        return jsonify(message = 'aggregate added'), 200
    except KeyError as e:
        logging.error(f'KeyError: {e}')
        db.rollback()
        return jsonify(message = 'aggregate failed to be added'), 500