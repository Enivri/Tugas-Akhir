# import sys
# sys.path.append("..")

from main import db
from sqlalchemy.dialects.postgresql import JSON
from models.operation import Operation

class CheckUp(db.Model):
    __tablename__ = 'checkUp'

    id = db.Column(db.Integer, primary_key=True)
    operation_id = db.Column(db.Integer, db.ForeignKey(Operation.id))
    check_up_url = db.Column(db.String())

    def __init__(self, operation_id, check_up_url):
        self.operation_id = operation_id
        self.check_up_url = check_up_url

    # def __repr__(self):
    #     return '<id {}>'.format(self.id)