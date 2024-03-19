from app.db import Base
from sqlalchemy import Column, Float, Integer, String, ForeignKey, Boolean, null, JSON
from sqlalchemy.orm import relationship

class Venues(Base):
    __tablename__ = 'venues'
    id = Column(Integer, primary_key=True)
    place_id = Column(String(length=250), nullable=False)
    comment_id = Column(Integer, ForeignKey('comments.id'))
    name = Column(String(250), nullable=False, index=True)
    image = Column(String(length=1000), nullable=False)
    location = Column(JSON)
    address = Column(String(length=250), nullable=False)
    city = Column(String(length=250), nullable=False)
    state = Column(String(length=250), nullable=False)
    map = Column(String(length=250), nullable=False)
    website = Column(String(length=250), nullable=False)
    hours = Column(JSON)
    rating = Column(Float)

    review_count = Column(Integer, default=0)

    # define relationship
    reviews = relationship('Reviews', back_populates='venue_rated')
    comments = relationship('Comments', back_populates='venue')