# Getting Started with the Backend

To start the backend install the requirements using 
```
pip install -r requirements.txt
```

## Using the query api

To use the request api
Hit a post request to
```
http://127.0.0.1:5001/api/query

BODY:- 
{
    query:"QUERY",
    topic:"topic"
}
```