import time
import key
import os
import dataset
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app)

db = dataset.connect('sqlite:///tweet.db')
table = db.load_table('population')


@app.route('/')
def index():
    return jsonify(time.time())


@app.route('/search/<eventname>')
def search(eventname):
    pass


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/result', methods=['POST'])
def getEvent():
    # data = request.json

    return "OK"
