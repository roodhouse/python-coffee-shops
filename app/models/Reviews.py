from app.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, null, JSON
from sqlalchemy.orm import relationship

class Reviews(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    venue_id = Column(Integer, ForeignKey('venues.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    answers = Column(JSON)
    
    # define relationships
    venue = relationship('Venues', back_populates='reviews')
    user = relationship('Users', back_populates='reviews')


