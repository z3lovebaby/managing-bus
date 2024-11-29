import uuid
import datetime

from sqlalchemy import or_
from sqlalchemy.orm import joinedload

from app.main import db
from app.main.model.driver import Driver
from app.main.model.user import User

def to_pascal_case(name):
    # Tách chuỗi thành các từ, viết hoa chữ cái đầu của mỗi từ, sau đó nối lại với nhau
    return ' '.join(word.capitalize() for word in name.split())

def create(data):
    user = User.query.filter(
        or_(
            User.email == data['email'],
            User.phone == data['phone'],
            User.username == data['username']
        )
    ).first()
    if not user:
        pascal_case_name = to_pascal_case(data['name'])
        new_user = User(
            public_id=str(uuid.uuid4()),
            email=data['email'],
            name = pascal_case_name,
            phone=data['phone'],
            admin=False,
            username=data['username'],
            password=data['password'],
            registered_on=datetime.datetime.utcnow()
        )
        save_changes(new_user)
        response_object = {
            'status': 'success',
            'message': 'Successfully registered.',
        }
        return response_object, 201
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Try again.',
        }
        return response_object, 409
def create_driver(data):
    user = User.query.filter(
        or_(
            User.email == data['email'],
            User.phone == data['phone'],
            User.username == data['username']
        )
    ).first()
    if not user:
        pascal_case_name = to_pascal_case(data['name'])
        new_user = User(
            public_id=str(uuid.uuid4()),
            email=data['email'],
            name = pascal_case_name,
            phone=data['phone'],
            admin=False,
            username=data['username'],
            password=data['password'],
            registered_on=datetime.datetime.utcnow()
        )
        save_changes(new_user)
        new_driver = Driver(
            license_number=data['blx'],
            bus_id=data['bus_id'],
            status='active',
            user_id = new_user.id
        )
        save_changes(new_driver)
        response_object = {
            'status': 'success',
            'message': 'Đăng kí tài xế thành công.',
        }
        return response_object, 201
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Using another info to create driver account.',
        }
        return response_object, 409
def get_all_manager():
    return User.query.all()
def get_all_driver():
    # Lấy tất cả các driver và thông tin user tương ứng
    drivers = Driver.query.options(joinedload(Driver.user)).all()

    # Chuyển dữ liệu thành dạng dictionary phẳng
    result = []
    for driver in drivers:
        result.append({
            "driver_id": driver.id,
            "blx": driver.license_number,
            "status": driver.status,
            "bus_id": driver.bus_id,
            "user_id": driver.user.id,
            "name": driver.user.name,
            "email": driver.user.email,
            "phone": driver.user.phone,
            "username": driver.user.username,
        })

    return result

def save_changes(data):
    try:
        db.session.add(data)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise e  # Hoặc ghi log lỗi