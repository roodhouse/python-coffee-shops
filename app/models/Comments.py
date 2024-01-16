from app.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, null
from sqlalchemy.orm import relationship

class Comments(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True)
    venue = Column(String(250), nullable=False)
    user = Column(String(250), nullable=False)
    body = Column(String(length=1000), nullable= False)



