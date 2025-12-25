from fastapi import APIRouter
from database import get_db

router = APIRouter(prefix="/volunteer", tags=["Volunteer"])

@router.post("/register")
def register_volunteer(data: dict):
    db = get_db()

    # 1️⃣ Create user
    cur = db.execute(
        """
        INSERT INTO users (name, email, password, role, city, state)
        VALUES (?, ?, ?, 'volunteer', ?, ?)
        """,
        (data["name"], data["email"], data["password"], data["city"], data["state"])
    )
    user_id = cur.lastrowid

    # 2️⃣ Create volunteer profile
    cur = db.execute(
        "INSERT INTO volunteers (user_id, phone) VALUES (?, ?)",
        (user_id, data["phone"])
    )
    volunteer_id = cur.lastrowid

    # 3️⃣ Program interests
    for pid in data["programs"]:
        db.execute(
            "INSERT INTO volunteer_programs (volunteer_id, program_id) VALUES (?, ?)",
            (volunteer_id, pid)
        )

    # 4️⃣ Availability
    for a in data["availability"]:
        db.execute(
            """
            INSERT INTO volunteer_availability
            (volunteer_id, day, time_slot, available)
            VALUES (?, ?, ?, 1)
            """,
            (volunteer_id, a["day"], a["time"])
        )

    db.commit()
    return {"message": "Volunteer registered successfully"}
