from app.models import Comments, Reviews, Users, Venues
from app.db import Session, Base, engine

# Drop and rebuild tables
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

db = Session()

# insert user
db.add_all([
    Users(email='rughjm@gmail.com', password='12345')
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
        rating = 90
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
        rating = 60
    )
])

db.commit()

db.close()