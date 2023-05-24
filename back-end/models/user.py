# import sys
# sys.path.append("..")

from server import db, bcrypt
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime

import enum

class Gender(enum.Enum):
    female = 'female'
    male = 'male'

class Role(enum.Enum):
    admin = 'admin'
    doctor = 'doctor'
    patient = 'patient'

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    nik = db.Column(db.String())
    email = db.Column(db.String())
    password = db.Column(db.String())
    town = db.Column(db.String())
    gender = db.Column(db.Enum(Gender))
    birth_date = db.Column(db.DateTime())
    phone = db.Column(db.String())
    picture = db.Column(db.String())
    role = db.Column(db.Enum(Role))
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())


    def __init__(self, name, nik, email, password, town, gender, birth_date, phone, role, picture=None):
        self.name = name
        self.nik = nik
        self.email = email
        self.password = bcrypt.generate_password_hash(password, 10).decode('utf-8')
        self.town = town
        self.gender = gender
        self.birth_date = birth_date
        self.phone = phone
        self.picture = picture
        self.role = role
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password) # returns True

    # def __repr__(self):
    #     return '<id {}>'.format(self.id)



