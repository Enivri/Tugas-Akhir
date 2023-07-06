# import sys
# sys.path.append("..")

from server import db
from sqlalchemy.dialects.postgresql import JSON
from models.diagnosis import Diagnosis
from models.user import User
from datetime import datetime
import random
import string

class Operation(db.Model):
    __tablename__ = 'operations'

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship("User", foreign_keys=[patient_id])
    doctor_id = db.Column(db.Integer, db.ForeignKey(User.id))
    doctor = db.relationship("User", foreign_keys=[doctor_id])
    diagnosis_id = db.Column(db.Integer, db.ForeignKey(Diagnosis.id))
    diagnosis = db.relationship("Diagnosis", foreign_keys=[diagnosis_id])
    code = db.Column(db.String())
    right_eye_pic = db.Column(db.String())
    left_eye_pic = db.Column(db.String())
    result = db.Column(db.String())
    description = db.Column(db.Text())
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())


    def __init__(self, patient_id, doctor_id, diagnosis_id, code, right_eye_pic, left_eye_pic, result, description):
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.diagnosis_id = diagnosis_id
        self.code = code
        self.right_eye_pic = right_eye_pic
        self.left_eye_pic = left_eye_pic
        self.result = result
        self.description = description
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    # def __repr__(self):
    #     return '<id {}>'.format(self.id)

    @staticmethod
    def generate_code():
        length = 12
        is_found = True
        while is_found:
            sample_string =  string.ascii_letters + string.digits
            result = ''.join((random.choice(sample_string)) for x in range(length))
            is_found = Operation.query.filter_by(code = result).first() is not None # select * from products where code = result limit 1
        return result