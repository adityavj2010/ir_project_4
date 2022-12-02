import json
from pathlib import Path
import pysolr

import pandas as pd

PATH = "/backend/chat/dataset.json"
PATH = str(Path().absolute())+ PATH
fo = open(PATH,"r")

data = json.load(fo)

cleaned_objs = []

def combine_message(message):
    def extract(m):
        return m['text']
    return " , ".join(list(map(extract,message)))

for key in data.keys():
    conversation = data[key]
    prompt = conversation.get('prompt','')
    messages = conversation['messages']
    for i in range(1,len(messages)):
        l = min(len(messages[i-1]),len(messages[i]))
        for j in range(l):
            query = messages[i-1][j]
            response = messages[i][j] 
            text = query['text']
            cleaned_objs.append({
                    'query':text,
                    'response':response['text'],
                    'prompt':prompt
                })    

solr = pysolr.Solr('http://34.130.165.83:8983/solr/chitchat', always_commit=True,timeout=1100)


print('cleaned_objs',len(cleaned_objs))
cleaned_objs = pd.DataFrame(cleaned_objs)
cleaned_objs.to_pickle('chitchat.pkl')
# response = solr.add(cleaned_objs)
print(response)

fo.close()

