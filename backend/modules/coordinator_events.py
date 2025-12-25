from fastapi import APIRouter, Request
from database import get_db

router = APIRouter(prefix="/coordinator", tags=["Coordinator"])

#add events by coordinator

@router.post("/events")
def add_event(data: dict, request: Request):
    user_id = request.session.get("user_id")
    role = request.session.get("role")

    if role != "coordinator":
        return {"error": "Unauthorized"}

    db = get_db()
    db.execute(
        """
        INSERT INTO events
        (program_id, description, start_date, end_date, address, city, state, pincode, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data["program_id"],
            data["description"],
            data["start_date"],
            data["end_date"],
            data["address"],
            data["city"],
            data["state"],
            data["pincode"],
            user_id
        )
    )
    db.commit()

    return {"message": "Event created"}

 #get event by coordinator

@router.get("/events")
def get_events(request: Request):
    user_id = request.session.get("user_id")

    db = get_db()
    rows = db.execute(
        """
        SELECT e.*, p.name as program
        FROM events e
        JOIN programs p ON e.program_id = p.id
        WHERE e.created_by = ?
        ORDER BY start_date
        """,
        (user_id,)
    ).fetchall()

    return [dict(row) for row in rows]
