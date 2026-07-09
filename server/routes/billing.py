from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
import models
from database import get_db

router = APIRouter()

class ServiceBilling(BaseModel):
    service_name: str
    active_users: int
    price_per_user_per_day: float
    total_daily_cost: float

class BillingSummaryResponse(BaseModel):
    total_daily_cost: float
    services: List[ServiceBilling]

@router.get("/billing/{ack_number}", response_model=BillingSummaryResponse)
def get_billing_summary(ack_number: str, db: Session = Depends(get_db)):
    db_reg = db.query(models.Registration).filter(models.Registration.ack_number == ack_number).first()
    if not db_reg:
        raise HTTPException(status_code=404, detail="Company not found")

    # Fetch active services
    services = db.query(models.CompanyService).filter(
        models.CompanyService.registration_id == db_reg.id,
        models.CompanyService.is_active == True
    ).all()

    # If no services, seed some defaults for demo purposes
    if not services:
        default_services = [
            models.CompanyService(registration_id=db_reg.id, service_name="Crew CRM", price_per_user_per_day=1.50, active_users=25),
            models.CompanyService(registration_id=db_reg.id, service_name="Alcohol Check", price_per_user_per_day=0.75, active_users=100),
            models.CompanyService(registration_id=db_reg.id, service_name="Real Estate", price_per_user_per_day=2.00, active_users=10)
        ]
        db.add_all(default_services)
        db.commit()
        for s in default_services:
            db.refresh(s)
        services = default_services

    # Calculate costs
    billing_services = []
    total_cost = 0.0
    for s in services:
        daily_cost = s.active_users * s.price_per_user_per_day
        total_cost += daily_cost
        billing_services.append({
            "service_name": s.service_name,
            "active_users": s.active_users,
            "price_per_user_per_day": s.price_per_user_per_day,
            "total_daily_cost": daily_cost
        })

    return {
        "total_daily_cost": total_cost,
        "services": billing_services
    }
