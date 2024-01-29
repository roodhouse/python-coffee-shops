from app.db import Base
from sqlalchemy import Column, Integer, String, JSON
import requests

class VenueAggregates(Base):
    __tablename__ = 'aggregates'
    id = Column(Integer, primary_key=True)
    venue_name = Column(String(250), nullable=False)
    aggregate_data = Column(JSON)

    def new_aggregate_from_class(self, data, venue):
        print('test from class')
        res = requests.post('http://127.0.0.1:5000/api/aggregate', json=data)

        if res.status_code == 200:
            print(f'Aggregate added for venue: {venue}')
        else:
            print(f'Failed to add aggregate for venue: {venue}. Status code: {res.status_code}')

    def calc_aggregates(self):
        try:

            url = 'http://127.0.0.1:5000/api/reviews'
            res = requests.get(url)
            
            if res.status_code == 200:
                response_data = res.json()
                reviews = response_data['reviews']
                
                venue_counts = {}

                for review in reviews:
                    venue_name = review['venue']

                    if venue_name in venue_counts:
                        venue_counts[venue_name] += 1
                    else:
                        venue_counts[venue_name] = 1
                
                for venue, count in venue_counts.items():
                    if count > 1:
                        # put req
                        print(f"Need to aggregate: {venue}")
                    else:
                        # post req
                        print(f"Need to add values as is to agg table: {venue}")
                        try:
                            url = 'http://127.0.0.1:5000/api/aggregate'
                            data = {
                                'venue_name': venue,
                                'aggregate_answers': reviews[0]['answers']
                            }
                            
                            print(f"the data is: {data}")

                            # new_aggregate(data, venue)
                            self.new_aggregate_from_class(data, venue)
                            # self.new_aggregate(data, venue)

                            # res = requests.post(url, json=data)

                            # if res.status_code == 200:
                            #     print(f'Aggregate added for venue: {venue}')
                            # else:
                            #     print(f'Failed to add aggregate for venue: {venue}. Status code: {res.status_code}')
                        
                        except Exception as e:
                            print(f"An error occurred inside of func: {e}")

            else:
                print(f"Failed to fetch review. Status code: {res.status_code}")

        except Exception as e:

            print(f"An error occurred in main func: {e}")