# LLM configuration
LLM_MODEL = "gemma:2b"

# Embedding model
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# Chunk settings
CHUNK_SIZE = 800
CHUNK_OVERLAP = 100

# Retrieval settings
TOP_K = 3

# Data folder
DATA_PATH = "data"

# Optional (future persistent)
PERSIST_DIRECTORY = "chroma_db"
