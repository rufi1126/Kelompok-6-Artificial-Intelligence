from pydantic import BaseModel

class ObatBase(BaseModel):
    nama: str
    stok: int
    harga: float
    deskripsi: str

class ObatCreate(ObatBase):
    pass

class Obat(ObatBase):
    id: int
    class Config:
        from_attributes = True