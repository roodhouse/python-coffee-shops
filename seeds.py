from app.models import Comments, Reviews, Users, Venues, VenueAggregates
from app.db import Session, Base, engine

# Drop and rebuild tables
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

db = Session()

# insert user
db.add_all([
    Users(
        email='rughjm@gmail.com', 
        password='12345', 
        review_ids=["Perky Beans", "Scooter\'s Coffee"]
    ),
    Users(
        email='rooinfo@gmail.com', 
        password='12345', 
        review_ids=["Scooter\'s Coffee", "Perky Beans"]
    )
])

db.commit()

# insert venues
db.add_all([
    Venues(
        name = 'Perky Beans',
        image = '/assets/perkyBeans.jpeg',
        location = 'https://www.google.com/maps/place/Perky+Beans+Coffee+%26+PB+Cafe/@30.6271539,-97.867737,17z/data=!3m1!4b1!4m6!3m5!1s0x865b2d6421c093a1:0xbb3c0b4e28b76730!8m2!3d30.6271493!4d-97.8651621!16s%2Fg%2F11h4pl1cck?entry=ttu',
        address = '2080 N US Hwy 183 #210, Leander, TX 78641',
        hours = [
            {
                'Sun': [
                    {
                        'open': '5am',
                        'close': '8pm'
                    }
                ],
                'Mon': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Tues': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Wed': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Thurs': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Fri': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Sat': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
            }
        ],
        rating = 1.5,
        review_count = 2
    ),
    Venues(
        name = 'Scooter\'s Coffee',
        image = '/assets/scooters.jpeg',
        location = "https://www.google.com/maps/place/Scooter's+Coffee/@30.6029998,-97.8604322,15z/data=!4m6!3m5!1s0x865b2b4b56f3004b:0xa41ff8f6994ee64a!8m2!3d30.6029998!4d-97.8604322!16s%2Fg%2F11vbc6yn_g?entry=ttu",
        address = '3625 N US Hwy 183, Leander, TX 78641',
        hours = [
            {
                'Sun': [
                    {
                        'open': '5am',
                        'close': '8pm'
                    }
                ],
                'Mon': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Tues': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Wed': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Thurs': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Fri': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
                'Sat': [
                    {
                        'open' : '5am',
                        'close' : '8pm'
                    }
                ],
            }
        ],
        rating = 1,
        review_count = 2
    )
])

db.commit()

venue_instance = db.query(Venues).filter_by(id=1).first()
user_instance = db.query(Users).filter_by(id=1).first()

db.add_all([
    Reviews(
        venue_name = 'Scooter\'s Coffee',
        user_email = 'rooinfo@gmail.com',
        answers = [
            {
                'p1' : 2,
                'p2' : 1,
                'p3' : 1,
                'p4' : 2,
                'p5': 0,
                'p6' : 1,
                'c1' : 2,
                'c2' : 1,
                'ser1': 0,
                'ser2': 2,
                'ser3' : 2,
                'ser4' : 0,
                'ser5': 1,
                'sp1' : 1,
                'sp2' : 2,
                'sp3' : 0,
                'sp4': 1,
                'sp5' : 2,
                'sp6' : 1,
                'sp7' : 1,
                'sp8' : 0,
                'sp9' : 1,
                'sum' : 0
            }
        ]
    ),
    Reviews(
        venue_name = 'Scooter\'s Coffee',
        user_email = 'rughjm@gmail.com',
        answers = [
            {
                'p1' : 1,
                'p2' : 1,
                'p3' : 1,
                'p4' : 0,
                'p5': 0,
                'p6' : 1,
                'c1' : 1,
                'c2' : 1,
                'ser1': 0,
                'ser2': 1,
                'ser3' : 2,
                'ser4' : 2,
                'ser5': 1,
                'sp1' : 1,
                'sp2' : 2,
                'sp3' : 0,
                'sp4': 2,
                'sp5' : 1,
                'sp6' : 1,
                'sp7' : 1,
                'sp8' : 0,
                'sp9' : 1,
                'sum' : 2
            }
        ]
    ),
    Reviews(
        venue_name = 'Perky Beans',
        user_email = 'rughjm@gmail.com',
        answers = [
            {
                'p1' : 0,
                'p2' : 1,
                'p3' : 2,
                'p4' : 0,
                'p5': 2,
                'p6' : 2,
                'c1' : 1,
                'c2' : 0,
                'ser1': 1,
                'ser2': 1,
                'ser3' : 0,
                'ser4' : 0,
                'ser5': 2,
                'sp1' : 0,
                'sp2' : 0,
                'sp3' : 2,
                'sp4': 2,
                'sp5' : 2,
                'sp6' : 2,
                'sp7' : 2,
                'sp8' : 0,
                'sp9' : 0,
                'sum' : 2
            }
        ]
    ),
    Reviews(
        venue_name = 'Perky Beans',
        user_email = 'rooinfo@gmail.com',
        answers = [
            {
                'p1' : 2,
                'p2' : 0,
                'p3' : 1,
                'p4' : 2,
                'p5': 0,
                'p6' : 1,
                'c1' : 2,
                'c2' : 1,
                'ser1': 1,
                'ser2': 2,
                'ser3' : 1,
                'ser4' : 1,
                'ser5': 1,
                'sp1' : 2,
                'sp2' : 0,
                'sp3' : 2,
                'sp4': 1,
                'sp5' : 0,
                'sp6' : 1,
                'sp7' : 1,
                'sp8' : 0,
                'sp9' : 0,
                'sum' : 1
            }
        ]
    )
])

db.commit()

# insert comment
db.add_all([
    Comments(
        user_id='1', 
        venue_id='1',
        body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        )
])

db.commit()

# insert aggregates
# db.add_all([
#     VenueAggregates(
#         # id = 1,
#         name = 'Perky Beans',
#         c1 = 1.5,
#         c2 = 0.75,
#         p1 = 1.25,
#         p2 = 0.75,
#         p3 = 1.25,
#         p4 = 1,
#         p5 = 1,
#         p6 = 0.5,
#         ser1 = 1.5,
#         ser2 = 1.25,
#         ser3 = 0.75,
#         ser4 = 0.75,
#         ser5 = 1.25,
#         sp1 = 1,
#         sp2 = 1,
#         sp3 = 1,
#         sp4 = 1.5,
#         sp5 = 1.25,
#         sp6 = 1.25,
#         sp7 = 1.25,
#         sp8 = 0,
#         sp9 = 0.5,
#         sum = 1.25
#     ),
#     VenueAggregates(
#         # id = 2,
#         name = 'Scooter\'s Coffee',
#         c1 = 1.5,
#         c2 = 1,
#         p1 = 1.5,
#         p2 = 1,
#         p3 = 1,
#         p4 = 1,
#         p5 = 0,
#         p6 = 0,
#         ser1 = 1.5,
#         ser2 = 1.25,
#         ser3 = 1,
#         ser4 = 1,
#         ser5 = 1,
#         sp1 = 1,
#         sp2 = 2,
#         sp3 = 0,
#         sp4 = 1.5,
#         sp5 = 1.5,
#         sp6 = 1,
#         sp7 = 1,
#         sp8 = 0,
#         sp9 = 1,
#         sum = 1
#     )
# ])

# db.commit()

db.close()