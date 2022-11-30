from http import HTTPStatus
from flask import Blueprint,request

from src.solr import Solr

api = Blueprint('api', __name__)

solr = Solr()

@api.route('/query',methods=['POST'])
def query():
    body = request.json
    text = body["query"]
    topic = body["topic"]
    result = solr.query(text,topic)
    return result, 200