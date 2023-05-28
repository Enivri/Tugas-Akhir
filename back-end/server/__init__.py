from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_seeder import FlaskSeeder
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from functools import wraps
import os
import jwt
import cloudinary
import cloudinary.uploader
import cloudinary.api
from tensorflow.keras.models import load_model

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SECRET_KEY']='004f2af45d3a4e161a7dd2d17fdae47f'
app.config["ML_MODEL"] = load_model(os.path.join(os.getcwd(), "MachineLearning.h5"))
app.config["ML_THRESHOLD"] = 0

cloudinary.config(
    cloud_name = os.getenv('CLOUD_NAME'), 
    api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'),
)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)


seeder = FlaskSeeder()
seeder.init_app(app, db)

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
            token = token.split(" ")[1]

        if not token:
            return jsonify({'message': 'a valid token is missing'})
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            print(data)
        except:
            return jsonify({'message': 'token is invalid'})

        return f(data, *args, **kwargs)
    return decorator

@app.route("/upload", methods=['POST'])
@cross_origin()
def upload_file():

    upload_result = None
    if request.method == 'POST':
        file_to_upload = request.files['file']

        if file_to_upload:
            upload_result = cloudinary.uploader.upload(file_to_upload)
            return jsonify(upload_result)

import models

import controller

