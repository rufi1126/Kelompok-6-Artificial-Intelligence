from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Obat(BaseModel):
    id: int
    nama: str
    stok: int

# Mock database
db = [{"id": 1, "nama": "Paracetamol", "stok": 50}]

@router.get("/", response_model=List[Obat])
def get_obat():
    return db

@router.post("/", response_model=Obat)
def add_obat(obat: Obat):
    db.append(obat.dict())
    return obat