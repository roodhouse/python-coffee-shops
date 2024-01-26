from flask import Flask
from flask_cors import CORS
from app.routes import home, user, venue, review, comment
from app.db import init_db

def create_app(test_config=None):
    # set up app config
    app = Flask(__name__, static_url_path='/')
    app.url_map.strict_slashes = False
    app.config.from_mapping(
        SECRET_KEY = 'super_secret_key'
    )

    # init CORS with flask app
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.register_blueprint(home)
    app.register_blueprint(user)
    app.register_blueprint(venue)
    app.register_blueprint(review)
    app.register_blueprint(comment)
    init_db(app)

    return app