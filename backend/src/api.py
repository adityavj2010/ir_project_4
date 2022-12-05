from http import HTTPStatus
from flask import Blueprint,request

from src.solr import Solr
from classifier.classifier import classifier


api = Blueprint('api', __name__)

solr = Solr()
def getClassifiedLabel(text):
    return classifier(text)

@api.route('/query',methods=['POST'])
def query():
    body = request.json
    text = body["query"]
    topic = body["topic"]
    if getClassifiedLabel(text) == 0:
        result = solr.chitchat_query(text,topic)
    else:
        result = solr.reddit_query(text, topic)
    return result, 200