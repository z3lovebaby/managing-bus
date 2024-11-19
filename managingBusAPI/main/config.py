import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.environ.get("KEY")
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:link612@localhost:5432/manBusDB'
SQLALCHEMY_TRACK_MODIFICATIONS = False