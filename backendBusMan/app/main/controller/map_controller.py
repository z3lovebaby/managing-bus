from flask import request
from flask_restx import Resource

from app.main.service.map_service import get_location
from app.main.utils.dto import Map

api = Map.api
roadID = Map.roadID

@api.route('/get-location')
class DriverList(Resource):
    @api.doc('danh sach tai xe')
    @api.expect(roadID, validate=True)
    def post(self):
        """List all registered users"""
        post_data = request.json
        return get_location(post_data)
