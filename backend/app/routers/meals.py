from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..models import models, database
from ..schemas import schemas
from .auth import get_current_user
from ..services import nutrition_service

router = APIRouter()

@router.post("/", response_model=schemas.Meal)
async def create_meal(
    meal: schemas.MealCreate, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Fetch nutrition data from service (USDA or AI)
    nutrition = await nutrition_service.get_nutrition_data(meal.name, meal.quantity, meal.unit)
    
    db_meal = models.Meal(
        **meal.dict(),
        calories=nutrition["calories"],
        protein=nutrition["protein"],
        carbs=nutrition["carbs"],
        fat=nutrition["fat"],
        user_id=current_user.id
    )
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    return db_meal

@router.get("/", response_model=List[schemas.Meal])
def read_meals(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Meal).filter(models.Meal.user_id == current_user.id).all()

@router.delete("/{meal_id}")
def delete_meal(
    meal_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    meal = db.query(models.Meal).filter(models.Meal.id == meal_id, models.Meal.user_id == current_user.id).first()
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    db.delete(meal)
    db.commit()
    return {"message": "Meal deleted"}
