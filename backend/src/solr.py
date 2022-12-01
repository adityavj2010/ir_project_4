import pysolr
import requests
import urllib.parse
from env import URL

class Solr:

    def query(self,text,topic):
        
        query_url = f'/select?q=query:{text}&rows=1&wt=json'
        
        res = requests.get(URL+query_url)

        if res.ok:
            response = res.json()['response']        
            return {
                'docs':response['docs']
            }
        return {}



