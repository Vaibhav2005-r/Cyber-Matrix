from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/dashboard/overview")
def get_dashboard_overview():
    # TODO: Connect to Catalyst Data Store via ZCQL
    # For now, return mock data to prove API plumbing
    return {
        "totalFirs": 14820,
        "activeCases": 3410,
        "casesSolved": 8900,
        "chargesheetsFiled": 9200,
        "highPriorityCases": 142,
        "repeatOffenders": 840,
        "activeHotspots": 14,
        "crimeIncrease": 2.4,
    }

@app.get("/api/crime/trends")
def get_crime_trends():
    return [
        {"name": "Mon", "crimes": 120},
        {"name": "Tue", "crimes": 145},
        {"name": "Wed", "crimes": 110},
        {"name": "Thu", "crimes": 135},
        {"name": "Fri", "crimes": 190},
        {"name": "Sat", "crimes": 210},
        {"name": "Sun", "crimes": 180},
    ]

if __name__ == "__main__":
    import uvicorn
    # Catalyst AppSail expects the app to bind to this specific port
    port = int(os.environ.get("X_ZOHO_CATALYST_LISTEN_PORT", 9000))
    uvicorn.run(app, host="0.0.0.0", port=port)
