# import sys
# sys.path.append("..")

from main import db
from sqlalchemy.dialects.postgresql import JSON


class Operation(db.Model):
    __tablename__ = 'operations'

    id = db.Column(db.Integer, primary_key=True)
    result_url = db.Column(db.String())

    def __init__(self, result_url):
        self.result_url = result_url

    # def __repr__(self):
    #     return '<id {}>'.format(self.id)