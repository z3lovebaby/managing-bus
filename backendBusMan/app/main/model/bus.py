from .. import db
from app.main.model.routes import Route  # Import the Route model for foreign key reference
from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from pydantic import BaseModel
from typing import Optional
from geoalchemy2.elements import WKTElement
class Bus(db.Model):
    """ Bus Model for storing bus-related details """
    __tablename__ = "bus"

    bus_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plate_number = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=True)
    model = db.Column(db.String(50), nullable=True)
    status = db.Column(db.String(20), default='Active')
    route_id = db.Column(db.Integer, ForeignKey('routes.route_id'), nullable=True)
    current_location = db.Column(Geometry('POINT', srid=4326), nullable=True)  # PostGIS Point geometry

    route = relationship('Route', backref='bus')


    def __init__(self, plate_number, name, model, status, route_id, current_location):
        self.plate_number = plate_number
        self.name = name
        self.model = model
        self.status = status
        self.route_id = route_id
        self.current_location = current_location
    def __repr__(self):
        return f"<Bus {self.name} - {self.plate_number}>"

class BusBase(BaseModel):
    plate_number: str
    name: Optional[str] = None
    model: Optional[str] = None
    status: Optional[str] = 'Active'
    route_id: Optional[int] = None
    current_location: Optional[str] = None  # WKT format (e.g., 'POINT(lon lat)')

class BusCreate(BusBase):
    pass

# Model for Bus update (PUT)
class BusUpdate(BusBase):
    pass

# Model for Bus response (GET)
class BusOut(BaseModel):
    bus_id: int
    plate_number: str
    name: Optional[str] = None
    model: Optional[str] = None
    status: str
    route_id: Optional[int] = None
    current_location: Optional[str] = None  # WKT

    class Config:
        from_attributes = True
