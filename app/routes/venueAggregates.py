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
            'placeId': aggregate.placeId,
            'venue' : aggregate.name,
            'community 1' : aggregate.c1,
            'community 2' : aggregate.c2,
            'productivity 1' : aggregate.p1,
            'productivity 2' : aggregate.p2,
            'productivity 3' : aggregate.p3,
            'productivity 4' : aggregate.p4,
            'productivity 5' : aggregate.p5,
            'productivity 6' : aggregate.p6,
            'service 1' : aggregate.ser1,
            'service 2' : aggregate.ser2,
            'service 3' : aggregate.ser3,
            'service 4' : aggregate.ser4,
            'service 5' : aggregate.ser5,
            'space 1' : aggregate.sp1,
            'space 2' : aggregate.sp2,
            'space 3' : aggregate.sp3,
            'space 4' : aggregate.sp4,
            'space 5' : aggregate.sp5,
            'space 6' : aggregate.sp6,
            'space 7' : aggregate.sp7,
            'space 8' : aggregate.sp8,
            'space 9' : aggregate.sp9,
            'summary' : aggregate.sum

        }
        for aggregate in aggregates
    ]

    return jsonify({'aggregates': aggregates_data})

# get single aggregate
@aggregate_bp.route('/api/aggregate/<string:placeId>', methods=['GET'])
def get_aggregate(placeId):
    db = get_db()

    aggregate = db.query(VenueAggregates).filter_by(placeId = placeId).one_or_none()

    if aggregate:
        aggregate_details = {
            'aggregate_id': aggregate.id,
            'placeId': aggregate.placeId,
            'aggregate_name': aggregate.name,
            'c1': aggregate.c1,
            'c2': aggregate.c2,
            'p1': aggregate.p1,
            'p2': aggregate.p2,
            'p3': aggregate.p3,
            'p4': aggregate.p4,
            'p5': aggregate.p5,
            'p6': aggregate.p6,
            'ser1': aggregate.ser1,
            'ser2': aggregate.ser2,
            'ser3': aggregate.ser3,
            'ser4': aggregate.ser4,
            'ser5': aggregate.ser5,
            'sp1': aggregate.sp1,
            'sp2': aggregate.sp2,
            'sp3': aggregate.sp3,
            'sp4': aggregate.sp4,
            'sp5': aggregate.sp5,
            'sp6': aggregate.sp6,
            'sp7': aggregate.sp7,
            'sp8': aggregate.sp8,
            'sp9': aggregate.sp9,
            'sum': aggregate.sum,
        }
        return jsonify(aggregate_details)
    else:
        return jsonify({'error': 'agg details not found'}), 404

# post aggregate
@aggregate_bp.route('/api/aggregate', methods=['POST'])
def new_aggregate():
    data = request.get_json()
    db = get_db()

    print('data from aggregate is:') 
    print(data)

    try:
        new_aggregate = VenueAggregates(
            placeId = data['placeId'],
            name = data['name'],
            c1 = data['c1'],
            c2 = data['c2'],
            p1 = data['p1'],
            p2 = data['p2'],
            p3 = data['p3'],
            p4 = data['p4'],
            p5 = data['p5'],
            p6 = data['p6'],
            ser1 = data['ser1'],
            ser2 = data['ser2'],
            ser3 = data['ser3'],
            ser4 = data['ser4'],
            ser5 = data['ser5'],
            sp1 = data['sp1'],
            sp2 = data['sp2'],
            sp3 = data['sp3'],
            sp4 = data['sp4'],
            sp5 = data['sp5'],
            sp6 = data['sp6'],
            sp7 = data['sp7'],
            sp8 = data['sp8'],
            sp9 = data['sp9'],
            sum = data['sum']
        )
        # db.add(new_aggregate)
        db.merge(new_aggregate)
        db.commit()

        return jsonify(message = 'aggregate added'), 200
    except KeyError as e:
        logging.error(f'KeyError: {e}')
        db.rollback()
        return jsonify(message = 'aggregate failed to be added'), 500