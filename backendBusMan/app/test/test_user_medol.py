import unittest
import datetime

from app.main import db
from app.main.model.user import User
from app.test.base import BaseTestCase


class TestUserModel(BaseTestCase):

    def test_encode_auth_token(self):
        user = User(
            email='test@test.com',
            password='test',
            registered_on=datetime.datetime.utcnow()
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.encode_auth_token(user)
        #print('in',isinstance(auth_token, str))
        self.assertTrue(isinstance(auth_token, str))

    def test_decode_auth_token(self):
        user = User(
            email='test@test.com',
            password='test',
            registered_on=datetime.datetime.utcnow()
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.encode_auth_token(user)
        self.assertTrue(isinstance(auth_token, str))
        #print(User.decode_auth_token(auth_token))
        self.assertTrue(User.decode_auth_token(auth_token) == '1')


if __name__ == '__main__':
    unittest.main()