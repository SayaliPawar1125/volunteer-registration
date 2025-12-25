from fastapi import APIRouter, Request, HTTPException
from database import get_db

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post("/create-coordinator")
def create_coordinator(data: dict, request: Request):
    if request.session.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Unauthorized")

    db = get_db()
    db.execute(
        """
        INSERT INTO users (name, email, password, role, city, state)
        VALUES (?, ?, ?, 'coordinator', ?, ?)
        """,
        (data["name"], data["email"], data["password"], data["city"], data["state"])
    )
    db.commit()

    return {"message": "Coordinator created successfully"}
