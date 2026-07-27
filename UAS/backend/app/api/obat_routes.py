from fastapi import APIRouter
from pydantic import BaseModel
from app.services import rag_service

router = APIRouter()

class Obat(BaseModel):
    nama: str
    kegunaan: str

@router.post("/")
def tambah_obat(obat: Obat):
    with open("./data/pengetahuan_obat.txt", "a") as f:
        f.write(f"\n{obat.nama}: {obat.kegunaan}")
    
    # Memicu AI untuk belajar ulang data baru
    rag_service.load_or_refresh_db()
    
    return {"message": f"Obat {obat.nama} berhasil ditambahkan dan AI sudah mempelajarinya!"}