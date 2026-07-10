from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.crime_service import CrimeService
import pandas as pd
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
        "message": "Cyber Matrix Backend Running"
    }


@app.get("/statistics")
def statistics(district: str = None, year: int = None, crime: str = None):
    return crime_service.statistics(district=district, year=year, crime=crime)

@app.get("/monthly-trend")
def monthly_trend(district: str = None, year: int = None, crime: str = None):
    return crime_service.monthly_trend(district=district, year=year, crime=crime)

@app.get("/crime-distribution")
def crime_distribution(district: str = None, year: int = None, crime: str = None):
    return crime_service.crime_distribution(district=district, year=year, crime=crime)

@app.get("/district-distribution")
def district_distribution(district: str = None, year: int = None, crime: str = None):
    return crime_service.district_distribution(district=district, year=year, crime=crime)

@app.get("/recent-cases")
def recent_cases(district: str = None, year: int = None, crime: str = None):
    return crime_service.recent_cases(district=district, year=year, crime=crime)


@app.get("/map-coordinates")
def map_coordinates(district: str = None, crime: str = None):
    # Filter coordinates
    # Use the flexible search service so substring matching works (e.g. "Bengaluru" matches "Bengaluru City")
    df = crime_service.search_flexible(district=district, crime=crime)
    df = df.dropna(subset=["Latitude", "Longitude"])
    
    # We must sample the data so the browser's Leaflet renderer doesn't crash from 1.6 million points.
    # We use a random sample of 1500 instead of .head(300) so we get a uniform state-wide distribution.
    sample_size = min(len(df), 1500)
    df_sample = df.sample(n=sample_size) if sample_size > 0 else df.head(0)
    
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
                "year": int(row["FIR_YEAR"]) if pd.notna(row["FIR_YEAR"]) else 0
            })
        except Exception:
            pass
            
    return points