from langchain_ollama import OllamaLLM
from config import LLM_MODEL

def create_llm():
    return OllamaLLM(model=LLM_MODEL)


def generate_answer(llm, retriever, query):
    relevant_docs = retriever.invoke(query)

    if not relevant_docs:
        return "No relevant information found in the documents."

    # 🔍 DEBUG: Show retrieved chunks
    for i, doc in enumerate(relevant_docs):
        print(f"\n--- Retrieved Chunk {i+1} ---")
        print("Source:", doc.metadata.get("source_file"))
        print(doc.page_content[:300])



    context = "\n\n".join([doc.page_content for doc in relevant_docs])

    prompt = f"""
You are an AI assistant.

Using ONLY the information in the context below,
generate a clear and concise response.

You may summarize or combine information from the context.

If the information is not present at all, respond with:
"I don't know based on the provided documents."

Context:
{context}

Question:
{query}

Answer clearly and concisely.
"""

    return llm.invoke(prompt)
