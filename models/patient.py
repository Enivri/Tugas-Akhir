# import sys
# sys.path.append("..")

from main import db
from sqlalchemy.dialects.postgresql import JSON
from models.user import User
from models.diagnosis import Diagnosis
from models.prediction import Prediction
from models.operation import Operation


class Patient(db.Model):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    doctor_id = db.Column(db.Integer, db.ForeignKey(User.id))
    diagnosis_id = db.Column(db.Integer, db.ForeignKey(Diagnosis.id))
    prediction_id = db.Column(db.Integer, db.ForeignKey(Prediction.id))
    operation_id = db.Column(db.Integer, db.ForeignKey(Operation.id))


    def __init__(self, user_id, doctor_id, diagnosis_id, prediction_id, operation_id):
        self.user_id = user_id
        self.doctor_id = doctor_id
        self.diagnosis_id = diagnosis_id
        self.prediction_id = prediction_id
        self.operation_id = operation_id

    # def __repr__(self):
    #     return '<id {}>'.format(self.id)