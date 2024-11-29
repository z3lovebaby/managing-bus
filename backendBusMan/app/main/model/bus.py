from .. import db
from app.main.model.routes import Route  # Import the Route model for foreign key reference

class Bus(db.Model):
    """ Bus Model for storing bus-related details """
    __tablename__ = "bus"

    bus_id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Primary Key
    plate_number = db.Column(db.String(50), unique=True, nullable=False)  # Unique plate number
    name = db.Column(db.String(100), nullable=True)  # Name of the bus
    model = db.Column(db.String(100), nullable=True)  # Model of the bus
    status = db.Column(db.String(20), nullable=False)  # Status of the bus (active, maintenance, etc.)

    # Foreign Key to Routes table, assuming Route table exists with a primary key of route_id
    route_id = db.Column(db.Integer, db.ForeignKey('route.route_id'), nullable=False)

    # Relationship with Route
    route = db.relationship('Route', backref='buses', lazy=True)

    def __repr__(self):
        return f"<Bus {self.name} - {self.plate_number}>"
