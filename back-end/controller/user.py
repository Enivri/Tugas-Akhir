from flask import request, abort
from flask_cors import CORS, cross_origin
from models.user import User
import datetime
import jwt
from server import app, db, bcrypt, token_required, role_required
from sqlalchemy import or_
from access import accesses


@app.route("/api/v1/login", methods=["POST"])
@cross_origin()
def login():
    body = request.get_json()
    email = body["email"]
    password = body["password"]

    user = User.query.filter_by(email=email).first()
    if user is None:
        return abort(404, "Email is not registered")

    is_password_matched = user.check_password(password) # true / false
    if not is_password_matched:
        return abort(401, "Wrong Password")

    available_accesses = accesses[user.role.value]

    # create jwt token
    token = jwt.encode({'id' : user.id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=240)}, app.config['SECRET_KEY'], "HS256")
    return {
        'token' : token.decode("utf-8"),
        'name' : user.name,
        "accesses": available_accesses,
    }

@app.route("/api/v1/signup", methods=["POST"])
@cross_origin()
def signup_user():
    if request.method == "POST":
        try:
            body = request.get_json()
            name = body["name"]
            nik = body["nik"]
            user = User.query.filter_by(nik=nik).first()
            if user is not None:
                return abort(409, "nik is already in use")
            email = body["email"]
            user = User.query.filter_by(email=email).first()
            if user is not None:
                return abort(409, "email is already in use")
            password = body["password"]
            town = body["town"]
            gender = body["gender"]
            birth_date = body["birth_date"]
            phone = body["phone"]
            picture = body["picture"]
            role = "patient" 
        
            user = User(name, nik, email, password, town, gender, birth_date, phone, role, picture)
            db.session.add(user)
            db.session.commit()

            response = {
                "id": user.id,
                "name": user.name,
                "nik": user.nik,
                "email": user.email,
                "town": user.town,
                "gender": user.gender.value,
                "birth_date": user.birth_date,
                "phone": user.phone,
                "picture": user.picture,
                "role": user.role.value,
                "created_at": user.created_at
            }
            
            return response
        except Exception as err:
            print(err)
            return abort(500, err)

@app.route("/api/v1/users", methods=["POST"])
@token_required
@cross_origin()
@role_required(["admin"])
def create_user(data):
    if request.method == "POST":
        try:
            body = request.get_json()
            name = body["name"]
            nik = body["nik"]
            user = User.query.filter_by(nik=nik).first()
            if user is not None:
                return abort(409, "nik is already in use")
            email = body["email"]
            user = User.query.filter_by(email=email).first()
            if user is not None:
                return abort(409, "email is already in use")
            password = body["password"]
            town = body["town"]
            gender = body["gender"]
            birth_date = body["birth_date"]
            phone = body["phone"]
            picture = body["picture"]
            role = "patient" 
        
            user = User(name, nik, email, password, town, gender, birth_date, phone, role, picture)
            db.session.add(user)
            db.session.commit()

            response = {
                "id": user.id,
                "name": user.name,
                "nik": user.nik,
                "email": user.email,
                "town": user.town,
                "gender": user.gender.value,
                "birth_date": user.birth_date,
                "phone": user.phone,
                "picture": user.picture,
                "role": user.role.value,
                "created_at": user.created_at
            }
            
            return response
        except Exception as err:
            print(err)
            return abort(500, err)

@app.route("/api/v1/doctor", methods=["POST"])
@token_required
@cross_origin()
@role_required(["admin"])
def create_doctor(data):
    if request.method == "POST":
        body = request.get_json()
        name = body["name"]
        nik = body["nik"]
        user = User.query.filter_by(nik=nik).first()
        if user is not None:
            return abort(409, "nik is already in use")
        email = body["email"]
        user = User.query.filter_by(email=email).first()
        if user is not None:
            return abort(409, "email is already in use")
        password = body["password"]
        town = body["town"]
        gender = body["gender"]
        birth_date = body["birth_date"]
        phone = body["phone"]
        picture = body["picture"]
        role = "doctor" 
    
        user = User(name, nik, email, password, town, gender, birth_date, phone, role, picture)
        db.session.add(user)
        db.session.commit()

        response = {
            "id": user.id,
            "name": user.name,
            "nik": user.nik,
            "email": user.email,
            "town": user.town,
            "gender": user.gender.value,
            "birth_date": user.birth_date,
            "phone": user.phone,
            "picture": user.picture,
            "role": user.role.value,
            "created_at": user.created_at
        }
        
        return response
    

@app.route("/api/v1/users/<int:id>", methods=["PUT"])
@token_required
@cross_origin()
@role_required(["admin"])
def update_user(data, id):
    user = User.query.filter_by(id=id).first()
    if user is None:
        return abort(404, "User Not Found")

    if request.method == "PUT":
        body = request.get_json()
        name = body["name"]
        nik = body["nik"]
        email = body["email"]
        town = body["town"]
        gender = body["gender"]
        birth_date = body["birth_date"]
        phone = body["phone"]
        picture = body["picture"]

        user.name = name
        user.nik = nik
        user.email = email  
        user.town = town
        user.gender = gender
        user.birth_date = birth_date
        user.phone = phone
        user.picture = picture

        db.session.add(user)
        db.session.commit()
        
        response = {
            "data": {
                "id": user.id,
                "name": user.name,
                "nik": user.nik,
                "email": user.email,
                "town": user.town,
                "gender": user.gender.value,
                "birth_date": user.birth_date,
                "phone": user.phone,
                "picture": user.picture,
                "role": user.role.value,
            }
        }

        return response

@app.route("/api/v1/users/<int:id>", methods=["DELETE"])
@token_required
@cross_origin()
@role_required(["admin"])
def delete_user(data, id):
    user = User.query.filter_by(id=id).first()
    if user is None:
        return abort(404, "User Not Found")

    if request.method == "DELETE":
        db.session.delete(user)
        db.session.commit()

        return "User has been deleted"

@app.route("/api/v1/users/<int:id>", methods=["GET"])
@token_required
@cross_origin()
@role_required(["admin", "doctor"])
def get_user_detail(data, id):
    user = User.query.filter_by(id=id).first()
    if user is None:
        return abort(404, "User Not Found")
    
    response = {
        "data": {
            "id": user.id,
            "name": user.name,
            "nik": user.nik,
            "email": user.email,
            "town": user.town,
            "gender": user.gender.value,
            "birth_date": user.birth_date,
            "phone": user.phone,
            "picture": user.picture,
            "role": user.role.value,
        }
    }

    return response

@app.route("/api/v1/users", methods=["GET"])
@token_required
@cross_origin()
@role_required(["admin", "doctor"])
def get_all_user(data):
    args = request.args
    role = args.get("role")
    search = args.get("search")

    limit = args.get("limit", 10)
    offset = args.get("offset", 1)

    query = User.query
    if role:
        query = query.filter_by(role=role)
    if search:
        searchName = "%{}%".format(search)
        query = query.filter(or_ (User.name.like(searchName), User.nik.like(search), User.town.like(search)))
        

    query = query.order_by(User.created_at.desc()).paginate(page=int(offset), per_page=int(limit), error_out=False)

    response = {
        "data": [],
        "hasPrevPage": query.has_prev,
        "hasNextPage": query.has_next
    }
    for user in query.items:
        response["data"].append({
        "id": user.id,
        "name": user.name,
        "nik": user.nik,
        "email": user.email,
        "town": user.town,
        "gender": user.gender.value,
        "birth_date": user.birth_date,
        "phone": user.phone,
        "picture": user.picture,
        "role": user.role.value,
        "created_at": user.created_at,
        })

    return response
