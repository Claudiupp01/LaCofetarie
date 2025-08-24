from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import CORS middleware

app = FastAPI()

# --- IMPORTANT: Add CORS Middleware ---
# This allows your React frontend (running on localhost:3000)
# to make requests to your backend (running on localhost:8000)
origins = [
    "http://localhost:3000",
]

# why did we still need the "proxy" setting in package.json?
# During development, the proxy is a more direct and convenient solution.
# Without Proxy: Your React app at :3000 tries to call your API at :8000. This is a "cross-origin" request. The browser sees this, checks with the bouncer (CORS) on the backend, gets permission, and lets it through.
# With Proxy: Your React app at :3000 calls /api/povestea. The request goes to the React server at :3000. The server itself then forwards the request to :8000. From the browser's perspective, it only ever talked to :3000, so the Same-Origin Policy never even becomes an issue.
# In short: The Proxy is a development trick to make life easier. The CORS Middleware is the real, production-ready security rule on your backend that is absolutely essential for when your website goes live. Having both is a best practice.

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

@app.get("/api/povestea")
async def get_povestea_data():
    return {
        "title": "O Tradiție Dulce",
        "description": "Descoperă cum a început totul.",
    }

@app.get("/api/productie")
async def get_productie_data():
    return {
        "title": "Arta Cofetăriei",
        "description": "Calitate și măiestrie în fiecare produs.",
    }

@app.get("/api/contact")
async def get_contact_data():
    return {
        "title": "Contactează-ne",
        "description": "Suntem aici pentru orice întrebare sau comandă specială.",
    }

@app.get("/api/produse")
async def get_produse_data():
    # This is a mock database structure. Later, this will come from a real database.
    return {
        "categories": [
            {
                "id": "cat_prajituri",
                "name": "Prăjituri",
                "subcategories": [
                    {
                        "id": "sub_prajituri_casa",
                        "name": "De Casă",
                        "products": [
                            {"id": "prod_1", "name": "Amandina", "description": "Clasica amandină cu cremă de cacao.", "price": "15 RON", "image": "/images/products/amandina.jpg"},
                            {"id": "prod_2", "name": "Savarina", "description": "Pufoasă și însiropată, cu frișcă proaspătă.", "price": "14 RON", "image": "/images/products/savarina.jpg"},
                        ]
                    },
                    {
                        "id": "sub_prajituri_mousse",
                        "name": "Mousse",
                        "products": [
                            {"id": "prod_3", "name": "Mousse de Ciocolată", "description": "Mousse aerat de ciocolată belgiană.", "price": "20 RON", "image": "/images/products/mousse.jpg"},
                        ]
                    }
                ]
            },
            {
                "id": "cat_torturi",
                "name": "Torturi",
                "subcategories": [
                    {
                        "id": "sub_torturi_nunta",
                        "name": "De Nuntă",
                        "products": [
                            {"id": "prod_4", "name": "Tort Red Velvet", "description": "Blat roșu pufos și cremă de brânză.", "price": "180 RON", "image": "/images/products/red_velvet.jpg"},
                            {"id": "prod_5", "name": "Tort Diplomat", "description": "Tort răcoros cu frișcă și fructe.", "price": "150 RON", "image": "/images/products/diplomat.jpg"},
                        ]
                    }
                ]
            }
        ]
    }