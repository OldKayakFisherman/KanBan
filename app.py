from flask import Flask
from flask import render_template
from flask import request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
db = SQLAlchemy(app)


class Task(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)


class Tag(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String, nullable=False)


@app.route('/')
def index(prms=None):  # put application's code here
    return render_template('index.html', prms=prms)


@app.route('/api/updateTask', methods=['POST'])
def updateTask():
    print(request.json)
    return "Success", 200, {"Access-Control-Allow-Origin": "*"}


if __name__ == '__main__':
    app.run()
