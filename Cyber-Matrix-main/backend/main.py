from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Cyber Matrix API is running"}