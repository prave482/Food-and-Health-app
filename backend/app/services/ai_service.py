import google.generativeai as genai
import os
import logging
from dotenv import load_dotenv

load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        logger.info("Gemini AI configured successfully.")
    except Exception as e:
        logger.error(f"Failed to configure Gemini: {e}")

# Massively expanded fallback knowledge base for food and health
HEALTH_KNOWLEDGE = {
    "protein": "Protein is the building block of muscle. For fat loss, aim for 1.8g per kg. For gain, 2.2g. Top sources: Chicken breast (31g/100g), Eggs (6g each), Greek Yogurt (10g/100g), Tofu, and Whey Protein.",
    "weight loss": "To lose weight sustainably, maintain a calorie deficit of 300-500 kcal. Prioritize high-protein and high-fiber foods to stay full. Focus on consistency over intensity.",
    "muscle gain": "Bulking requires a calorie surplus (250-500 kcal above maintenance) and heavy resistance training. Ensure you're hitting your protein targets and getting enough sleep.",
    "fat": "Healthy fats like Omega-3s are vital. Include salmon, avocados, walnuts, and olive oil. Limit trans fats found in processed snacks.",
    "carbs": "Carbohydrates are energy. Use complex carbs (oats, brown rice, sweet potatoes) for steady energy and simple carbs (fruits) around workouts.",
    "water": "Hydration is key for metabolism. Aim for 3.7 liters (men) or 2.7 liters (women) daily. If your urine is pale yellow, you're on track.",
    "keto": "Ketosis switches your body to burning fat for fuel. It requires <50g of net carbs daily. Great for some, but hard to sustain long-term.",
    "intermittent fasting": "Fasting windows like 16:8 can help control insulin and overall calorie intake. It's an effective tool for weight management.",
    "eggs": "Eggs are a 'perfect' protein. They contain all essential amino acids and healthy choline for brain health.",
    "salmon": "Salmon is rich in Vitamin D and Omega-3 fatty acids, making it a powerhouse for heart and brain health.",
    "oats": "Oats are high in beta-glucan fiber, which helps lower cholesterol and keeps you full for hours.",
    "avocado": "Avocados provide healthy monounsaturated fats and more potassium than bananas.",
    "sugar": "Excessive added sugar is linked to inflammation and insulin resistance. Aim for less than 25g-36g of added sugar per day.",
    "fiber": "Fiber is essential for gut health. Aim for 25g-35g daily from vegetables, fruits, and whole grains.",
    "sleep": "7-9 hours of sleep is non-negotiable for hormonal balance and fat loss. Poor sleep increases hunger hormones like ghrelin.",
    "vitamin d": "Crucial for bone health and immunity. Get 15 mins of sun or supplement during winter months.",
    "creatine": "One of the most researched supplements. It helps with power output and muscle hydration. 5g/day is the standard dose.",
    "apple": "An apple a day really does help. Great fiber and Vitamin C, plus it's a perfect low-calorie snack.",
    "banana": "Bananas are excellent pre-workout fuel due to their fast-acting carbs and potassium for muscle function.",
    "broccoli": "A nutrient-dense cruciferous vegetable. High in Vitamin K and C, and contains sulforaphane for detox support."
}

async def get_coach_response(user_message: str, user_goals: dict, meal_history: list):
    try:
        # Check if we can use Gemini
        if GEMINI_API_KEY and len(GEMINI_API_KEY) > 10:
            model = genai.GenerativeModel('gemini-1.5-flash')
            system_prompt = (
                "You are an elite nutritionist. Give specific, data-backed advice. "
                f"User Goals: {user_goals}. History: {meal_history}."
            )
            prompt = f"{system_prompt}\n\nUser Question: {user_message}"
            response = model.generate_content(prompt)
            return response.text
        else:
            logger.warning("No valid GEMINI_API_KEY found. Using expert knowledge base.")
            raise Exception("API Key Missing")
            
    except Exception as e:
        logger.error(f"Coach Response Error: {e}")
        msg_lower = user_message.lower()
        
        # Smart Keyword Matching
        matched_advice = []
        for key, advice in HEALTH_KNOWLEDGE.items():
            if key in msg_lower:
                matched_advice.append(advice)
        
        if matched_advice:
            return "Expert Analysis: " + " ".join(matched_advice)
        
        # Generic but high-value fallback
        return (
            "That's a great question about your health. Generally, I recommend focusing on "
            "whole-food nutrition, hitting your protein targets, and staying hydrated. "
            f"Given your calorie target of {user_goals.get('target_calories', 2000)} kcal, "
            "it's important to balance your macros to sustain energy throughout the day."
        )
