from flask import request, abort
from flask_cors import CORS, cross_origin
from server import app, db
from models.prediction import Prediction
from models.user import User
from sqlalchemy import or_
from PIL import Image
import requests
from io import BytesIO
from tensorflow.keras.preprocessing import image
import numpy as np
import cv2

# copas preprocessnya dia

def preprocess_data(img):
    img = cv2.resize(img, dsize=(200, 200), interpolation=cv2.INTER_CUBIC)
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis = 0)
    img = np.vstack([img])
    return img

def get_condition(image_url):
    response = requests.get(image_url)
    img = np.array(Image.open(BytesIO(response.content)))
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    # preprocess data
    img = preprocess_data(img)

    # 0..1
    result = app.config["ML_MODEL"].predict(img)
    print(result)
    if result == app.config["ML_THRESHOLD"]:
        return "katarak"

    return "normal"

@app.route("/api/v1/prediction", methods=["POST"])
@cross_origin()
def create_prediction():
    body = request.get_json()
    nik= body["nik"]
    user = User.query.filter_by(nik=nik).first()
    if user is None:
        return abort(404, "user not found")
    patient_id = user.id
    right_eye_pic = body["right_eye_pic"] # url image
    left_eye_pic = body["left_eye_pic"]
    right_eye_cond = get_condition(right_eye_pic)
    left_eye_cond = get_condition(left_eye_pic)
    
    prediction = Prediction(patient_id, right_eye_pic, left_eye_pic, right_eye_cond, left_eye_cond)
    db.session.add(prediction)
    db.session.commit()

    response = {
        "data":{
            "id": prediction.id,
            "patient_id": prediction.patient_id,
            "right_eye_pic": prediction.right_eye_pic,
            "left_eye_pic": prediction.left_eye_pic,
            "right_eye_cond": prediction.right_eye_cond,
            "left_eye_cond":prediction.left_eye_cond,
            "created_at": prediction.created_at
        }
    }
    
    return response

@app.route("/api/v1/prediction/<int:id>", methods=["PUT", "DELETE", "GET"])
@cross_origin()
def by_id_prediction(id):
    prediction = Prediction.query.filter_by(id=id).first()
    if prediction is None:
        return abort(404, "Prediction Not Found")

    if request.method == "PUT":
        body = request.get_json()
        nik= body["nik"]
        user = User.query.filter_by(nik=nik).first()
        if user is None:
            return abort(404, "user not found")
        patient_id = user.id
        right_eye_pic = body["right_eye_pic"]
        left_eye_pic = body["left_eye_pic"]
        right_eye_cond = get_condition(right_eye_pic)
        left_eye_cond = get_condition(left_eye_pic)

        prediction.patient_id = patient_id
        prediction.right_eye_pic = right_eye_pic
        prediction.left_eye_pic = left_eye_pic
        prediction.right_eye_cond = right_eye_cond
        prediction.left_eye_cond = left_eye_cond

        db.session.add(prediction)
        db.session.commit()
        

        response = {
        "data":{
            "id": prediction.id,
            "patient_id": prediction.patient_id,
            "right_eye_pic": prediction.right_eye_pic,
            "left_eye_pic": prediction.left_eye_pic,
            "right_eye_cond": prediction.right_eye_cond,
            "left_eye_cond":prediction.left_eye_cond,
            }
        }

        return response

    if request.method == "DELETE":
        db.session.delete(prediction)
        db.session.commit()

        return "Prediction has been deleted"

    if request.method == "GET":
        response = {
        "data":{
            "id": prediction.id,
            "patient_id": prediction.patient_id,
            "right_eye_pic": prediction.right_eye_pic,
            "left_eye_pic": prediction.left_eye_pic,
            "right_eye_cond": prediction.right_eye_cond,
            "left_eye_cond":prediction.left_eye_cond,
            "created_at": prediction.created_at,
            "user": {
                "id": prediction.user.id,
                "name": prediction.user.name,
                "nik": prediction.user.nik,
                "email": prediction.user.email,
                "town": prediction.user.town,
                "gender": prediction.user.gender.value,
                "birth_date": prediction.user.birth_date,
                "phone": prediction.user.phone,
                "picture": prediction.user.picture,
                "role": prediction.user.role.value,
                "created_at": prediction.user.created_at,
                },
            }
        }

        return response

@app.route("/api/v1/prediction", methods=["GET"])
@cross_origin()
def get_all_prediction():
    args = request.args
    patient_id = args.get("patient_id") 
    search = args.get("search")

    query = Prediction.query

    limit = args.get("limit", 10)
    offset = args.get("offset", 1)

    if patient_id:
        query = query.filter_by(patient_id=patient_id)
    if search:
        searchName = "%{}%".format(search)
        query= query.join (User)
        query = query.filter(or_ (User.name.like(searchName), User.nik.like(search), User.town.like(search)))    

    query = query.order_by(Prediction.created_at.desc()).paginate(page=int(offset), per_page=int(limit), error_out=False)

    response = {
        "data": [],
        "hasPrevPage": query.has_prev,
        "hasNextPage": query.has_next
    }
    for prediction in query.items:
        response["data"].append({
        "id": prediction.id,
        "patient_id": prediction.patient_id,
        "user": {
                "id": prediction.user.id,
                "name": prediction.user.name,
                "nik": prediction.user.nik,
                "email": prediction.user.email,
                "town": prediction.user.town,
                "gender": prediction.user.gender.value,
                "birth_date": prediction.user.birth_date,
                "phone": prediction.user.phone,
                "picture": prediction.user.picture,
                "role": prediction.user.role.value,
                "created_at": prediction.user.created_at,
                },
        "right_eye_pic": prediction.right_eye_pic,
        "left_eye_pic": prediction.left_eye_pic,
        "right_eye_cond": prediction.right_eye_cond,
        "left_eye_cond":prediction.left_eye_cond,
        "created_at": prediction.created_at
        })

    return response
