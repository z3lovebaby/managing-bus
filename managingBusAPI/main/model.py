
from .extension import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(36), nullable=False)
    phone = db.Column(db.String(11), nullable=False)
    password = db.Column(db.String(512), nullable=False)
    role = db.Column(db.String(10), nullable=True)
    def __init__(self, name, username, email, phone, password, role):
        self.name = name
        self.username = username
        self.email = email
        self.phone = phone
        self.password = password
        self.role = role
#
#
# class Books(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     page_count = db.Column(db.Integer)
#     author_id = db.Column(db.Integer, db.ForeignKey('author.id'))
#     category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
#
#     def __init__(self, name, page_count, author_id, category_id):
#         self.name = name
#         self.page_count = page_count
#         self.author_id = author_id
#         self.category_id = category_id
#
#
# class Borrows(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     book_id = db.Column(db.Integer, db.ForeignKey("books.id"))
#     student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
#     borrow_date = db.Column(db.Date)
#     return_date = db.Column(db.Date)
#
#     def __init__(self, book_id, student_id, borrow_date, return_date):
#         self.book_id = book_id
#         self.student_id = student_id
#         self.borrow_date = borrow_date
#         self.return_date = return_date
#
#
# class Category(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), unique=True, nullable=False)
#
#     def __init__(self, name):
#         self.name = name
#
#
# class Author(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), unique=True, nullable=False)
#
#     def __init__(self, name):
#         self.name = name
