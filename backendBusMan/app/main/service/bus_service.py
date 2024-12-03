# app/main/service/bus_service.py
import uuid
from app.main import db
from app.main.model.bus import Bus
from sqlalchemy.exc import IntegrityError
from geoalchemy2.elements import WKTElement

def create_bus(data):
    """Create a new bus"""
    try:
        new_bus = Bus(
            plate_number=data.plate_number,
            name=data.name,
            model=data.model,
            status=data.status,
            route_id=data.route_id,
            current_location=WKTElement(data.current_location, srid=4326)
        )
        db.session.add(new_bus)
        db.session.commit()
        return {"status": "success", "message": "Bus created successfully.", "bus": new_bus}
    except IntegrityError:
        db.session.rollback()
        return {"status": "fail", "message": "Bus with this plate number already exists."}
    except Exception as e:
        db.session.rollback()
        return {"status": "fail", "message": str(e)}

def get_all_buses():
    """Get all buses"""
    buses = Bus.query.all()
    return [
        {
            "bus_id": bus.bus_id,
            "plate_number": bus.plate_number,
            "name": bus.name,
            "model": bus.model,
            "status": bus.status,
            "route_id": bus.route_id,
            "current_location": str(bus.current_location)
        }
        for bus in buses
    ]

def get_bus_by_id(bus_id):
    """Get a bus by ID"""
    bus = Bus.query.get(bus_id)
    if bus:
        return {
            "bus_id": bus.bus_id,
            "plate_number": bus.plate_number,
            "name": bus.name,
            "model": bus.model,
            "status": bus.status,
            "route_id": bus.route_id,
            "current_location": str(bus.current_location)
        }
    return {"status": "fail", "message": "Bus not found."}

def update_bus(bus_id, data):
    """Update an existing bus"""
    bus = Bus.query.get(bus_id)
    if not bus:
        return {"status": "fail", "message": "Bus not found."}

    bus.plate_number = data.plate_number or bus.plate_number
    bus.name = data.name or bus.name
    bus.model = data.model or bus.model
    bus.status = data.status or bus.status
    bus.route_id = data.route_id or bus.route_id
    bus.current_location = WKTElement(data.current_location or str(bus.current_location), srid=4326)

    try:
        db.session.commit()
        return {"status": "success", "message": "Bus updated successfully."}
    except Exception as e:
        db.session.rollback()
        return {"status": "fail", "message": str(e)}

def delete_bus(bus_id):
    """Delete a bus"""
    bus = Bus.query.get(bus_id)
    if not bus:
        return {"status": "fail", "message": "Bus not found."}

    try:
        db.session.delete(bus)
        db.session.commit()
        return {"status": "success", "message": "Bus deleted successfully."}
    except Exception as e:
        db.session.rollback()
        return {"status": "fail", "message": str(e)}
