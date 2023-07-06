# import sys
# sys.path.append("..")

from server import db
from sqlalchemy.dialects.postgresql import JSON
from models.operation import Operation
from datetime import datetime
from models.user import User

class CheckUp(db.Model):
    __tablename__ = 'checkUp'

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship("User", foreign_keys=[patient_id])
    doctor_id = db.Column(db.Integer, db.ForeignKey(User.id))
    doctor = db.relationship("User", foreign_keys=[doctor_id])
    operation_id = db.Column(db.Integer, db.ForeignKey(Operation.id))
    operation = db.relationship("Operation")
    right_eye_pic = db.Column(db.String())
    left_eye_pic = db.Column(db.String())
    description = db.Column(db.Text())
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())

    def __init__(self, patient_id, doctor_id, operation_id, right_eye_pic, left_eye_pic, description):
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.operation_id = operation_id
        self.right_eye_pic = right_eye_pic
        self.left_eye_pic = left_eye_pic
        self.description = description
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    # def __repr__(self):
    #     return '<id {}>'.format(self.id)