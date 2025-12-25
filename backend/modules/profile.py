from fastapi import APIRouter, Request, HTTPException
from database import get_db

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("/me")
def get_profile(request: Request):
    user_id = request.session.get("user_id")

    if not user_id:
        raise HTTPException(status_code=401, detail="Not logged in")

    db = get_db()
    user = db.execute(
        "SELECT name, email, role, city, state FROM users WHERE id = ?",
        (user_id,)
    ).fetchone()

    return dict(user)


@router.post("/change-password")
def change_password(data: dict, request: Request):
    user_id = request.session.get("user_id")

    if not user_id:
        raise HTTPException(status_code=401, detail="Not logged in")

    db = get_db()

    # Check current password
    user = db.execute(
        "SELECT password FROM users WHERE id = ?",
        (user_id,)
    ).fetchone()

    if user["password"] != data["current_password"]:
        raise HTTPException(status_code=400, detail="Wrong current password")

    # Update password
    db.execute(
        "UPDATE users SET password = ? WHERE id = ?",
        (data["new_password"], user_id)
    )
    db.commit()

    return {"message": "Password updated successfully"}

@router.post("/logout")
def logout(request: Request):
    request.session.clear()
    return {"message": "Logged out"}
