from flask_restx import Namespace, fields


class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'email': fields.String(required=True, description='user email address'),
        'username': fields.String(required=True, description='user username'),
        'password': fields.String(required=True, description='user password'),
        'public_id': fields.String(description='user Identifier')
    })
    user_register = api.model('UserRegisterDTO', {
        'fname': fields.String(required=True, description='First name of the user'),
        'lname': fields.String(required=True, description='Last name of the user'),
        'username': fields.String(required=True, description='Username for the user'),
        'email': fields.String(required=True, description='Email address of the user'),
        'phone': fields.String(required=True, description='Phone number of the user'),
        'password': fields.String(required=True, description='Password for the user')
    })
class AuthDto:
    api = Namespace('auth', description='authentication related operations')
    user_auth = api.model('auth_details', {
        'email': fields.String(required=True, description='The email address'),
        'password': fields.String(required=True, description='The user password '),
    })