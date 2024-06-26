from sqlalchemy import null
from app.models import Comments, Reviews, Users, Venues
from app.db import Session, Base, engine

# Drop and rebuild tables
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

db = Session()

# insert users
db.add_all([
    Users(
        email='rughjm@gmail.com', 
        password='12345', 
        review_ids=["ChIJN-MzkTkpTYYRvEg5lueeeee", "ChIJN-MzkTkpTYYRvEg5lurrrrr"],
        avatar = 'http://127.0.0.1:5000/assets/meAgain.jpeg'
    ),
    Users(
        email='rooinfo@gmail.com', 
        password='12345', 
        review_ids=["ChIJN-MzkTkpTYYRvEg5lurrrrr", "ChIJN-MzkTkpTYYRvEg5lueeeee"]
    ),
    Users(
        email='bob@gmail.com', 
        password='12345'
    )
])

db.commit()

# insert venues
db.add_all([
    Venues(
        name = 'Perky Beans',
        image = 'http://127.0.0.1:5000/assets/perkyBeans.jpeg',
        location = [
            {
                'lat': 30.6271539,
                'lng': -97.867737
            }
        ],
        address = '2080 N US Hwy 183 #210, Leander, TX 78641',
        city = 'Leander',
        state = 'Texas',
        map = 'https://www.google.com',
        website = 'https://www.google.com',
        place_id = 'ChIJN-MzkTkpTYYRvEg5lueeeee',
        hours = [{"Fri": "Friday: 7:00 AM – 9:00 PM", "Mon": "Monday: 7:00 AM – 9:00 PM", "Sat": "Saturday: 7:00 AM – 9:00 PM", "Sun": "Sunday: 8:00 AM – 9:00 PM", "Wed": "Wednesday: 7:00 AM – 9:00 PM", "Tues": "Tuesday: 7:00 AM – 9:00 PM", "Thurs": "Thursday: 7:00 AM – 9:00 PM"}],
        rating = 1.5,
        review_count = 2
    ),
    Venues(
        name = 'Scooter\'s Coffee',
        image = 'http://127.0.0.1:5000/assets/scooters.jpeg',
        location = [
            {
                'lat': 30.6029998,
                'lng': -97.8604322
            }
        ],
        address = '3625 N US Hwy 183, Leander, TX 78641',
        city = 'Leander',
        state = 'Texas',
        map = 'https://www.google.com',
        website = 'https://www.google.com',
        place_id = 'ChIJN-MzkTkpTYYRvEg5lurrrrr',
        hours = [{"Fri": "Friday: 7:00 AM – 9:00 PM", "Mon": "Monday: 7:00 AM – 9:00 PM", "Sat": "Saturday: 7:00 AM – 9:00 PM", "Sun": "Sunday: 8:00 AM – 9:00 PM", "Wed": "Wednesday: 7:00 AM – 9:00 PM", "Tues": "Tuesday: 7:00 AM – 9:00 PM", "Thurs": "Thursday: 7:00 AM – 9:00 PM"}],
        rating = 1,
        review_count = 2
    )
])

db.commit()

venue_instance = db.query(Venues).filter_by(id=1).first()
user_instance = db.query(Users).filter_by(id=1).first()

db.add_all([
    Reviews(
        venue_place_id = 'ChIJN-MzkTkpTYYRvEg5lurrrrr',
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
        ],
        date = '01/08/2024'
    ),
    Reviews(
        venue_place_id = 'ChIJN-MzkTkpTYYRvEg5lurrrrr',
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
        ],
        date = '01/13/2024'
    ),
    Reviews(
        venue_place_id = 'ChIJN-MzkTkpTYYRvEg5lueeeee',
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
        ],
        date = '02/08/2024'
    ),
    Reviews(
        venue_place_id = 'ChIJN-MzkTkpTYYRvEg5lueeeee',
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
        ],
        date = '02/09/2024'
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

db.close()