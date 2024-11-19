from main.extension import db
from main.manBus_ma import UserSchema
from main.model import User
from flask import request, jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from sqlalchemy.sql import func
import json
user_schema = UserSchema()
users_schema = UserSchema(many=True)

def login_service():
    data = request.json
    print(data)

    # Kiểm tra dữ liệu có đầy đủ các trường cần thiết không
    if data and ('email' in data) and ('password' in data):
        email = data['email']
        password = data['password']
        user = User.query.filter((User.username == email) | (User.email == email)).first()
        if user:
            if check_password_hash(user.password, password):
                return jsonify({"message": "Đăng nhập thành công!"}), 200
            else:
                return jsonify({"message": "Mật khẩu không đúng."}), 400
        else:
            return jsonify({"message": "Tài khoản không tồn tại."}), 400
    else:
        return jsonify({"message": "Yêu cầu không hợp lệ. Thiếu thông tin."}), 400