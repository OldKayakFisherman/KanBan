import os

from flask import Flask
from flask import render_template
from flask import request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///{}/app.db'.format(os.path.dirname(__file__))


db = SQLAlchemy(app)


class Task(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    tags = relationship("Tag", back_populates="task")
    documents = relationship("Document", back_populates="task")

class Tag(db.Model):
    __tablename__ = "task_tags"
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String, nullable=False)
    task_id = db.Column(db.Integer, ForeignKey('tasks.id'))
    task = relationship("Task", back_populates="tags")


class Document(db.Model):
    __tablename__ = "task_documents"
    id = db.Column(db.Integer, primary_key=True)
    mimetype = db.Column(db.String, nullable=False)
    upload_filename = db.Column(db.String, nullable=False)
    generated_filename = db.Column(db.String, nullable=False)
    task_id = db.Column(db.Integer, ForeignKey('tasks.id'))
    task = relationship("Task", back_populates="documents")


with app.app_context():
    db.create_all()


@app.route('/')
def index(prms=None):  # put application's code here
    print(db.session.execute(db.select(Task)))
    tasks = db.session.execute(db.select(Task))
    return render_template('index.html', tasks=tasks)


@app.route('/api/updateTask', methods=['POST'])
def updateTask():
    print(request.json)
    return "Success", 200, {"Access-Control-Allow-Origin": "*"}


if __name__ == '__main__':
    app.run()
