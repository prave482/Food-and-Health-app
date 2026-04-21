from sqlalchemy.orm import Session
from app.models import models, database
from app.routers import auth
import datetime

def seed_data():
    db = next(database.get_db())
    
    # Ensure user exists
    user = db.query(models.User).filter(models.User.email == "praveena@example.com").first()
    if not user:
        hashed_pw = auth.get_password_hash("password123")
        user = models.User(
            email="praveena@example.com",
            full_name="Praveena",
            hashed_password=hashed_pw,
            target_calories=2400,
            target_protein=180,
            target_carbs=250,
            target_fat=80,
            weight_goal="muscle gain"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # Add more food items and meals
    meal_items = [
        ("Classic Avocado Toast", 1, "slice", "breakfast", 280, 8, 35, 14),
        ("Greek Yogurt with Honey", 200, "g", "breakfast", 220, 18, 25, 4),
        ("Grilled Salmon with Asparagus", 250, "g", "lunch", 520, 45, 8, 32),
        ("Quinoa Power Bowl", 300, "g", "lunch", 410, 15, 65, 12),
        ("Protein Shake (Whey)", 1, "scoop", "snack", 150, 25, 3, 2),
        ("Mixed Nuts", 30, "g", "snack", 180, 6, 8, 15),
        ("Lean Beef Stir Fry", 350, "g", "dinner", 580, 42, 45, 18),
        ("Roasted Sweet Potato", 200, "g", "dinner", 180, 3, 42, 0),
        ("Egg White Omelette", 3, "eggs", "breakfast", 120, 24, 2, 0),
        ("Blueberry Muffin", 1, "item", "snack", 310, 4, 48, 12)
    ]
    
    # Add meals for today and yesterday
    for i, (name, qty, unit, mtype, cal, prot, carb, fat) in enumerate(meal_items):
        # Alternate between today and yesterday
        days_ago = i % 2
        date = datetime.datetime.utcnow() - datetime.timedelta(days=days_ago, hours=i*2)
        
        meal = models.Meal(
            name=name,
            quantity=qty,
            unit=unit,
            meal_type=mtype,
            calories=cal,
            protein=prot,
            carbs=carb,
            fat=fat,
            user_id=user.id,
            date=date
        )
        db.add(meal)
    
    db.commit()
    print("Enhanced seeding complete! User: praveena@example.com")

if __name__ == "__main__":
    seed_data()
