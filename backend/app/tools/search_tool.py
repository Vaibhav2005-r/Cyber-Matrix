from app.tools.base_tool import BaseTool
from app.services.crime_service import CrimeService
from app.constants.tools import ToolName

class SearchTool(BaseTool):
    name = ToolName.SEARCH
    description = "Searches the crime database using flexible combinations of parameters like district, crime type, police station, year, and conviction status."

    def __init__(self):
        self.crime_service = CrimeService()

    def execute(self, parameters: dict):
        # Extract filters
        district = parameters.get("district")
        crime = parameters.get("crime")
        station = parameters.get("station")
        year = parameters.get("year")
        only_convicted = parameters.get("only_convicted", False)

        df_filtered = self.crime_service.search_flexible(
            district=district,
            crime=crime,
            station=station,
            year=year,
            only_convicted=only_convicted
        )
        # Format the top 100 records for evidence output
        import numpy as np
        df_head = df_filtered.head(100)
        records = df_head.replace({np.nan: None}).to_dict("records")

        return {
            "records": records,
            "count": len(df_filtered),
            "filters": {
                "district": district,
                "crime": crime,
                "station": station,
                "year": year,
                "only_convicted": only_convicted
            }
        }
