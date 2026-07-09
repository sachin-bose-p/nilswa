from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    ack_number = Column(String, unique=True, index=True)
    
    # Company Profile
    company_name = Column(String, index=True)
    registration_number = Column(String)
    industry = Column(String)
    company_size = Column(String)
    annual_revenue = Column(String, nullable=True)
    
    # Admin Details
    admin_name = Column(String)
    admin_email = Column(String, index=True)
    admin_title = Column(String)
    admin_phone = Column(String)
    
    # Account & Security
    username = Column(String, unique=True, index=True, nullable=True)
    password_hash = Column(String, nullable=True)
    mfa_secret = Column(String, nullable=True)
    mfa_enabled = Column(Boolean, default=False)
    
    # Workflow Status
    status = Column(String, default="Application Submitted")

class WebRequest(Base):
    __tablename__ = "webrequests"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    company_email = Column(String, index=True, nullable=False)
    company_name = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
