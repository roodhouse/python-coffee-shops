import sys
import os
import uuid
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request, send_file
from app.db import get_db
import logging

load_dotenv()

images_bp = Blueprint("images", __name__, url_prefix="/")

@images_bp.route('/app/images/<directory>/<filename>')
def get_image(directory, filename):
    if directory == 'venues':
        base_dir = 'images/venues'
    elif directory == 'users':
        base_dir = 'images/users'
    else:
        return jsonify({'message': 'Invalid directory'}), 400

    filepath = os.path.join(base_dir, filename)
    return send_file(filepath, mimetype='image/jpeg')