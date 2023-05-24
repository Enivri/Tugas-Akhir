from flask import request, abort
from server import app, db, token_required
from models.checkUp import CheckUp
from models.operation import Operation
from models.user import User
from sqlalchemy import or_

@app.route("/api/v1/checkUp", methods=["GET", "POST"])
@token_required
def create_checkUp(data):
    if request.method == "POST":
        body = request.get_json()
        code = body["operation_code"]
        operation = Operation.query.filter_by(code=code).first()
        if operation is None:
            return abort(404, "user not found")
        patient_id = operation.patient_id
        doctor_id = data["id"]
        operation_id = operation.id
        right_eye_pic = body["right_eye_pic"]
        left_eye_pic = body["left_eye_pic"]
        description = body["description"]

        
        checkUp = CheckUp(patient_id, doctor_id, operation_id, right_eye_pic, left_eye_pic, description)
        db.session.add(checkUp)
        db.session.commit()

        response = {
        "data":{
            "id": checkUp.id,
            "patient_id": checkUp.patient_id,
            "doctor_id": checkUp.doctor_id,
            "operation_id": checkUp.operation_id,
            "right_eye_pic": checkUp.right_eye_pic,
            "left_eye_pic": checkUp.left_eye_pic,
            "description": checkUp.description,
            "created_at": checkUp.created_at
            }
        }
        
        return response

    # /api/v1/checkUp?operationId= <- request argument atau query params
    elif request.method == "GET":
        args = request.args
        operation_id = args.get("operation_id") # args["operationId"]
        patient_id = args.get("patient_id")
        doctor_id = args.get("doctor_id")
        search = args.get("search") 

        limit = args.get("limit", 10)
        offset = args.get("offset", 1)

        query = CheckUp.query
        if operation_id:
            query = query.filter_by(operation_id=operation_id)
        if patient_id:
            query = query.filter_by(patient_id=patient_id)    
        if doctor_id:
            query = query.filter_by(doctor_id=doctor_id)    
        if search:
            searchName = "%{}%".format(search)
            query= query.join (User, CheckUp.patient_id==User.id)
            query= query.join (Operation, CheckUp.operation_id==Operation.id)
            query = query.filter(or_ (User.name.like(searchName), User.nik.like(search), User.town.like(search), Operation.code.like(search)))    
        
        query = query.order_by(CheckUp.created_at.desc()).paginate(page=int(offset), per_page=int(limit), error_out=False)

        response = {
            "data": [],
            "hasPrevPage": query.has_prev,
            "hasNextPage": query.has_next
        }
        for checkUp in query:
            response["data"].append({
            "id": checkUp.id,
            "patient_id": checkUp.patient_id,
            "user": {
                "id": checkUp.user.id,
                "name": checkUp.user.name,
                "nik": checkUp.user.nik,
                "email": checkUp.user.email,
                "town": checkUp.user.town,
                "gender": checkUp.user.gender.value,
                "birth_date": checkUp.user.birth_date,
                "phone": checkUp.user.phone,
                "picture": checkUp.user.picture,
                "role": checkUp.user.role.value,
                "created_at": checkUp.user.created_at,
                },
            "doctor_id": checkUp.doctor_id,
            "operation_id": checkUp.operation_id,
            "operation": {
                    "code": checkUp.operation.code,
            },
            "right_eye_pic": checkUp.right_eye_pic,
            "left_eye_pic": checkUp.left_eye_pic,
            "description": checkUp.description,
            "created_at": checkUp.created_at
            })

        return response

@app.route("/api/v1/checkUp/<int:id>", methods=["PUT", "DELETE", "GET"])
def by_id_checkUp(id):
    checkUp= CheckUp.query.filter_by(id=id).first()
    if checkUp is None:
        return abort(404, "CheckUp Not Found")

    if request.method == "PUT":
        body = request.get_json()
        patient_id = body["patient_id"]
        operation_id = body["operation_id"]
        right_eye_pic = body["right_eye_pic"]
        left_eye_pic = body["left_eye_pic"]
        description = body["description"]

        checkUp.patient_id = patient_id
        checkUp.operation_id = operation_id
        checkUp.right_eye_pic = right_eye_pic
        checkUp.left_eye_pic = left_eye_pic
        checkUp.description = description

        db.session.add(checkUp)
        db.session.commit()
        

        response = {
        "data":{
            "id": checkUp.id,
            "patient_id": checkUp.patient_id,
            "doctor_id": checkUp.doctor_id,
            "operation_id": checkUp.operation_id,
            "right_eye_pic": checkUp.right_eye_pic,
            "left_eye_pic": checkUp.left_eye_pic,
            "description": checkUp.description,
            "created_at": checkUp.created_at
            }
        }

        return response

    if request.method == "DELETE":
        db.session.delete(checkUp)
        db.session.commit()

        return "Operation has been deleted"

    if request.method == "GET":
        response = {
        "data":{
            "id": checkUp.id,
            "patient_id": checkUp.patient_id,
            "user": {
                "id": checkUp.user.id,
                "name": checkUp.user.name,
                "nik": checkUp.user.nik,
                "email": checkUp.user.email,
                "town": checkUp.user.town,
                "gender": checkUp.user.gender.value,
                "birth_date": checkUp.user.birth_date,
                "phone": checkUp.user.phone,
                "picture": checkUp.user.picture,
                "role": checkUp.user.role.value,
                "created_at": checkUp.user.created_at,
                },
            "doctor_id": checkUp.doctor_id,
            "operation_id": checkUp.operation_id,
            "operation": {
                    "code": checkUp.operation.code,
            },
            "right_eye_pic": checkUp.right_eye_pic,
            "left_eye_pic": checkUp.left_eye_pic,
            "description": checkUp.description,
            "created_at": checkUp.created_at
            }
        }

        return response

