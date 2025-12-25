from fastapi import APIRouter, Request, HTTPException
from database import get_db

router = APIRouter(prefix="/superadmin", tags=["Super Admin"])


@router.post("/create-admin")
def create_admin(data: dict, request: Request):

    # Check logged-in user role
    if request.session.get("role") != "superadmin":
        raise HTTPException(status_code=403, detail="Not allowed")

    db = get_db()

    # Insert admin user
    db.execute(
        """
        INSERT INTO users (name, email, password, role, city, state)
        VALUES (?, ?, ?, 'admin', ?, ?)
        """,
        (
            data["name"],
            data["email"],
            data["password"],   # plain password (easy version)
            data.get("city"),
            data.get("state")
        )
    )

    db.commit()

    return {"message": "Admin created successfully"}
