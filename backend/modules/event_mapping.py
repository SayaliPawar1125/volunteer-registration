from fastapi import APIRouter, Request
from database import get_db

router = APIRouter(prefix="/mapping", tags=["Event Mapping"])

@router.get("/volunteers/{event_id}")
def get_volunteers(event_id: int):
    db = get_db()

    # Step 1: Get program_id from event
    event = db.execute(
        "SELECT program_id FROM events WHERE id = ?",
        (event_id,)
    ).fetchone()

    if not event:
        return []

    program_id = event["program_id"]

    # Step 2: Get volunteers interested in this program
    volunteers = db.execute(
        """
        SELECT v.id as volunteer_id, u.name, u.email, v.phone
        FROM volunteer_programs vp
        JOIN volunteers v ON vp.volunteer_id = v.id
        JOIN users u ON v.user_id = u.id
        WHERE vp.program_id = ?
        """,
        (program_id,)
    ).fetchall()

    # Step 3: Return result
    return [dict(v) for v in volunteers]
