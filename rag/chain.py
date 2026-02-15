from langchain_ollama import OllamaLLM
from config import LLM_MODEL

def create_llm():
    return OllamaLLM(model=LLM_MODEL)

def generate_answer(llm, retriever, vectorstore, query):

    query_lower = query.lower().strip()

    greetings = ["hi", "hello", "hey"]
    if query_lower in greetings:
        return llm.invoke(query)

    # Get documents with similarity scores
    docs_with_scores = vectorstore.similarity_search_with_score(
        query,
        k=5
    )
    for doc, score in docs_with_scores:
        print("Score:", score)
        print(doc.page_content[:200])


    # Filter strong matches (adjust threshold if needed)
    similarity_threshold = 0.7

    strong_docs = [
        doc for doc, score in docs_with_scores
        if score < similarity_threshold
    ]

    # If no strong matches → fallback to normal LLM
    if not strong_docs:
        return "No relevant information found in the provided documents."


    context = "\n\n".join([doc.page_content for doc in strong_docs])

    prompt = f"""
You are an AI assistant.

Answer using ONLY the provided context.
If the information is not found in the context, say:
"I don't know based on the provided documents."

Context:
{context}

Question:
{query}

Answer clearly and concisely.
"""

    return llm.invoke(prompt)
