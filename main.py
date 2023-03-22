from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import models

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
db = SQLAlchemy(app)

# from models.user import User
# from models.diagnosis import Diagnosis
# from models.prediction import Prediction
# from models.operation import Operation
# from models.checkUp import CheckUp
# from models.patient import Patient
from models import *

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/test")
def test():
    return "test!"

@app.route("/api/v1/users", methods=["POST"])
def create_user():
    body = request.get_json()
    name = body["name"]
    email = body["email"]
    password = body["password"]
    town = body["town"]
    gender = body["gender"]
    phone = body["phone"]
    role = "patient" 
    

    user = models.user.User(name, email, password, town, gender, phone, role)
    db.session.add(user)
    db.session.commit()

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "town": user.town,
        "gender": user.gender,
        "phone": user.phone,
        "role": user.role
    }

    return response



if __name__ == "__main__":
    app.run(debug=True)
