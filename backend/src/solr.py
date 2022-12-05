import pysolr
import requests
import urllib.parse
from env import URL
import urllib.parse
# from '/backend/classifier/classifier.py' import clas

class Solr:

    def reddit_query(self,text,topic):
        print("IN REDDIT")
        return {
                    "message":"HALLO"
                }    

    def chitchat_query(self,text,topic):
        text = f'"{text}"'
        query_url = f'/select?q=query:{text}&rows=1&wt=json'
        # idx = classify_0_1(text)

        res = requests.get(URL+query_url)
        # print(res)
        print(res.json()['response'] )
        if res.ok:
            response = res.json()['response']
            # print(response)    
            if response['numFound']>0:
                return {
                    "message":response['docs'][0]['response'][0]
                }    
            else:
                return {
                    'message': "Aw, snap!! I don't have any response for that"
                }
        return {}



