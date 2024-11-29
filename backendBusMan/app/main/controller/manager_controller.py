from flask import request
from flask_restx import Resource

from app.main.service.manager_service import create, get_all_manager, create_driver, get_all_driver
from ..utils.dto import UserDto, ManDto

api = ManDto.api
_manager = ManDto.manager
man = ManDto.man_register
driver = ManDto.driver_register

@api.route('/get-all-driver')
class DriverList(Resource):
    @api.doc('danh sach tai xe')
    def get(self):
        """List all registered users"""
        return get_all_driver()
@api.route('/')
class ManagerList(Resource):
    @api.doc('list_of_registered_users')
    @api.marshal_list_with(_manager, envelope='data')
    def get(self):
        """List all registered users"""
        return get_all_manager()
@api.route('/create-manager')
class CreateManager(Resource):
    """
        User Login Resource
    """
    @api.doc('Create manager')
    @api.expect(man, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return create(data=post_data)
@api.route('/create-driver')
class CreateDriver(Resource):
    """
        User Login Resource
    """
    @api.doc('Create driver')
    @api.expect(driver, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return create_driver(data=post_data)
