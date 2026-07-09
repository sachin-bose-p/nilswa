from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import uuid
import pyotp
from passlib.context import CryptContext

import models
from database import get_db

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

class AccountSetup(BaseModel):
    username: str
    password: str

class MFAVerify(BaseModel):
    token: str

class LoginRequest(BaseModel):
    username: str
    password: str
    mfa_token: Optional[str] = None

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

@router.post("/register/{ack_number}/account")
def setup_account(ack_number: str, account: AccountSetup, db: Session = Depends(get_db)):
    db_reg = db.query(models.Registration).filter(models.Registration.ack_number == ack_number).first()
    if not db_reg:
        raise HTTPException(status_code=404, detail="Acknowledgment number not found")
    
    # Check if username already exists
    existing_user = db.query(models.Registration).filter(models.Registration.username == account.username).first()
    if existing_user and existing_user.id != db_reg.id:
        raise HTTPException(status_code=400, detail="Username already taken")

    db_reg.username = account.username
    db_reg.password_hash = pwd_context.hash(account.password)
    db.commit()
    return {"message": "Account created successfully"}

@router.post("/register/{ack_number}/mfa/setup")
def setup_mfa(ack_number: str, db: Session = Depends(get_db)):
    db_reg = db.query(models.Registration).filter(models.Registration.ack_number == ack_number).first()
    if not db_reg:
        raise HTTPException(status_code=404, detail="Acknowledgment number not found")
    
    if not db_reg.mfa_secret:
        db_reg.mfa_secret = pyotp.random_base32()
        db.commit()
        db.refresh(db_reg)

    uri = pyotp.totp.TOTP(db_reg.mfa_secret).provisioning_uri(
        name=db_reg.admin_email,
        issuer_name="NILSWA Enterprise"
    )
    return {"secret": db_reg.mfa_secret, "uri": uri}

@router.post("/register/{ack_number}/mfa/verify")
def verify_mfa(ack_number: str, data: MFAVerify, db: Session = Depends(get_db)):
    db_reg = db.query(models.Registration).filter(models.Registration.ack_number == ack_number).first()
    if not db_reg:
        raise HTTPException(status_code=404, detail="Acknowledgment number not found")
    
    if not db_reg.mfa_secret:
        raise HTTPException(status_code=400, detail="MFA setup not initiated")

    totp = pyotp.TOTP(db_reg.mfa_secret)
    if not totp.verify(data.token):
        raise HTTPException(status_code=400, detail="Invalid MFA token")

    db_reg.mfa_enabled = True
    db.commit()
    return {"message": "MFA verified and enabled successfully"}

@router.get("/track/{ack_number}")
def track_registration(ack_number: str, db: Session = Depends(get_db)):
    db_reg = db.query(models.Registration).filter(models.Registration.ack_number == ack_number).first()
    if not db_reg:
        raise HTTPException(status_code=404, detail="Acknowledgment number not found")
    return {
        "ack_number": db_reg.ack_number, 
        "status": db_reg.status,
        "mfa_enabled": db_reg.mfa_enabled,
        "account_created": bool(db_reg.username)
    }

@router.post("/login")
def login(creds: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.Registration).filter(models.Registration.username == creds.username).first()
    if not user or not user.password_hash or not pwd_context.verify(creds.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    if user.mfa_enabled:
        if not creds.mfa_token:
            return {"requires_mfa": True}
        
        totp = pyotp.TOTP(user.mfa_secret)
        if not totp.verify(creds.mfa_token):
            raise HTTPException(status_code=401, detail="Invalid MFA token")

    return {
        "message": "Login successful",
        "ack_number": user.ack_number,
        "username": user.username,
        "company_name": user.company_name
    }
