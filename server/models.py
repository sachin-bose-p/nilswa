from sqlalchemy import Column, Integer, String, Boolean
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
    
    # Workflow Status
    status = Column(String, default="Application Submitted")
