from app.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship

class Reviews(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    venue_place_id = Column(String(250), ForeignKey('venues.place_id'), nullable=False)
    venue_name = Column(String(250), nullable=False)
    user_email = Column(String(250), ForeignKey('users.email'), nullable=False)
    answers = Column(JSON)
    date = Column(String(250), nullable=False)
    
    # define relationships
    venue = relationship('Venues', back_populates='reviews')
    user_rated = relationship('Users', back_populates='reviews')


