import httpx
import os
from dotenv import load_dotenv

load_dotenv()

USDA_API_KEY = os.getenv("USDA_API_KEY", "DEMO_KEY")
USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1"

async def get_nutrition_data(food_name: str, quantity: float, unit: str):
    """
    Fetch nutrition data from USDA API or return mock data if API fails.
    """
    try:
        async with httpx.AsyncClient() as client:
            # Search for food
            search_response = await client.get(
                f"{USDA_BASE_URL}/foods/search",
                params={"query": food_name, "api_key": USDA_API_KEY, "pageSize": 1}
            )
            search_data = search_response.json()
            
            if search_data.get("foods"):
                food = search_data["foods"][0]
                nutrients = food.get("foodNutrients", [])
                
                # Extract common nutrients (per 100g usually)
                calories = next((n["value"] for n in nutrients if n["nutrientId"] == 1008), 0)
                protein = next((n["value"] for n in nutrients if n["nutrientId"] == 1003), 0)
                fat = next((n["value"] for n in nutrients if n["nutrientId"] == 1004), 0)
                carbs = next((n["value"] for n in nutrients if n["nutrientId"] == 1005), 0)
                
                # Scale by quantity (assuming quantity is in grams for simplicity in this version)
                # In a real app, you'd handle unit conversions.
                factor = quantity / 100.0
                return {
                    "calories": calories * factor,
                    "protein": protein * factor,
                    "carbs": carbs * factor,
                    "fat": fat * factor
                }
    except Exception as e:
        print(f"Error fetching USDA data: {e}")
    
    # Mock data fallback
    return {
        "calories": 200.0,
        "protein": 10.0,
        "carbs": 25.0,
        "fat": 5.0
    }

async def search_food(query: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{USDA_BASE_URL}/foods/search",
            params={"query": query, "api_key": USDA_API_KEY, "pageSize": 10}
        )
        return response.json()
