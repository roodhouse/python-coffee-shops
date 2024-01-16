from app.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, null
from sqlalchemy.orm import relationship

class Reviews(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    venue = Column(String(250), nullable=False)
    user = Column(String(250), nullable=False)

    # questions below


