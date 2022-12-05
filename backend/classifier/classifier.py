
import pickle
import os
filename = "model.pickle"


PATH = os.path.dirname(__file__) + '/'

# load model
model = pickle.load(open(PATH+filename, "rb"))
tv = pickle.load(open(PATH + "tv.pickle", "rb"))


def classifier(text):
    XDemo = tv.transform([text])
    res = model.predict(XDemo)
    return res[0]


