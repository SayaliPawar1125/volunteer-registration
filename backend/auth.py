from fastapi import APIRouter, Request, HTTPException
from database import get_db
import random
from datetime import datetime, timedelta


router = APIRouter()

# ---------------- LOGIN ----------------
@router.post("/login")
def login(data: dict, request: Request):
    db = get_db()
    user = db.execute(
        """
        SELECT id, name, email, role
        FROM users
        WHERE email = ? AND password = ?
        """,
        (data["email"], data["password"])
    ).fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Store session
    request.session["user_id"] = user["id"]
    request.session["role"] = user["role"]

    return {
        "message": "Login successful",
        "role": user["role"],
        "name": user["name"]
    }


# ---------------- CURRENT USER ----------------


@router.get("/me")
def me(request: Request):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401)

    return {
        "user_id": request.session["user_id"],
        "role": request.session["role"]
    }

# ---------------- LOGOUT ----------------
@router.post("/logout")
def logout(request: Request):
    request.session.clear()
    return {"message": "Logged out successfully"}


#send otp
@router.post("/forgot-password")
def forgot_password(data: dict):
    db = get_db()

    user = db.execute(
        "SELECT id FROM users WHERE email = ?",
        (data["email"],)
    ).fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp = str(random.randint(100000, 999999))
    expires_at = datetime.now() + timedelta(minutes=5)

    db.execute(
        """
        INSERT INTO password_reset (user_id, otp, expires_at)
        VALUES (?, ?, ?)
        """,
        (user["id"], otp, expires_at)
    )
    db.commit()

    # 🔔 TEMP: Print OTP (later email)
    print("OTP for reset:", otp)

    return {"message": "OTP sent to email"}

#Reser password

@router.post("/reset-password")
def reset_password(data: dict):
    db = get_db()

    record = db.execute(
        """
        SELECT * FROM password_reset
        WHERE otp = ? AND used = 0 AND expires_at > ?
        """,
        (data["otp"], datetime.now())
    ).fetchone()

    if not record:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    db.execute(
        "UPDATE users SET password = ? WHERE id = ?",
        (data["password"], record["user_id"])
    )

    db.execute(
        "UPDATE password_reset SET used = 1 WHERE id = ?",
        (record["id"],)
    )

    db.commit()
    return {"message": "Password reset successful"}
