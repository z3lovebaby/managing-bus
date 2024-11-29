from model import Bus, BusStatus

class BusService:
    def __init__(self, session):
        self.session = session

    def create_bus(self, plate_number, name, model, route_id, current_location):
        new_bus = Bus(
            plate_number=plate_number,
            name=name,
            model=model,
            route_id=route_id,
            current_location=current_location
        )
        self.session.add(new_bus)
        self.session.commit()
        return new_bus

    def get_bus_by_id(self, bus_id):
        return self.session.query(Bus).filter(Bus.bus_id == bus_id).first()

    def get_all_buses(self):
        return self.session.query(Bus).all()

    def update_bus_status(self, bus_id, status):
        bus = self.get_bus_by_id(bus_id)
        if bus:
            bus.status = status
            self.session.commit()
            return bus
        return None

    def delete_bus(self, bus_id):
        bus = self.get_bus_by_id(bus_id)
        if bus:
            self.session.delete(bus)
            self.session.commit()
            return True
        return False
