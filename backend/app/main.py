from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from app.routes.advisor import router as advisor_router
from app.tools.transcript_tool import process_transcript



app = FastAPI(title="UMBC AI Advisor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "https://reimagined-spoon-447vq94vw7wfgvr-5173.app.github.dev",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "UMBC AI Academic Advisor Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.post("/upload-transcript")
async def upload_transcript(file: UploadFile = File(...)):
    return await process_transcript(file)


app.include_router(advisor_router)