from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from ..models import models, database
from ..schemas import schemas
from .auth import get_current_user

router = APIRouter()

@router.get("/summary", response_model=schemas.NutritionSummary)
def get_daily_summary(
    date: str,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    target_date = datetime.strptime(date, "%Y-%m-%d")
    next_day = target_date + timedelta(days=1)
    
    meals = db.query(models.Meal).filter(
        models.Meal.user_id == current_user.id,
        models.Meal.date >= target_date,
        models.Meal.date < next_day
    ).all()
    
    total_calories = sum(m.calories for m in meals)
    total_protein = sum(m.protein for m in meals)
    total_carbs = sum(m.carbs for m in meals)
    total_fat = sum(m.fat for m in meals)
    
    return {
        "date": date,
        "total_calories": total_calories,
        "total_protein": total_protein,
        "total_carbs": total_carbs,
        "total_fat": total_fat,
        "goals": current_user
    }

@router.get("/weekly")
def get_weekly_trend(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Last 7 days
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=7)
    
    results = db.query(
        func.date(models.Meal.date).label('day'),
        func.sum(models.Meal.calories).label('calories')
    ).filter(
        models.Meal.user_id == current_user.id,
        models.Meal.date >= start_date
    ).group_by(func.date(models.Meal.date)).all()
    
    return [{"date": str(r.day), "calories": r.calories} for r in results]
