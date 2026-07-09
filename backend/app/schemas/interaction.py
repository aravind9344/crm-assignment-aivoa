from pydantic import BaseModel


class InteractionCreate(BaseModel):
    hcp_name: str
    hospital: str
    specialty: str
    interaction_type: str
    notes: str
    follow_up: str


class InteractionResponse(InteractionCreate):
    id: int

    class Config:
        from_attributes = True