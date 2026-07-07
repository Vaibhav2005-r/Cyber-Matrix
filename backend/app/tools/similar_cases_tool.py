from app.tools.base_tool import BaseTool
from app.services.crime_service import CrimeService

class SimilarCasesTool(BaseTool):
    name = "similar_cases"
    description = "Searches for similar cases across other districts to identify repeat offence patterns."

    def __init__(self):
        self.crime_service = CrimeService()

    def execute(self, parameters: dict) -> dict:
        crime = parameters.get("crime")
        district = parameters.get("district")
        
        if not crime:
            return {"similar_cases": []}
            
        # Search the global DataFrame for similar crimes, excluding current district
        df = self.crime_service.df
        df_similar = df[df["CrimeHead_Name"] == crime]
        if district:
            df_similar = df_similar[df_similar["District_Name"] != district]
            
        df_sample = df_similar.head(5)
        
        import numpy as np
        records = df_sample.replace({np.nan: None}).to_dict("records")
        
        return {
            "similar_cases": [
                {
                    "case_id": f"{r.get('Unit_ID')}-{r.get('KGID')}",
                    "district": r.get("District_Name"),
                    "station": r.get("UnitName"),
                    "year": r.get("FIR_YEAR"),
                    "stage": r.get("FIR_Stage")
                } for r in records
            ],
            "count": len(df_similar)
        }
