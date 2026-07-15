import os
import google.generativeai as genai
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Load API Key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

# Inisialisasi Database
file_path = os.path.join(os.path.dirname(__file__), "..", "data", "pengetahuan_obat.txt")
loader = TextLoader(file_path)
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=50)
docs = text_splitter.split_documents(documents)
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = FAISS.from_documents(docs, embeddings)

def get_bot_response(query: str):
    try:
        # Kita akan mengambil model yang PALING SESUAI yang diizinkan untuk API Key ini
        # Kita tidak memaksakan satu nama model spesifik
        model = genai.GenerativeModel('models/gemini-2.0-flash-lite') 
        
        # Pencarian data
        results = vectorstore.similarity_search(query, k=2)
        context = "\n".join([doc.page_content for doc in results])
        
        # Prompt
        prompt = f"Anda asisten apoteker. Jawab dengan data ini: {context}. Pertanyaan: {query}"
        
        # Generate content
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        print(f"DETAIL ERROR: {str(e)}")
        return "Terjadi kendala teknis. Pastikan API Key Anda sudah di-generate dari proyek 'Gemini Project' yang aktif."