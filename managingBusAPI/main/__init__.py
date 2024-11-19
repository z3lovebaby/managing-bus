import os
from flask import Flask
from flask_cors import CORS
from .user.controller import user
from .auth.controller import auth
from .extension import db

def create_db(app):
    if app.config.get("SQLALCHEMY_DATABASE_URI"):
        print("Connecting to PostgreSQL database.")
        # For PostgreSQL, we don't need to create the database manually, it should exist already
        # Create tables if they don't exist
        with app.app_context():
            db.create_all()
            print("Tables created in PostgreSQL database.")

def create_app(config_file="config.py"):
    app = Flask(__name__)
    CORS(app)
    app.config.from_pyfile(config_file)

    # Check if SQLALCHEMY_DATABASE_URI is set
    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        print("fa")
        raise RuntimeError("Missing SQLALCHEMY_DATABASE_URI")

    # Initialize the database
    db.init_app(app)
    create_db(app)

    # Register blueprints
    app.register_blueprint(user)
    app.register_blueprint(auth)
    print("App initialized successfully with DB URI:", app.config["SQLALCHEMY_DATABASE_URI"])
    return app
