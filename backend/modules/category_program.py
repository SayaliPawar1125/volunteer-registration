from fastapi import APIRouter, HTTPException
from database import get_db

router = APIRouter(prefix="/admin", tags=["Category & Program"])


@router.post("/categories")
def add_category(data: dict):
    db = get_db()
    db.execute(
        "INSERT INTO categories (name) VALUES (?)",
        (data["name"],)
    )
    db.commit()
    return {"message": "Category added"}


@router.get("/categories")
def get_categories():
    db = get_db()
    rows = db.execute("SELECT * FROM categories").fetchall()
    return [dict(row) for row in rows]

@router.post("/programs")
def add_program(data: dict):
    db = get_db()
    db.execute(
        """
        INSERT INTO programs (category_id, name, description)
        VALUES (?, ?, ?)
        """,
        (data["category_id"], data["name"], data["description"])
    )
    db.commit()
    return {"message": "Program added"}


@router.get("/programs")
def get_programs():
    db = get_db()
    rows = db.execute(
        """
        SELECT p.id, p.name, p.description, c.name as category
        FROM programs p
        JOIN categories c ON p.category_id = c.id
        """
    ).fetchall()

    return [dict(row) for row in rows]
