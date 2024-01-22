import email
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

db.close()