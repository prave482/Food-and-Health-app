from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    
    # User Goals
    target_calories = Column(Integer, default=2000)
    target_protein = Column(Integer, default=150)
    target_carbs = Column(Integer, default=250)
    target_fat = Column(Integer, default=70)
    weight_goal = Column(String) # weight loss, muscle gain, maintenance
    
    meals = relationship("Meal", back_populates="owner")

class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    quantity = Column(Float)
    unit = Column(String) # g, oz, serving
    meal_type = Column(String) # breakfast, lunch, dinner, snack
    date = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Nutrition Data (cached from USDA or AI)
    calories = Column(Float)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="meals")
