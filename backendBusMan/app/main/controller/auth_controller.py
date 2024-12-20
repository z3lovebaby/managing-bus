from flask import request
from flask_restx import Resource

from app.main.service.auth_helper import Auth
from ..utils.dto import AuthDto

api = AuthDto.api
user_auth = AuthDto.user_auth


@api.route('/login')
class UserLogin(Resource):
    """
        User Login Resource
    """
    @api.doc('user login')
    @api.expect(user_auth, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return Auth.login_user(data=post_data)
@api.route('/refresh-token')
class UserLogin(Resource):
    """
        User Login Resource
    """
    @api.doc('Auth refresh token')
    @api.expect(api.parser().add_argument('refresh_token', type=str, required=True, location='json'), validate=True)
    # @api.expect(String, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return Auth.get_refresh_token(data=post_data)


@api.route('/logout')
class LogoutAPI(Resource):
    """
    Logout Resource
    """
    @api.doc('logout a user')
    def post(self):
        # get auth token
        auth_header = request.headers.get('Authorization')
        return Auth.logout_user(data=auth_header)