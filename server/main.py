from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
import models
from database import engine
from routes import registration, contact

# We do not run create_all on startup in serverless environments
# The schema should be created manually via Neon SQL Editor

app = FastAPI(title="NILSWA Enterprise API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for easier testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    # Attempt to add new columns to the database on startup
    try:
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE registrations ADD COLUMN IF NOT EXISTS username VARCHAR"))
            conn.execute(text("ALTER TABLE registrations ADD COLUMN IF NOT EXISTS password_hash VARCHAR"))
            conn.execute(text("ALTER TABLE registrations ADD COLUMN IF NOT EXISTS mfa_secret VARCHAR"))
            conn.execute(text("ALTER TABLE registrations ADD COLUMN IF NOT EXISTS mfa_enabled BOOLEAN DEFAULT FALSE"))
            
            # Also ensure indices on username
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_registrations_username ON registrations (username)"))
    except Exception as e:
        print(f"Migration error: {e}")

app.include_router(registration.router, prefix="/api/v1")
app.include_router(contact.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "NILSWA Backend API is running"}
