from flask import request, jsonify
from flask_restx import Resource, Namespace
from app.main.service.bus_service import get_all_buses, get_bus_by_id, create_bus, update_bus, delete_bus
from app.main.model.bus import Bus
from app.main.model.bus import BusCreate, BusOut, BusUpdate
from geoalchemy2 import WKTElement


api = Namespace('bus', description='Bus related operations')

@api.route('/')
class BusList(Resource):
    @api.doc('list_of_all_buses')
    def get(self):
        """List all buses"""
        buses = get_all_buses()
        return {"status": "success", "data": buses}

    @api.doc('create_new_bus')
    def post(self):
        """Create a new bus"""
        try:
            data = BusCreate.parse_obj(request.json)  # Pydantic validation
            return create_bus(data)
        except Exception as e:
            return {"status": "fail", "message": str(e)}

@api.route('/<int:bus_id>')
class BusDetail(Resource):
    @api.doc('get_bus_by_id')
    def get(self, bus_id):
        """Get a bus by ID"""
        bus = get_bus_by_id(bus_id)
        if bus:
            return {"status": "success", "data": bus}
        return {"status": "fail", "message": "Bus not found."}

    @api.doc('update_bus')
    def put(self, bus_id):
        """Update an existing bus"""
        try:
            data = BusUpdate.parse_obj(request.json)  # Pydantic validation
            return update_bus(bus_id, data)
        except Exception as e:
            return {"status": "fail", "message": str(e)}

    @api.doc('delete_bus')
    def delete(self, bus_id):
        """Delete a bus"""
        return delete_bus(bus_id)