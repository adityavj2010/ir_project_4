import pysolr
import requests
import urllib.parse
from env import URL
import urllib.parse
# from '/backend/classifier/classifier.py' import clas


def make_response(res):
    if res.ok:
        response = res.json()['response']
        if response['numFound'] > 0:
            if response['docs'][0]['score'] > 10:
                return {
                    "message": response['docs'][0]['response'][0]
                }
    return {
        'message': "Aw, snap!! I don't have any response for that"
    }

def make_query(query):
    return "/select?fl=score%2Cresponse&indent=true&q.op=OR&q=" + \
            urllib.parse(query)+'&rows=1&wt=json'


class Solr:

    def reddit_query(self, text, topic=None):
        query = f'(query:"{text}"~30)^2 or response:"{text}"~30'
        if topic:
            query += " topic:"+topic
        reddit_query = make_query(query)
        res = requests.get(URL["reddit"]+reddit_query)
        return make_response(res)

    def chitchat_query(self, text, topic):
        query = f'(query:"{text}"~30)^2 or response:"{text}"~30'
        chitchat_query = make_query(query)
        res = requests.get(URL["chitchat"]+chitchat_query)
        return make_response(res)