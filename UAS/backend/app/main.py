from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat_routes import router as chat_router

app = FastAPI()

# Konfigurasi CORS agar frontend bisa mengakses backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Menghubungkan router dengan prefix /api/chat
app.include_router(chat_router, prefix="/api/chat")

@app.get("/")
def read_root():
    return {"message": "Backend Apotek AI Aktif"}