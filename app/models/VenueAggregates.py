from app.db import Base
from sqlalchemy import Column, Integer, String, JSON, Float
import requests

class VenueAggregates(Base):
    __tablename__ = 'aggregates'
    id = Column(Integer, primary_key=True)
    venue_name = Column(String(250), nullable=False)
    # aggregate_data = Column(JSON)
    c1 = Column(Float)
    c2 = Column(Float)
    p1 = Column(Float)
    p2 = Column(Float)
    p3 = Column(Float)
    p4 = Column(Float)
    p5 = Column(Float)
    p6 = Column(Float)
    ser1 = Column(Float)
    ser2 = Column(Float)
    ser3 = Column(Float)
    ser4 = Column(Float)
    ser5 = Column(Float)
    sp1 = Column(Float)
    sp2 = Column(Float)
    sp3 = Column(Float)
    sp4 = Column(Float)
    sp5 = Column(Float)
    sp6 = Column(Float)
    sp7 = Column(Float)
    sp8 = Column(Float)
    sp9 = Column(Float)
    sum = Column(Float)

