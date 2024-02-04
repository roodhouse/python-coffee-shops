from flask import Flask
from flask_cors import CORS
from app.routes import home, user, venue, review, comment, venueAggregates
from app.db import init_db
from datetime import timedelta

def create_app(test_config=None):
    # set up app config
    app = Flask(__name__, static_url_path='/')
    app.url_map.strict_slashes = False
    app.config.from_mapping(
        SECRET_KEY = 'super_secret_key'
    )
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)

    app.register_blueprint(home)
    app.register_blueprint(user)
    app.register_blueprint(venue)
    app.register_blueprint(review)
    app.register_blueprint(comment)
    app.register_blueprint(blueprint=venueAggregates)
    init_db(app)

    # init CORS with flask app
    # api only
    # CORS(app, resources={r"/api/*": {"origins": "*"}})
    # all routes
    CORS(app, origins="*", supports_credentials=True)

    return app