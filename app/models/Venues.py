from app.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, null
from sqlalchemy.orm import relationship

class Venues(Base):
    __tablename__ = 'venues'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    image = Column(String(length=250), nullable=False)
    address = Column(String(length=250), nullable=False)
    hours = Column(String(length=250), nullable=False)

