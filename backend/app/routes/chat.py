from fastapi import APIRouter

from pydantic import BaseModel

from app.ai.graph import extract_interaction

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/")
def chat(request: ChatRequest):

    result = extract_interaction(request.message)

    return result