from flask import Blueprint, request, jsonify
from services import BusService
from model import BusStatus, db
from sqlalchemy.orm import Session

bus_router = Blueprint('bus_router', __name__)

@bus_router.route('/buses/', methods=['POST'])
def create_bus():
    data = request.get_json()
    plate_number = data['plate_number']
    name = data.get('name', '')
    model = data.get('model', '')
    route_id = data['route_id']
    current_location = data['current_location']
    
    bus_service = BusService(db.session)
    bus = bus_service.create_bus(plate_number, name, model, route_id, current_location)
    return jsonify({"message": "Bus created", "bus": bus}), 201

@bus_router.route('/buses/<int:bus_id>', methods=['GET'])
def get_bus(bus_id: int):
    bus_service = BusService(db.session)
    bus = bus_service.get_bus_by_id(bus_id)
    if not bus:
        return jsonify({"message": "Bus not found"}), 404
    return jsonify({"bus": bus})

@bus_router.route('/buses/', methods=['GET'])
def get_all_buses():
    bus_service = BusService(db.session)
    buses = bus_service.get_all_buses()
    return jsonify({"buses": buses})

@bus_router.route('/buses/<int:bus_id>/status/', methods=['PUT'])
def update_bus_status(bus_id: int):
    data = request.get_json()
    status = BusStatus[data['status']]
    bus_service = BusService(db.session)
    bus = bus_service.update_bus_status(bus_id, status)
    if not bus:
        return jsonify({"message": "Bus not found"}), 404
    return jsonify({"message": "Bus status updated", "bus": bus})

@bus_router.route('/buses/<int:bus_id>', methods=['DELETE'])
def delete_bus(bus_id: int):
    bus_service = BusService(db.session)
    success = bus_service.delete_bus(bus_id)
    if not success:
        return jsonify({"message": "Bus not found"}), 404
    return jsonify({"message": "Bus deleted"}), 200
