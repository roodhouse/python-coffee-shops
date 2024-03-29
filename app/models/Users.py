from app.db import Base
from sqlalchemy import JSON, Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship, validates
import bcrypt

salt = bcrypt.gensalt()

class Users(Base): 
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    comment_id = Column(Integer, ForeignKey('comments.id'))
    email = Column(String(250), nullable=False, index=True)
    password = Column(String(100), nullable=False)
    avatar = Column(String(250))

    review_ids = Column(JSON)
    
    # define relationships
    reviews = relationship('Reviews', back_populates='user_rated')
    comments = relationship('Comments', back_populates='user')

    @validates('email')
    def validate_email(self, key, email):
        # make sure email has @
        assert '@' in email
        return email
    
    @validates('password')
    def validate_password(self, key, password):
        assert len(password) > 4
        return bcrypt.hashpw(password.encode('utf-8'), salt)
    
    def verify_password(self, password):
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password.encode('utf-8')
        )
    

