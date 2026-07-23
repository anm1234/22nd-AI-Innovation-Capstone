from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.chat_service import chat_with_advisor
from app.services.session_store import get_session

router = APIRouter(prefix="/advisor", tags=["AI Advisor"])


class ChatRequest(BaseModel):
    session_id: str
    message: str


@router.post("/chat")
async def chat(request: ChatRequest):
    """
    Chat endpoint for the AI Academic Advisor.
    """

    session = get_session(request.session_id)

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found. Please upload a transcript first."
        )

    response = await chat_with_advisor(
        message=request.message,
        session=session,
    )

    return {
        "response": response
    }