from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routes import registration

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="NILSWA Enterprise API")

# Configure CORS for Next.js frontend (default Next.js port is 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(registration.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "NILSWA Backend API is running"}
