# import sys
# sys.path.append("..")

from main import db
from sqlalchemy.dialects.postgresql import JSON


class Prediction(db.Model):
    __tablename__ = 'predictions'

    id = db.Column(db.Integer, primary_key=True)
    right_eye_pic = db.Column(db.String())
    left_eye_pic = db.Column(db.String())
    right_eye_cond = db.Column(db.String())
    left_eye_cond = db.Column(db.String())



    def __init__(self, right_eye_pic, left_eye_pic, right_eye_cond, left_eye_cond):
        self.right_eye_pic = right_eye_pic
        self.left_eye_pic = left_eye_pic
        self.right_eye_cond = right_eye_cond
        self.left_eye_cond = left_eye_cond


    # def __repr__(self):
    #     return '<id {}>'.format(self.id)