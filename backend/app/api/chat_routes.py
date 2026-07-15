from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.rag_service import get_bot_response

router = APIRouter()

class ChatRequest(BaseModel):
    query: str

@router.post("/tanya")
async def ask_chatbot(request: ChatRequest):
    if not request.query:
        raise HTTPException(status_code=400, detail="Pertanyaan tidak boleh kosong")
    
    answer = get_bot_response(request.query)
    return {"response": answer}