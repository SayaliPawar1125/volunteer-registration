from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from auth import router as auth_router
from modules.category_program import router as category_program_router
from modules.coordinator_events import router as coordinator_router
from modules.volunteer import router as volunteer_router
from modules.superadmin import router as superadmin_router
from modules.admin import router as admin_router
from modules.profile import router as profile_router


app = FastAPI(title="Volunteer Management System")

@app.get("/")
def root():
    return {"message": "Volunteer Management API is running"}

# ✅ CORS MUST COME FIRST
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ SESSION MIDDLEWARE AFTER CORS
app.add_middleware(
    SessionMiddleware,
    secret_key="super-secret-key-123"
)

# Routes
app.include_router(auth_router, prefix="/auth")
app.include_router(category_program_router)
app.include_router(coordinator_router)
app.include_router(volunteer_router)
app.include_router(superadmin_router)
app.include_router(admin_router)
app.include_router(profile_router)