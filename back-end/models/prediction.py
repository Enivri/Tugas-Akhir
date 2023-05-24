# import sys
# sys.path.append("..")

from server import db
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime
from models.user import User


class Prediction(db.Model):
    __tablename__ = 'predictions'

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship("User")
    right_eye_pic = db.Column(db.String())
    left_eye_pic = db.Column(db.String())
    right_eye_cond = db.Column(db.String())
    left_eye_cond = db.Column(db.String())
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())



    def __init__(self, patient_id, right_eye_pic, left_eye_pic, right_eye_cond, left_eye_cond):
        self.patient_id = patient_id
        self.right_eye_pic = right_eye_pic
        self.left_eye_pic = left_eye_pic
        self.right_eye_cond = right_eye_cond
        self.left_eye_cond = left_eye_cond
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()


    # def __repr__(self):
    #     return '<id {}>'.format(self.id)