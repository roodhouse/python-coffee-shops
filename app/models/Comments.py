from app.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, null, JSON
from sqlalchemy.orm import relationship

class Comments(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True)
    user_id = Column(JSON, nullable=False)
    venue_id = Column(JSON, nullable=False)
    body = Column(String(length=1000), nullable= False)

    # define relationships
    user = relationship('Users', back_populates='comments')
    venue = relationship('Venues', back_populates='comments')

