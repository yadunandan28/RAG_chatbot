import os
from langchain_community.document_loaders import PyPDFLoader
from config import DATA_PATH

def load_pdfs():
    documents = []

    for file in os.listdir(DATA_PATH):
        if file.endswith(".pdf"):
            loader = PyPDFLoader(os.path.join(DATA_PATH, file))
            docs = loader.load()

            for doc in docs:
                doc.metadata["source_file"] = file

                # Simple classification by filename
                if "resume" in file.lower():
                    doc.metadata["doc_type"] = "resume"
                else:
                    doc.metadata["doc_type"] = "other"

            documents.extend(docs)

    return documents


