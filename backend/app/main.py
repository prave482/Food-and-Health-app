from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import meals, users, analysis, ai, auth
from app.models.database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Food & Health API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(meals.router, prefix="/api/meals", tags=["Meals"])
app.include_router(analysis.router, prefix="/api/nutrition", tags=["Analysis"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Coach"])

@app.get("/")
async def root():
    return {"message": "Welcome to Food & Health API"}
