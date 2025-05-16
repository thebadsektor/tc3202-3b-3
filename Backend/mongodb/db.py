import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from .config import  DB_NAME
from dotenv import load_dotenv
load_dotenv()

mongo_uri = os.getenv("MONGO_URI")

# Load from the parent directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

try:
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    # Force a connection check (optional)
    client.admin.command('ping')
    db = client[DB_NAME]
    print("Connected to MongoDB")
except ConnectionFailure as e:
    print(f"❌ Could not connect to MongoDB: {e}")
    db = None
