from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.crime_service import CrimeService
from app.config.settings import API_NAME, API_VERSION
from app.api.chat import router as chat_router


app = FastAPI(
    title=API_NAME,
    version=API_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

crime_service = CrimeService()
app.include_router(chat_router)


@app.get("/")
def home():

    return {
        "message": "Cyber Matrix Backend Running 🚀"
    }


@app.get("/statistics")
def statistics():

    return crime_service.statistics()


@app.get("/monthly-trend")
def monthly_trend():

    return crime_service.monthly_trend()


@app.get("/crime-distribution")
def crime_distribution():

    return crime_service.crime_distribution()


@app.get("/district-distribution")
def district_distribution():

    return crime_service.district_distribution()


@app.get("/recent-cases")
def recent_cases():

    return crime_service.recent_cases()


@app.get("/map-coordinates")
def map_coordinates(district: str = None, crime: str = None):
    # Filter coordinates
    df = crime_service.df.dropna(subset=["Latitude", "Longitude"])
    if district:
        df = df[df["District_Name"] == district]
    if crime:
        df = df[df["CrimeHead_Name"] == crime]
        
    df_sample = df.head(300)
    
    points = []
    for idx, row in df_sample.iterrows():
        try:
            points.append({
                "id": str(idx),
                "lat": float(row["Latitude"]),
                "lng": float(row["Longitude"]),
                "district": str(row["District_Name"]),
                "crime": str(row["CrimeHead_Name"]),
                "station": str(row["UnitName"]),
                "year": int(row["FIR_YEAR"])
            })
        except Exception:
            pass
            
    return points