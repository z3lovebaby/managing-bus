from flask import request
from flask_restx import Resource

from app.main.service.manager_service import create, get_all_manager, create_driver, get_all_driver, delete_user, \
    delete_tai_xe,update_driver,get_all_user
from ..utils.dto import UserDto, ManDto

api = ManDto.api
_manager = ManDto.manager
user = ManDto.manager
man = ManDto.man_register
driver = ManDto.driver_register
driverUpdate = ManDto.driver_update

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
@api.route('/get-all-user')
class ManagerList(Resource):
    @api.doc('List all user')
    @api.marshal_list_with(user, envelope='data')
    def get(self):
        """List all registered users"""
        return get_all_user()
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
@api.route('/update-manager')
class UpdateDriver(Resource):
    """
        User Login Resource
    """
    @api.doc('Update manager')
    @api.expect(driverUpdate, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return update_manager(data=post_data)
@api.route('/update-driver')
class UpdateDriver(Resource):
    """
        User Login Resource
    """
    @api.doc('Update driver')
    @api.expect(driverUpdate, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return update_driver(data=post_data)
@api.route('/delete-user')
class DeleteUser(Resource):
    @api.doc('delete user')
    @api.expect(user, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return delete_user(data=post_data)
@api.route('/delete-driver')
class DeleteUser(Resource):
    @api.doc('Xóa tài xế')
    @api.expect(user, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return delete_tai_xe(data=post_data)
