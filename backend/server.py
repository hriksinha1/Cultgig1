from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

# ─── Configuration ─────────────────────────────────────────────
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# ─── FastAPI App Setup ─────────────────────────────────────────
app = FastAPI(
    title="CultGig API",
    description="Backend API for CultGig - Talent Marketplace Platform",
    version="1.0.0",
)

api_router = APIRouter(prefix="/api")

# ─── Models ────────────────────────────────────────────────────

class WaitlistEntry(BaseModel):
    """Waitlist signup model"""
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    role: str  # "artist" or "business"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class WaitlistCreate(BaseModel):
    """Input model for waitlist signup"""
    name: str
    email: str
    role: str

class StatusCheck(BaseModel):
    """Health check model"""
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# ─── Routes ────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "CultGig API is running", "status": "ok"}

@api_router.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "service": "CultGig Landing Page API",
        "version": "1.0.0",
    }

@api_router.post("/waitlist", response_model=WaitlistEntry)
async def join_waitlist(entry: WaitlistCreate):
    """Add a user to the CultGig waitlist"""
    waitlist_obj = WaitlistEntry(**entry.model_dump())
    doc = waitlist_obj.model_dump()
    await db.waitlist.insert_one(doc)
    return waitlist_obj

@api_router.get("/waitlist", response_model=List[WaitlistEntry])
async def get_waitlist():
    """Get all waitlist entries"""
    entries = await db.waitlist.find({}, {"_id": 0}).to_list(1000)
    return entries

@api_router.get("/waitlist/count")
async def get_waitlist_count():
    """Get waitlist count"""
    count = await db.waitlist.count_documents({})
    return {"count": count}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# ─── Include Router & Middleware ───────────────────────────────
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Logging ───────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
