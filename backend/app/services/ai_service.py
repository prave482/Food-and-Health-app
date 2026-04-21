import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

async def get_coach_response(user_message: str, user_goals: dict, meal_history: list):
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    system_prompt = (
        "You are a certified nutritionist and health coach. Give evidence-based, personalized advice "
        "based on the user's meal history and health goals. Be concise, friendly, and motivating. "
        f"User Goals: {user_goals}. "
        f"Recent Meals: {meal_history}."
    )
    
    prompt = f"{system_prompt}\n\nUser Question: {user_message}"
    
    response = model.generate_content(prompt)
    return response.text
