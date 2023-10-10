import codecs
import json
from os import walk

path = "C:/Users/Рустам/Desktop/graphs"

filenames = next(walk(path), (None, None, []))[2]

for name in filenames:
    with codecs.open(f"{path}/{name}", "r+", "utf_8_sig") as f:
        file_data = json.load(f)

        audiences = file_data['audiences']
        graph = file_data['graph']
        data = file_data['data']
        service = file_data['service']
        institute = file_data['institute']
        floor = file_data['floor']
        widht = file_data['widht']
        height = file_data['height']
        
        new_audience = []

        for key, value in audiences.items():
            value['id'] = key
            del value['_id']
            new_audience.append(value)
            
        for key, value in graph.items():
            value['id'] = key
            del value['_id']

            value.update({'types': data[key]['types']})
            value.update({'names': data[key]['names']})
            value.update({'floor': data[key]['floor']})
            value.update({'institute': data[key]['institute']})
            value.update({'time': data[key]['time']})

            if 'menuId' in data[key]:
                value.update({'menuId': data[key]['menuId']})
            if 'isPassFree' in data[key]:
                value.update({'isPassFree': data[key]['isPassFree']})
            if 'stairId' in data[key]:
                value.update({'stairId': data[key]['stairId']})

        f.seek(0)
        json.dump({
            'graph': graph,
            'audiences': new_audience,
            'service': service,
            'institute': institute,
            'floor': floor,
            'width': widht,
            'height': height
        }, f)