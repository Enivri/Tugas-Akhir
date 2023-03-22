# import sys
# sys.path.append("..")

from main import db
from sqlalchemy.dialects.postgresql import JSON


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())
    password = db.Column(db.String())
    town = db.Column(db.String())
    gender = db.Column(db.String())
    phone = db.Column(db.String())
    picture = db.Column(db.String())
    role = db.Column(db.String())



    def __init__(self, name, email, password, town, gender, phone, role, picture=None):
        self.name = name
        self.email = email
        self.password = password
        self.town = town
        self.gender = gender
        self.phone = phone
        self.picture = picture
        self.role = role

    # def __repr__(self):
    #     return '<id {}>'.format(self.id)