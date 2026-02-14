from config import TOP_K

def create_retriever(vectorstore):
    return vectorstore.as_retriever(
        search_kwargs={"k": TOP_K}
    )
