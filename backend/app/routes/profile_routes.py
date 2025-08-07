from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os, json
from typing import Optional

router = APIRouter()
PROFILE_DIR = "data/profiles"

class LanguageProfile(BaseModel):
    native: str
    learning: str

class StudentProfile(BaseModel):
    name: str
    age: int
    languages: LanguageProfile
    disability: str
    english_reading_level: str
    native_reading_level: str
    math_level: str
    strengths: list
    needs: Optional[list] = []
    interests: list

@router.post("/create")
def create_profile(profile: StudentProfile):
    filepath = os.path.join(PROFILE_DIR, f"{profile.name}.json")
    with open(filepath, "w") as f:
        json.dump(profile.dict(), f, indent=2)
    return {"message": "Profile saved.", "filename": f"{profile.name}.json"}

@router.get("/list")
def list_profiles():
    files = os.listdir(PROFILE_DIR)
    profiles = [f for f in files if f.endswith(".json")]
    return {"profiles": profiles}

@router.get("/load/{profile_name}")
def load_profile(profile_name: str):
    filepath = os.path.join(PROFILE_DIR, profile_name)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Profile not found.")
    with open(filepath, "r") as f:
        data = json.load(f)
    return data