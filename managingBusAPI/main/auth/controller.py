from flask import Blueprint

from main.auth.services import login_service

auth = Blueprint("auth",__name__)
@auth.route("/login",methods=['POST'])
def login():
    return login_service()