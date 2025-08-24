from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import CORS middleware

app = FastAPI()

# --- IMPORTANT: Add CORS Middleware ---
# This allows your React frontend (running on localhost:3000)
# to make requests to your backend (running on localhost:8000)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello from the Pastry Shop Backend!"}

# --- New Mock Endpoints ---

@app.get("/api/povestea")
async def get_povestea_data():
    return {
        "title": "O Tradiție Dulce",
        "description": "Descoperă cum a început totul.",
        "content": "Aici este povestea noastră, plină de pasiune și arome."
    }

@app.get("/api/productie")
async def get_productie_data():
    return {
        "title": "Arta Cofetăriei",
        "description": "Calitate și măiestrie în fiecare produs.",
        "content": "Procesul nostru combină tehnicile tradiționale cu inovația."
    }

# Add similar mock endpoints for /api/produse and /api/contact