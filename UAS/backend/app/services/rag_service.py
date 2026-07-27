import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaLLM

load_dotenv()

file_path = os.path.join(os.path.dirname(__file__), "..", "data", "pengetahuan_obat.txt")
loader = TextLoader(file_path)
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=50)
docs = text_splitter.split_documents(documents)
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = FAISS.from_documents(docs, embeddings)

llm = OllamaLLM(model="gemma2:2b")

def get_bot_response(query: str):
    try:
        results = vectorstore.similarity_search(query, k=2)
        context = "\n".join([doc.page_content for doc in results])

        prompt = f"Anda asisten apoteker. Jawab dengan data ini: {context}. Pertanyaan: {query}"

        response = llm.invoke(prompt)
        return response

    except Exception as e:
        print(f"DETAIL ERROR: {str(e)}")
        return "Terjadi kendala teknis."
