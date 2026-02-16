from rag.loader import load_pdfs
from rag.chunker import split_documents
from rag.embeddings import get_embedding_model
from rag.vectorstore import create_vectorstore
from rag.retriever import create_retriever
from rag.chain import create_llm, generate_answer

vectorstore = None
retriever = None
llm = None

def initialize_rag():
    global vectorstore, retriever, llm

    documents = load_pdfs()
    chunks = split_documents(documents)
    embedding_model = get_embedding_model()
    vectorstore = create_vectorstore(chunks, embedding_model)
    retriever = create_retriever(vectorstore)
    llm = create_llm()

def chat_with_rag(query: str):
    return generate_answer(llm, retriever, vectorstore, query)
