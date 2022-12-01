import pysolr
import requests
import urllib.parse
from env import URL

class Solr:

    def query(self,text,topic):
        
        query_url = f'/select?q=query:{text}&rows=1&wt=json'
        
        res = requests.get(URL+query_url)
        print(res.json()['response'] )
        if res.ok:
            response = res.json()['response']    
            if response['numFound']>0:
                return {
                    "message":response['docs'][0]['response'][0]
                }    
            
            return {
                'message':''
            }
        return {}



