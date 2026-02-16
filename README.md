RAG-Based AI PDF Chatbot

An end-to-end Retrieval-Augmented Generation (RAG) powered AI chatbot that allows users to upload PDF documents and query them intelligently using a locally hosted LLM.

The system is built with a modern full-stack architecture featuring secure authentication, persistent vector storage and semantic search to deliver accurate, document-grounded responses.

Features
Authentication

JWT-based Signup/Login

Secure user session handling

Document Management

Upload and query multiple PDFs

Persistent document storage

Automatic parsing and text extraction

Retrieval-Augmented Generation (RAG)

Document chunking pipeline

Vector embeddings generation

Semantic similarity search

Context injection into LLM prompts

Reduced hallucinations via grounded retrieval

Vector Database

Persistent storage using ChromaDB

Similarity threshold filtering

Efficient embedding retrieval

User Interface

Chat history sidebar

Uploaded PDF list view

Toast notifications

Responsive design

Backend

FastAPI-based REST API

Modular service architecture

MongoDB user storage

Vector database persistence

Architecture

User
→ React Frontend
→ FastAPI Backend
→ PDF Loader
→ Text Chunking
→ Embedding Generation
→ Chroma Vector Database
→ Retriever
→ LLM (Mistral via Ollama)
→ Response

Tech Stack
Backend

Python

FastAPI

LangChain

Ollama (Mistral 7B)

ChromaDB (Persistent Vector Store)

MongoDB

JWT Authentication

Frontend

React (Vite)

Tailwind CSS

Axios

React Router

React Hot Toast

Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt


Run backend:

uvicorn backend.main:app --reload


Backend runs at:

http://127.0.0.1:8000

Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

How RAG Works

PDFs are uploaded

Text is extracted

Documents are chunked

Embeddings are generated (mxbai-embed-large)

Embeddings stored in persistent ChromaDB

User submits a query

Similarity search retrieves relevant chunks

Retrieved context injected into LLM prompt

Context-aware response generated

Advanced Capabilities

Context-aware responses grounded in source documents

Reduced hallucinations through retrieval pipeline

Similarity threshold filtering

Persistent vector storage

Modular backend design

Scalable full-stack architecture

<img width="1912" height="891" alt="Screenshot 2026-02-17 005411" src="https://github.com/user-attachments/assets/12dab5d1-b35e-45d2-ad33-914e6adc3925" />

<img width="1918" height="869" alt="Screenshot 2026-02-17 005720" src="https://github.com/user-attachments/assets/acbab2a3-d102-4332-b110-cc3b2259e685" />


Future Improvements

Streaming LLM responses

Multi-session chat support

Role-based access control

Cloud deployment

Redis-based token blacklist

File management dashboard

Skills Demonstrated

Generative AI

Retrieval-Augmented Generation (RAG) Architecture

Vector Databases

Semantic Search

Full-Stack Development

Authentication and Security

API Design

UI/UX Engineering
