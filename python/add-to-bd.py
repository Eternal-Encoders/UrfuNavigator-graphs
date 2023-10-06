import pymongo
import codecs
import json
from pymongo import MongoClient, InsertOne

client = pymongo.MongoClient(
    "mongodb+srv://MidMin:sUwTDLYEYrWEMC1W@cluster0.uhmdpem.mongodb.net/?retryWrites=true&w=majority"
)
db = client.Navigator

name = input() or "ИРИТ-РТФ_1"

with codecs.open(f"./input/{name}.json", "r", "utf_8_sig") as f:
    file_data = json.load(f)
    new_audiences = []
    new_graph = []
    new_data = []

    temp_stairs = db.Stairs.find({})
    stairs = {}
    for stair in temp_stairs:
        stairs.update({stair['_id']: stair})

    for key, value in file_data['audiences'].items():
        value['_id'] = key
        new_audiences.append(value)
    for key, value in file_data['graph'].items():
        value['_id'] = key
        new_graph.append(value)

    for key, value in file_data['data'].items():
        value['_id'] = key
        new_data.append(value)

        if value['types'].count('stair') != 0:
            if list(stairs.keys()).count(value['stairId']) != 0:
                if any(x['_id'] == value['floor'] for x in stairs[value['stairId']]['floors']):
                    for index, floor in enumerate(stairs[value['stairId']]['floors']):
                        if floor['_id'] == value['floor']:
                            stairs[value['stairId']]['floors'][index] = {
                                '_id': value['floor'],
                                'pointId': value['_id']
                            }
                else:
                    stairs[value['stairId']]['floors'].append({
                        '_id': value['floor'],
                        'pointId': value['_id']
                    })
            else:
                stairs.update({value['stairId']: {
                    '_id': value['stairId'],
                    'institute': value['institute'],
                    'floors': [{
                        '_id': value['floor'],
                        'pointId': value['_id']
                    }]
                }})

    for key, value in stairs.items():
        db.Stairs.update_one(
            {
                '_id': key
            }, 
            {
                '$set': {
                    'floors': value['floors'],
                    'institute': value['institute']
                }
            },
            True
        )
                
    db.Floors.update_one(
        {
            "$and": [
                {'institute': file_data['institute']}, 
                {"floor": file_data['floor']}
            ]
        },
        {
            '$set': {
                'service': file_data['service'],
                'widht': file_data['widht'],
                'height': file_data['height'],
                'audiences': new_audiences,
                'graph': new_graph,
                'data': new_data 
            }
        },
        True
    )

client.close()