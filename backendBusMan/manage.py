import os
import unittest
from flask import Flask
from flask_migrate import Migrate
from flask.cli import with_appcontext
from app.main import create_app, db
from app.main.model import user
from app.main.model import blacklist
from app.main.model import bus
from app.main.model import driver
from app.main.model import routes
from app import blueprint


# Create Flask app
app = create_app(os.getenv('BOILERPLATE_ENV') or 'dev')
app.register_blueprint(blueprint)
# Push the app context to ensure it's available in the shell
app.app_context().push()

# Set up Flask-Migrate
migrate = Migrate(app, db)

# Register the 'db' command for migrations
# @app.cli.command('db')
# @with_appcontext
# def db():
#     """Runs database migration commands."""
#     from flask_migrate import upgrade, migrate, stamp
#     upgrade()  # Run the migration upgrade command (you can add other commands as needed)
#     print("Database migration completed.")

# Set up custom 'run' command
@app.cli.command('run')
def run():
    """Runs the application."""
    app.run()

# Set up custom 'test' command
@app.cli.command('test')
@with_appcontext
def test():
    print('a')
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    app.run()
