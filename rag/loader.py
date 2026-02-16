import os
from langchain_community.document_loaders import PyPDFLoader
from config import DATA_PATH

DATA_PATH = "data"
UPLOAD_PATH = "uploaded_pdfs"

def load_pdfs():
    documents = []

    for folder in [DATA_PATH, UPLOAD_PATH]:
        if os.path.exists(folder):
            for file in os.listdir(folder):
                if file.endswith(".pdf"):
                    loader = PyPDFLoader(os.path.join(folder, file))
                    documents.extend(loader.load())

    return documents



