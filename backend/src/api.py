from http import HTTPStatus
from flask import Blueprint

api = Blueprint('api', __name__)


@api.route('/')
def index():
    return {"test":"Testing"}, 200