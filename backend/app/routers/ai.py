from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..models import models, database
from .auth import get_current_user
from ..services import ai_service
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/coach/")
async def ai_coach(
    request: ChatRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    # Fetch recent meals for context
    recent_meals = db.query(models.Meal).filter(
        models.Meal.user_id == current_user.id
    ).order_by(models.Meal.date.desc()).limit(10).all()
    
    meal_context = [
        {"name": m.name, "calories": m.calories, "protein": m.protein} 
        for m in recent_meals
    ]
    
    response = await ai_service.get_coach_response(
        user_message=request.message,
        user_goals={
            "target_calories": current_user.target_calories,
            "weight_goal": current_user.weight_goal
        },
        meal_history=meal_context
    )
    
    return {"response": response}
