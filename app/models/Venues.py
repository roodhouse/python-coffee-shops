from app.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, null
from sqlalchemy.orm import relationship

class Venues(Base):
    __tablename__ = 'venues'
    id = Column(Integer, primary_key=True)
    # review_id = Column(Integer, ForeignKey('reviews.id'), nullable=False)
    comment_id = Column(Integer, ForeignKey('comments.id'), nullable=False)
    name = Column(String(250), nullable=False)
    image = Column(String(length=250), nullable=False)
    address = Column(String(length=250), nullable=False)
    hours = Column(String(length=250), nullable=False)

    # define relationship
    reviews = relationship('Reviews', back_populates='venue')
    comments = relationship('Comments', back_populates='venue')
