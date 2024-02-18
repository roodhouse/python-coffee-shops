from app.db import Base
from sqlalchemy import Column, Float, Integer, String, ForeignKey, Boolean, null, JSON
from sqlalchemy.orm import relationship

class Venues(Base):
    __tablename__ = 'venues'
    id = Column(Integer, primary_key=True)
    comment_id = Column(Integer, ForeignKey('comments.id'))
    name = Column(String(250), nullable=False, index=True)
    image = Column(String(length=250), nullable=False)
    location = Column(String(length=500), nullable=False)
    address = Column(String(length=250), nullable=False)
    hours = Column(JSON, nullable=False)
    rating = Column(Float)

    review_count = Column(Integer, default=0)

    # define relationship
    reviews = relationship('Reviews', back_populates='venue_rated')
    comments = relationship('Comments', back_populates='venue') 
