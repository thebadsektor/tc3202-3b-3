from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from .config import MONGO_URI, DB_NAME

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    # Force a connection check (optional)
    client.admin.command('ping')
    db = client[DB_NAME]
    print("✅ Connected to MongoDB")
except ConnectionFailure as e:
    print(f"❌ Could not connect to MongoDB: {e}")
    db = None
