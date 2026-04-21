from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import models, database
from ..schemas import schemas
from .auth import get_current_user

router = APIRouter()

@router.get("/profile", response_model=schemas.UserProfile)
def get_profile(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.put("/profile", response_model=schemas.UserProfile)
def update_profile(
    profile_update: schemas.UserProfile,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    for key, value in profile_update.dict().items():
        setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user
