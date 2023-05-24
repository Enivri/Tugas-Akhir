from flask import request, abort
from server import app, db, token_required
from flask_cors import CORS, cross_origin
from models.diagnosis import Diagnosis
from models.prediction import Prediction
from models.user import User
from sqlalchemy import or_

@app.route("/api/v1/diagnosis", methods=["POST"])
@token_required
@cross_origin()
def create_diagnosis(data):
    body = request.get_json()
    nik= body["nik"]
    user = User.query.filter_by(nik=nik).first()
    if user is None:
        return abort(404, "user not found")
    patient_id = user.id
    doctor_id = data["id"]
    prediction = Prediction.query.filter_by(patient_id=patient_id).order_by(Prediction.id.desc()).first()
    prediction_id = prediction.id
    code = Diagnosis.generate_code()
    right_eye_pic = body["right_eye_pic"]
    left_eye_pic = body["left_eye_pic"]
    right_eye_cond = body["right_eye_cond"]
    left_eye_cond = body["left_eye_cond"]
    description = body["description"]
    
    diagnosis = Diagnosis(patient_id, doctor_id, prediction_id, code, right_eye_pic, left_eye_pic, right_eye_cond, left_eye_cond, description)
    db.session.add(diagnosis)
    db.session.commit()

    response = {
    "data":{
        "id": diagnosis.id,
        "patient_id": diagnosis.patient_id,
        "doctor_id": diagnosis.doctor_id,
        "prediction_id": diagnosis.prediction_id,
        "code": diagnosis.code,
        "right_eye_pic": diagnosis.right_eye_pic,
        "left_eye_pic": diagnosis.left_eye_pic,
        "right_eye_cond": diagnosis.right_eye_cond,
        "left_eye_cond":diagnosis.left_eye_cond,
        "description": diagnosis.description,
        "created_at": diagnosis.created_at
        }
    }
    
    return response

@app.route("/api/v1/diagnosis/<int:id>", methods=["PUT", "DELETE", "GET"])
@cross_origin()
def by_id_diagnosis(id):
    diagnosis = Diagnosis.query.filter_by(id=id).first()
    if diagnosis is None:
        return abort(404, "Diagnosis Not Found")

    if request.method == "PUT":
        body = request.get_json()
        nik= body["nik"]
        user = User.query.filter_by(nik=nik).first()
        if user is None:
            return abort(404, "user not found")
        patient_id = user.id
        doctor_id = body["doctor_id"]
        prediction_id = body["prediction_id"]
        right_eye_pic = body["right_eye_pic"]
        left_eye_pic = body["left_eye_pic"]
        right_eye_cond = body["right_eye_cond"]
        left_eye_cond = body["left_eye_cond"]
        description = body["description"]
        
        diagnosis.patient_id = patient_id
        diagnosis.doctor_id = doctor_id
        diagnosis.prediction_id = prediction_id
        diagnosis.right_eye_pic = right_eye_pic
        diagnosis.left_eye_pic = left_eye_pic
        diagnosis.right_eye_cond = right_eye_cond
        diagnosis.left_eye_cond = left_eye_cond
        diagnosis.description = description

        db.session.add(diagnosis)
        db.session.commit()
        

        response = {
        "data":{
            "id": diagnosis.id,
            "patient_id": diagnosis.patient_id,
            "doctor_id": diagnosis.doctor_id,
            "prediction_id": diagnosis.prediction_id,
            "code": diagnosis.code,
            "right_eye_pic": diagnosis.right_eye_pic,
            "left_eye_pic": diagnosis.left_eye_pic,
            "right_eye_cond": diagnosis.right_eye_cond,
            "left_eye_cond":diagnosis.left_eye_cond,
            "description": diagnosis.description,
            }
        }

        return response

    if request.method == "DELETE":
        db.session.delete(diagnosis)
        db.session.commit()

        return "Diagnosis has been deleted"

    if request.method == "GET":
        response = {
        "data":{
            "id": diagnosis.id,
            "patient_id": diagnosis.patient_id,
            "user": {
                "id": diagnosis.user.id,
                "name": diagnosis.user.name,
                "nik": diagnosis.user.nik,
                "email": diagnosis.user.email,
                "town": diagnosis.user.town,
                "gender": diagnosis.user.gender.value,
                "birth_date": diagnosis.user.birth_date,
                "phone": diagnosis.user.phone,
                "picture": diagnosis.user.picture,
                "role": diagnosis.user.role.value,
                "created_at": diagnosis.user.created_at,
                },
            "doctor_id": diagnosis.doctor_id,
            "prediction_id": diagnosis.prediction_id,
            "prediction": {
                "id": diagnosis.prediction.id,
                "patient_id": diagnosis.prediction.patient_id,
                "right_eye_pic": diagnosis.prediction.right_eye_pic,
                "left_eye_pic": diagnosis.prediction.left_eye_pic,
                "right_eye_cond": diagnosis.prediction.right_eye_cond,
                "left_eye_cond": diagnosis.prediction.left_eye_cond,
                },
            "code": diagnosis.code,
            "right_eye_pic": diagnosis.right_eye_pic,
            "left_eye_pic": diagnosis.left_eye_pic,
            "right_eye_cond": diagnosis.right_eye_cond,
            "left_eye_cond":diagnosis.left_eye_cond,
            "description": diagnosis.description,
            "created_at": diagnosis.created_at
            }
        }

        return response

@app.route("/api/v1/diagnosis", methods=["GET"])
@cross_origin()
def get_all_diagnosis():
    args = request.args
    patient_id = args.get("patient_id")
    doctor_id = args.get("doctor_id")
    code = args.get("code")
    search = args.get("search")

    limit = args.get("limit", 10)
    offset = args.get("offset", 1)

    query = Diagnosis.query
    if patient_id:
        query = query.filter_by(patient_id=patient_id)
    if doctor_id:
        query = query.filter_by(doctor_id=doctor_id)    
    if code:
        query = query.filter_by(code=code)
    if search:
        searchName = "%{}%".format(search)
        query= query.join (User, Diagnosis.patient_id==User.id)
        query = query.filter(or_ (User.name.like(searchName), User.nik.like(search), User.town.like(search), Diagnosis.code.like(search))) 

    query = query.order_by(Diagnosis.created_at.desc()).paginate(page=int(offset), per_page=int(limit), error_out=False)

    response = {
        "data": [],
        "hasPrevPage": query.has_prev,
        "hasNextPage": query.has_next
    }
    for diagnosis in query.items:
        response["data"].append({
        "id": diagnosis.id,
        "patient_id": diagnosis.patient_id,
            "user": {
                "id": diagnosis.user.id,
                "name": diagnosis.user.name,
                "nik": diagnosis.user.nik,
                "email": diagnosis.user.email,
                "town": diagnosis.user.town,
                "gender": diagnosis.user.gender.value,
                "birth_date": diagnosis.user.birth_date,
                "phone": diagnosis.user.phone,
                "picture": diagnosis.user.picture,
                "role": diagnosis.user.role.value,
                "created_at": diagnosis.user.created_at,
                },
        "doctor_id": diagnosis.doctor_id,
        "prediction_id": diagnosis.prediction_id,
        "code": diagnosis.code,
        "right_eye_pic": diagnosis.right_eye_pic,
        "left_eye_pic": diagnosis.left_eye_pic,
        "right_eye_cond": diagnosis.right_eye_cond,
        "left_eye_cond":diagnosis.left_eye_cond,
        "description": diagnosis.description,
        "created_at": diagnosis.created_at
        })

    return response