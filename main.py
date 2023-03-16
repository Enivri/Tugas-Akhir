from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
db = SQLAlchemy(app)

from models.name import Result

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/test")
def test():
    return "test!"

if __name__ == "__main__":
    app.run(debug=True)
