import os

from flask import Flask, redirect, url_for
from flask import render_template
from flask import request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, select
from sqlalchemy.orm import relationship
from viewModels import IndexViewModel

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///{}/app.db'.format(os.path.dirname(__file__))


db = SQLAlchemy(app)


class Task(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    swimlane = db.Column(db.String, nullable=False)
    tags = relationship("Tag", cascade="all,delete", back_populates="task")
    documents = relationship("Document", cascade="all,delete", back_populates="task")



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

    backlog_data = db.session.execute(select(Task).where(Task.swimlane == 'BackLogLane')).scalars()
    planning_data = db.session.execute(select(Task).where(Task.swimlane == 'PlanningLane')).scalars()
    inprogress_data= db.session.execute(select(Task).where(Task.swimlane == 'InProgressLane')).scalars()
    complete_data= db.session.execute(select(Task).where(Task.swimlane == 'CompleteLane')).scalars()

    vm = IndexViewModel(backlog_data, planning_data, inprogress_data, complete_data)

    return render_template('index.html', model=vm)


@app.route('/task/updateSwimlane', methods=['PUT'])
def updateTaskSwimlane():
    task = Task.query.filter_by(id=request.get_json()['id']).first()

    if task is not None:
        task.swimlane = request.get_json()['currentSwimlane']
        db.session.commit()

    return "Success", 200, {"Access-Control-Allow-Origin": "*"}

@app.route('/task', methods=['GET', 'POST'])
def addNewTask():

    if request.method == 'GET':
        return render_template('task.html')
    elif request.method == 'POST':
        newTask = Task()
        newTask.title = request.form['txtTaskTitle']
        newTask.description = request.form['txtTaskDescription']
        newTask.swimlane = "BackLog"

        if request.form['hdnTags'] is not None:

            tagValues = []

            for tagValue in request.form['hdnTags'].split(','):
                tagRecord = Tag()
                tagRecord.value = tagValue
                tagValues.append(tagRecord)

            newTask.tags = tagValues

        db.session.add(newTask)
        db.session.commit()
        return redirect(url_for('index'))
    else:
        print(request.method)
        return render_template('task.html')


@app.route('/task/<int:task_id>', methods=['DELETE'])
def deleteTask(task_id):
    task = Task.query.filter_by(id=task_id).first()

    if task is not None:
        db.session.delete(task)
        db.session.commit()

    return "Success", 200, {"Access-Control-Allow-Origin": "*"}


if __name__ == '__main__':
    app.run()
