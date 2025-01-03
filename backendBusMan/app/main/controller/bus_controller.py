from flask import request
from flask_restx import Resource

from app.main.service.bus_service import get_all_bus, get_st_end, get_bus
from app.main.utils.decorator import token_required
from app.main.utils.dto import Bus

api = Bus.api
bus = Bus.bus
latlng = Bus.latlng
@api.route('/get-all-bus')
class ListBus(Resource):
    @api.doc('danh sach bus')
    @api.marshal_list_with(bus, envelope='data')
    def get(self):
        return get_all_bus()
@api.route('/get-st-end')
class ListBus(Resource):
    @api.doc('lat lng cua xe')
    @api.marshal_list_with(latlng, envelope='data')
    def get(self):
        bus_id = request.args.get('bus_id', type=int)  # Lấy từ query parameters
        if not bus_id:
            return {"message": "bus_id is required"}, 400
        return get_st_end(bus_id)
@api.route('/get-bus')
class GetBus(Resource):
    @api.doc('lay thong tin xe tu token user-taixe')
    def get(self):
         # Lấy từ query parameters
        auth_header = request.headers.get('Authorization')
        if not auth_header:
             return {"message": "token is required"}, 400
        return get_bus(data = auth_header)