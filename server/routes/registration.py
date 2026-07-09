from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import uuid

import models
from database import get_db

router = APIRouter()

class RegistrationCreate(BaseModel):
    company_name: str
    registration_number: str
    industry: str
    company_size: str
    annual_revenue: Optional[str] = None
    admin_name: str
    admin_email: str
    admin_title: str
    admin_phone: str

class RegistrationResponse(BaseModel):
    ack_number: str
    status: str

@router.post("/register", response_model=RegistrationResponse)
def create_registration(reg: RegistrationCreate, db: Session = Depends(get_db)):
    ack = f"ACK-{uuid.uuid4().hex[:8].upper()}"
    db_reg = models.Registration(
        ack_number=ack,
        **reg.model_dump()
    )
    db.add(db_reg)
    db.commit()
    db.refresh(db_reg)
    return {"ack_number": db_reg.ack_number, "status": db_reg.status}

@router.get("/track/{ack_number}")
def track_registration(ack_number: str, db: Session = Depends(get_db)):
    db_reg = db.query(models.Registration).filter(models.Registration.ack_number == ack_number).first()
    if not db_reg:
        raise HTTPException(status_code=404, detail="Acknowledgment number not found")
    return {"ack_number": db_reg.ack_number, "status": db_reg.status}
