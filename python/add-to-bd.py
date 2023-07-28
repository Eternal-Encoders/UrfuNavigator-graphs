import pymongo
import codecs
import json
from pymongo import MongoClient, InsertOne

client = pymongo.MongoClient(
    "mongodb+srv://MidMin:sUwTDLYEYrWEMC1W@cluster0.uhmdpem.mongodb.net/?retryWrites=true&w=majority"
)
db = client.Navigator

with codecs.open(f"{input() or 'ИРИТ-РТФ_1'}.json", "r", "utf_8_sig") as f:
    file_data = json.load(f)
    new_audiences = []
    new_graph = []
    new_data = []

    for key, value in file_data['audiences'].items():
        value['_id'] = key
        new_audiences.append(value)
    for key, value in file_data['graph'].items():
        value['_id'] = key
        new_graph.append(value)
    for key, value in file_data['data'].items():
        value['_id'] = key
        new_data.append(value)

    db.Floors.insert_one({
        'institute': file_data['institute'],
        'floor': file_data['floor'],
        'widht': file_data['widht'],
        'height': file_data['height'],
        'audiences': new_audiences,
        'graph': new_graph,
        'data': new_data
    })

client.close()
