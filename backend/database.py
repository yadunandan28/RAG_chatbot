from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017/rag_app"

client = MongoClient(MONGO_URL)
db = client["rag_app"]
users_collection = db["users"]
