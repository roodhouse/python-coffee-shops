from app.db import Base
from sqlalchemy import Column, Integer, String, JSON
import requests

class VenueAggregates(Base):
    __tablename__ = 'aggregates'
    id = Column(Integer, primary_key=True)
    venue_name = Column(String(250), nullable=False)
    # aggregate_data = Column(JSON)
    c1 = Column(Integer)
    c2 = Column(Integer)
    p1 = Column(Integer)
    p2 = Column(Integer)
    p3 = Column(Integer)
    p4 = Column(Integer)
    p5 = Column(Integer)
    p6 = Column(Integer)
    ser1 = Column(Integer)
    ser2 = Column(Integer)
    ser3 = Column(Integer)
    ser4 = Column(Integer)
    ser5 = Column(Integer)
    sp1 = Column(Integer)
    sp2 = Column(Integer)
    sp3 = Column(Integer)
    sp4 = Column(Integer)
    sp5 = Column(Integer)
    sp6 = Column(Integer)
    sp7 = Column(Integer)
    sp8 = Column(Integer)
    sp9 = Column(Integer)
    sum = Column(Integer)

