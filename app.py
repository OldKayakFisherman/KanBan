from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route('/')
def index(prms=None):  # put application's code here
    return render_template('index.html', prms=prms)


if __name__ == '__main__':
    app.run()
