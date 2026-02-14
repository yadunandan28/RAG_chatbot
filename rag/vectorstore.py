from langchain_community.vectorstores import Chroma


def create_vectorstore(chunks, embedding_model):
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model
    )

    return vectorstore
