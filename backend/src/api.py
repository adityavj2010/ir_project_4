from http import HTTPStatus
from flask import Blueprint,request

from src.solr import Solr

api = Blueprint('api', __name__)

solr = Solr()
def getClassifiedLabel():
    import random
    # return random.choice([0,1])
    return 0

@api.route('/query',methods=['POST'])
def query():
    body = request.json
    text = body["query"]
    topic = body["topic"]
    if getClassifiedLabel() == 0:
        result = solr.chitchat_query(text,topic)
    else:
        result = solr.reddit_query(text, topic)
    return result, 200