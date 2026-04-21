# Food & Health App

A production-ready full-stack health application featuring meal tracking, nutrition analysis, and an AI Health Coach powered by Google Gemini.

## 🚀 Features
- **Meal Tracker**: Search and log meals with nutrition data from USDA.
- **AI Health Coach**: Personalized health advice based on your meal history.
- **Nutrition Dashboard**: Beautiful charts for daily and weekly calorie/macro tracking.
- **Responsive Design**: Modern, health-focused UI built with React + Tailwind CSS.
- **CI/CD**: Ready for automated deployment to GCP Cloud Run.

## 🛠 Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL, JWT, Pydantic v2.
- **AI**: Google Gemini 1.5 Flash.
- **Infra**: Docker, GCP Cloud Run, Cloud SQL, Cloud Build.

## 💻 Local Setup

1. **Clone & Setup Environment**:
   ```bash
   cp .env.example .env
   # Update .env with your API keys (Gemini, USDA)
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8000/docs`

## ☁️ GCP Deployment

### 1. Enable Required APIs
```bash
gcloud services enable \
    run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    sqladmin.googleapis.com \
    secretmanager.googleapis.com
```

### 2. Infrastructure Setup
```bash
# Create Artifact Registry
gcloud artifacts repositories create food-health-repo --repository-format=docker --location=us-central1

# Create Secret Manager secrets
echo -n "your_jwt_secret" | gcloud secrets create JWT_SECRET --data-file=-
echo -n "your_gemini_key" | gcloud secrets create GEMINI_API_KEY --data-file=-
echo -n "your_usda_key" | gcloud secrets create USDA_API_KEY --data-file=-

# Create Cloud SQL Instance
gcloud sql instances create food-health-db --database-version=POSTGRES_15 --tier=db-f1-micro --region=us-central1
```

### 3. Deploy via Cloud Build
```bash
gcloud builds submit --config infra/cloudbuild.yaml \
    --substitutions=_REGION=us-central1,_REPO=food-health-repo,_DB_URL="postgresql://user:pass@/foodhealth?host=/cloudsql/PROJECT_ID:region:instance"
```

## 📈 Environment Variables
- `POSTGRES_URL`: Connection string for PostgreSQL.
- `JWT_SECRET`: Secret key for JWT signing.
- `GEMINI_API_KEY`: API key for Google Gemini.
- `USDA_API_KEY`: API key for USDA FoodData Central.
- `VITE_API_URL`: Backend API URL for frontend.
