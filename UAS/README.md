# ApotekAI

Chatbot AI informasi obat & kesehatan berbasis **RAG (Retrieval-Augmented Generation)**.

Dibuat untuk tugas UAS mata kuliah Artificial Intelligence — STMIK Tazkia, 2026.

---

## Tech Stack

**Backend:** Python, FastAPI, LangChain, FAISS, HuggingFace Embeddings (`all-MiniLM-L6-v2`), Ollama (`gemma2:2b`)  
**Frontend:** React 19, Vite 8, Axios

---

## Cara Jalankan

### Backend
```bash
cd UAS/backend
pip install -r requitments.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd UAS/frontend
npm install
npm run dev
```

Buka `http://localhost:5173`







