from fastapi import FastAPI
from app.routes import profile_routes, lesson_routes
import os

app = FastAPI()

# Create necessary directories if not exist
def create_dirs():
    dirs = ["data/profiles", "data/rules", "data/knowledge_base", "data/lessons", "data/outputs"]
    for d in dirs:
        os.makedirs(d, exist_ok=True)

create_dirs()

# Include route modules
app.include_router(profile_routes.router, prefix="/api/profiles")
app.include_router(lesson_routes.router, prefix="/api/lessons")

@app.get("/")
def root():
    return {"message": "Backend for Personalized Lesson Generator is running."}