from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)


@router.post("/")
def create_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):
    try:
        new_interaction = Interaction(**interaction.model_dump())

        db.add(new_interaction)
        db.commit()
        db.refresh(new_interaction)

        return {
            "message": "Interaction Saved Successfully",
            "data": new_interaction
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
def get_interactions(db: Session = Depends(get_db)):
    return db.query(Interaction).all()