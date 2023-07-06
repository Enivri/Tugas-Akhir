from flask import request, abort
from flask_cors import CORS, cross_origin
from server import app, db, token_required, role_required
from models.operation import Operation
from models.diagnosis import Diagnosis
from models.user import User
from sqlalchemy import or_

@app.route("/api/v1/operation", methods=["POST"])
@token_required
@cross_origin()
@role_required(["admin", "doctor"])
def create_operation(data):
    body = request.get_json()
    diagnosis_code = body["diagnosis_code"]
    diagnosis = Diagnosis.query.filter_by(code=diagnosis_code).first()
    if diagnosis is None:
        return abort(404, "user not found")
    patient_id = diagnosis.patient_id
    doctor_id = data["id"]
    diagnosis_id = diagnosis.id
    code = Operation.generate_code()
    right_eye_pic = body["right_eye_pic"]
    left_eye_pic = body["left_eye_pic"]
    result = body["result"]
    description = body["description"]

    
    operation = Operation(patient_id, doctor_id, diagnosis_id, code, right_eye_pic, left_eye_pic, result, description)
    db.session.add(operation)
    db.session.commit()

    response = {
    "data":{
        "id": operation.id,
        "patient_id": operation.patient_id,
        "doctor_id": operation.doctor_id,
        "diagnosis_id": operation.diagnosis_id,
        "code": operation.code,
        "right_eye_pic": operation.right_eye_pic,
        "left_eye_pic": operation.left_eye_pic,
        "result": operation.result,
        "description": operation.description,
        "created_at": operation.created_at
        }
    }
    
    return response

@app.route("/api/v1/operation/<int:id>", methods=["PUT"])
@token_required
@cross_origin()
@role_required(["admin"])
def update_operation(data, id):
    operation = Operation.query.filter_by(id=id).first()
    if operation is None:
        return abort(404, "Operation Not Found")

    if request.method == "PUT":
        body = request.get_json()
        diagnosis_code = body["diagnosis_code"]
        diagnosis = Diagnosis.query.filter_by(code=diagnosis_code).first()
        if diagnosis is None:
            return abort(404, "user not found")
        patient_id = diagnosis.patient_id
        diagnosis_id = diagnosis.id
        right_eye_pic = body["right_eye_pic"]
        left_eye_pic = body["left_eye_pic"]
        result = body["result"]
        description = body["description"]

        operation.patient_id = patient_id
        operation.diagnosis_id = diagnosis_id
        operation.right_eye_pic = right_eye_pic
        operation.left_eye_pic = left_eye_pic
        operation.result = result
        operation.description = description

        db.session.add(operation)
        db.session.commit()
        

        response = {
        "data":{
            "id": operation.id,
            "patient_id": operation.patient_id,
            "doctor_id": operation.doctor_id,
            "diagnosis_id": operation.diagnosis_id,
            "code": operation.code,
            "right_eye_pic": operation.right_eye_pic,
            "left_eye_pic": operation.left_eye_pic,
            "result": operation.result,
            "description": operation.description,
            }
        }

        return response

@app.route("/api/v1/operation/<int:id>", methods=["DELETE"])
@token_required
@cross_origin()
@role_required(["admin"])
def delete_operation(data, id):
    operation = Operation.query.filter_by(id=id).first()
    if operation is None:
        return abort(404, "Operation Not Found")

    if request.method == "DELETE":
        db.session.delete(operation)
        db.session.commit()

        return "Operation has been deleted"

@app.route("/api/v1/operation/<int:id>", methods=["GET"])
@token_required
@cross_origin()
@role_required(["admin", "doctor"])
def get_operation_detail(data, id):
    operation = Operation.query.filter_by(id=id).first()
    if operation is None:
        return abort(404, "Operation Not Found")

    if request.method == "GET":
        response = {
        "data":{
            "id": operation.id,
            "patient_id": operation.patient_id,
            "doctor_id": operation.doctor_id,
            "diagnosis_id": operation.diagnosis_id,
            "code": operation.code,
            "right_eye_pic": operation.right_eye_pic,
            "left_eye_pic": operation.left_eye_pic,
            "result": operation.result,
            "description": operation.description,
            "created_at": operation.created_at,
            "user": {
                "id": operation.user.id,
                "name": operation.user.name,
                "nik": operation.user.nik,
                "email": operation.user.email,
                "town": operation.user.town,
                "gender": operation.user.gender.value,
                "birth_date": operation.user.birth_date,
                "phone": operation.user.phone,
                "picture": operation.user.picture,
                "role": operation.user.role.value,
                "created_at": operation.user.created_at,
                },
            "diagnosis":{
                "id": operation.diagnosis.id,
                "patient_id": operation.diagnosis.patient_id,
                "doctor_id": operation.diagnosis.doctor_id,
                "prediction_id": operation.diagnosis.prediction_id,
                "code": operation.diagnosis.code,
                "right_eye_pic": operation.diagnosis.right_eye_pic,
                "left_eye_pic": operation.diagnosis.left_eye_pic,
                "right_eye_cond": operation.diagnosis.right_eye_cond,
                "left_eye_cond":operation.diagnosis.left_eye_cond,
                "description": operation.diagnosis.description,
                "created_at": operation.diagnosis.created_at
                },
            "doctor": {
                "id": operation.doctor.id,
                "name": operation.doctor.name,
                "nik": operation.doctor.nik,
                "email": operation.doctor.email,
                "town": operation.doctor.town,
                "gender": operation.doctor.gender.value,
                "birth_date": operation.doctor.birth_date,
                "phone": operation.doctor.phone,
                "picture": operation.doctor.picture,
                "role": operation.doctor.role.value,
                "created_at": operation.doctor.created_at,
                },
            }
        }

        return response

@app.route("/api/v1/operation", methods=["GET"])
@token_required
@cross_origin()
@role_required(["admin", "doctor"])
def get_all_operation(data):
    args = request.args
    patient_id = args.get("patient_id")
    doctor_id = args.get("doctor_id")
    code = args.get("code") 
    search = args.get("search")

    limit = args.get("limit", 10)
    offset = args.get("offset", 1)

    query = Operation.query
    if patient_id:
        query = query.filter_by(patient_id=patient_id)
    if doctor_id:
        query = query.filter_by(doctor_id=doctor_id)  
    if code:
        query = query.filter_by(code=code)
    if search:
        searchName = "%{}%".format(search)
        query= query.join (User, Operation.patient_id==User.id)
        query = query.filter(or_ (User.name.like(searchName), User.nik.like(search), User.town.like(search), Operation.code.like(search)))     

    query = query.order_by(Operation.created_at.desc()).paginate(page=int(offset), per_page=int(limit), error_out=False)

    response = {
        "data": [],
        "hasPrevPage": query.has_prev,
        "hasNextPage": query.has_next
    }
    for operation in query.items:
        response["data"].append({
        "id": operation.id,
        "patient_id": operation.patient_id,
        "user": {
            "id": operation.user.id,
            "name": operation.user.name,
            "nik": operation.user.nik,
            "email": operation.user.email,
            "town": operation.user.town,
            "gender": operation.user.gender.value,
            "birth_date": operation.user.birth_date,
            "phone": operation.user.phone,
            "picture": operation.user.picture,
            "role": operation.user.role.value,
            "created_at": operation.user.created_at,
            },
        "doctor_id": operation.doctor_id,
        "diagnosis_id": operation.diagnosis_id,
        "code": operation.code,
        "right_eye_pic": operation.right_eye_pic,
        "left_eye_pic": operation.left_eye_pic,
        "result": operation.result,
        "description": operation.description,
        "created_at": operation.created_at
        })

    return response