import streamlit as st
import os
from rag.loader import load_pdfs
from rag.chunker import split_documents
from rag.embeddings import get_embedding_model
from rag.vectorstore import create_vectorstore
from rag.retriever import create_retriever
from rag.chain import create_llm, generate_answer
from config import DATA_PATH

st.set_page_config(
    page_title="AI PDF RAG Chatbot",
    layout="wide"
)

# ------------------ HEADER ------------------
st.markdown("""
# AI-Powered PDF RAG Chatbot
""")

st.divider()

# ------------------ SIDEBAR ------------------
with st.sidebar:
    st.header("⚙ Controls")

    # Upload PDFs
    uploaded_files = st.file_uploader(
        "Upload PDF files",
        type=["pdf"],
        accept_multiple_files=True
    )

    if uploaded_files:
        if not os.path.exists(DATA_PATH):
            os.makedirs(DATA_PATH)

        for uploaded_file in uploaded_files:
            file_path = os.path.join(DATA_PATH, uploaded_file.name)
            with open(file_path, "wb") as f:
                f.write(uploaded_file.getbuffer())

        st.success("Files uploaded successfully!")

    # Index Button
    if st.button("Index Documents"):
        with st.spinner("Indexing documents... Please wait."):
            documents = load_pdfs()
            chunks = split_documents(documents)
            embedding_model = get_embedding_model()
            vectorstore = create_vectorstore(chunks, embedding_model)
            retriever = create_retriever(vectorstore)
            llm = create_llm()

            st.session_state.vectorstore = vectorstore
            st.session_state.retriever = retriever
            st.session_state.llm = llm

        st.success("Indexing completed successfully!")

    # Clear Chat
    if st.button("Clear Chat"):
        st.session_state.messages = []
        st.success("Chat cleared!")

# ------------------ MAIN CHAT SECTION ------------------

if "messages" not in st.session_state:
    st.session_state.messages = []

if "llm" not in st.session_state:
    st.info("Upload PDFs and click 'Index Documents' to start chatting.")
else:
    st.subheader("Ask Questions About Your Documents")

    user_query = st.chat_input("Type your question here...")

    if user_query:
        st.session_state.messages.append(
            {"role": "user", "content": user_query}
        )

        with st.spinner("Generating response..."):
            answer = generate_answer(
                st.session_state.llm,
                st.session_state.retriever,
                st.session_state.vectorstore,
                user_query
            )

        st.session_state.messages.append(
            {"role": "assistant", "content": answer}
        )

# ------------------ DISPLAY CHAT ------------------

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])
