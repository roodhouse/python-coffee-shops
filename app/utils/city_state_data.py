import json

DATA_FILE_PATH = 'city_state_data.json'

try:
    with open(DATA_FILE_PATH, 'r') as file:
        city_state_data = json.load(file)
except FileNotFoundError:

    city_state_data = {
        'state': {
            'Texas': {
                'city': [
                    'Leander'
                    ]
            }
        }
    }

def update_city_state_data(city, state):
    global city_state_data
    if state in city_state_data['state']:
        if city in city_state_data['state'][state]['city']:
            return True
        else:
            city_state_data['state'][state]['city'].append(city)
            city_state_data['state'][state]['city'].sort()
    else:
        city_state_data['state'][state] = {
            'city': [
                city
            ]
        }
        city_state_data['state'] = dict(sorted(city_state_data['state'].items(), key=lambda item: item[0]))

    with open(DATA_FILE_PATH, 'w') as file:
        json.dump(city_state_data, file, indent=4)