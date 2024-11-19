from main.extension import db
from main.manBus_ma import UserSchema
from main.model import User
from flask import request, jsonify
from werkzeug.security import generate_password_hash
from sqlalchemy.sql import func
import json
user_schema = UserSchema()
users_schema = UserSchema(many=True)

def to_pascal_case(name):
    # Tách chuỗi thành các từ, viết hoa chữ cái đầu của mỗi từ, sau đó nối lại với nhau
    return ' '.join(word.capitalize() for word in name.split())
def register_service():
    data = request.json
    print(data)

    # Kiểm tra dữ liệu có đầy đủ các trường cần thiết không
    if data and ('fname' in data) and ('lname' in data) and ('username' in data) and ('email' in data) and ('phone' in data) and (
            'password' in data):
        pascal_case_name = to_pascal_case(data['fname']) +" " + to_pascal_case(data['lname'])
        name = pascal_case_name
        username = data['username']
        email = data['email']
        phone = data['phone']
        password = data['password']
        role = data.get('role', None)  # 'role' có thể không có, nên lấy giá trị mặc định là None

        # Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        hashed_password = generate_password_hash(password)
        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Username đã tồn tại."}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email đã tồn tại."}), 400
        if User.query.filter_by(phone=phone).first():
            return jsonify({"message": "Số điện thoại đã tồn tại."}), 400
        try:
            # Tạo một đối tượng User mới
            new_user = User(
                name=name,
                username=username,
                email=email,
                phone=phone,
                password=hashed_password,
                role=role
            )

            # Thêm người dùng vào cơ sở dữ liệu
            db.session.add(new_user)
            db.session.commit()

            # Trả về thông báo thành công
            return jsonify({"message": "Đăng ký thành công"}), 200
        except Exception as e:
            # Nếu có lỗi, rollback lại giao dịch
            db.session.rollback()
            print(e)  # In ra lỗi để dễ dàng debug
            return jsonify({"message": "Không thể đăng ký người dùng. Vui lòng thử lại."}), 400
    else:
        return jsonify({"message": "Yêu cầu không hợp lệ. Thiếu thông tin."}), 400

def add_user_service():
    data = request.json
    print(data)
    if data and ('name' in data) and ('age' in data):
        name = data['name']
        age = data['age']
        try:
            new_book = User(name, age)
            db.session.add(new_book)
            db.session.commit()
            return jsonify({"message": "Add success!"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Can not add book!"}), 400
    else:
        return jsonify({"message": "Request error"}), 400