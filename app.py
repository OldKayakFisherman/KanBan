from flask import Flask
from flask import render_template
from flask import request

app = Flask(__name__)


@app.route('/')
def index(prms=None):  # put application's code here
    return render_template('index.html', prms=prms)


@app.route('/api/updateTask', methods=['POST'])
def updateTask():
    print(request.json)
    return "Success", 200, {"Access-Control-Allow-Origin": "*"}

if __name__ == '__main__':
    app.run()
