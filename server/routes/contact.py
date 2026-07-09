from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
import models

router = APIRouter()

class WebRequestCreate(BaseModel):
    full_name: str
    company_email: str
    company_name: str
    message: str

class WebRequestResponse(BaseModel):
    id: int
    full_name: str
    company_email: str
    company_name: str
    message: str
    
    class Config:
        from_attributes = True

@router.post("/contact", response_model=WebRequestResponse, status_code=status.HTTP_201_CREATED)
def create_web_request(request: WebRequestCreate, db: Session = Depends(get_db)):
    try:
        new_request = models.WebRequest(
            full_name=request.full_name,
            company_email=request.company_email,
            company_name=request.company_name,
            message=request.message
        )
        db.add(new_request)
        db.commit()
        db.refresh(new_request)
        return new_request
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
