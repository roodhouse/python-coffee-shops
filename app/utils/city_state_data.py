# here
# update to check if state is already present and if so if city is already present,
# and if not for either then add them to the dictionary

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
    print(f'the city is : {city} and the state is {state}')
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