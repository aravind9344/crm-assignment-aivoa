from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.models.interaction import Interaction
from app.routes.interaction import router as interaction_router
from app.routes.chat import router as chat_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI First CRM HCP",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interaction_router)
app.include_router(chat_router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "AI CRM Backend Running 🚀"
    }