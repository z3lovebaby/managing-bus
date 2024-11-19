from flask import Blueprint
from .services import add_user_service,register_service
from socks import method

user = Blueprint("user",__name__)
@user.route("/get-all-user")
def get_all_user():
    return "all user"
@user.route("/add-user",methods=['POST'])
def add_user():
    return add_user_service()
@user.route("/register",methods=['POST'])
def register():
    return register_service()