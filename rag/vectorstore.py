import os
from langchain_community.vectorstores import Chroma
from config import PERSIST_DIRECTORY

def create_vectorstore(chunks, embedding_model):
    
    # If DB already exists, load it
    if os.path.exists(PERSIST_DIRECTORY) and os.listdir(PERSIST_DIRECTORY):
        print("Loading existing vector store...")
        vectorstore = Chroma(
            persist_directory=PERSIST_DIRECTORY,
            embedding_function=embedding_model
        )
    else:
        print("Creating new vector store...")
        vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=embedding_model,
            persist_directory=PERSIST_DIRECTORY
        )
        vectorstore.persist()
    
    return vectorstore
