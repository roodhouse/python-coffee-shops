import sys
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request, send_file
from app.db import get_db
import logging

load_dotenv()

images_bp = Blueprint("images", __name__, url_prefix="/")

@images_bp.route('/app/images/<filename>')
def get_image(filename):
    return send_file(f'images/{filename}', mimetype='image/jpeg')