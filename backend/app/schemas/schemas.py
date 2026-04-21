from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class MealBase(BaseModel):
    name: str
    quantity: float
    unit: str
    meal_type: str
    date: Optional[datetime] = None

class MealCreate(MealBase):
    pass

class Meal(MealBase):
    id: int
    calories: float
    protein: float
    carbs: float
    fat: float
    user_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserProfile(UserBase):
    target_calories: int
    target_protein: int
    target_carbs: int
    target_fat: int
    weight_goal: Optional[str] = None

    class Config:
        from_attributes = True

class User(UserBase):
    id: int
    meals: List[Meal] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class NutritionSummary(BaseModel):
    date: str
    total_calories: float
    total_protein: float
    total_carbs: float
    total_fat: float
    goals: UserProfile
