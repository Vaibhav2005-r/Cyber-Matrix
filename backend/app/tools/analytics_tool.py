from app.tools.base_tool import BaseTool
from app.services.crime_service import CrimeService
from app.constants.tools import ToolName

class AnalyticsTool(BaseTool):
    name = ToolName.ANALYTICS
    description = "Calculates aggregated analytics, monthly trends, and distributions for crime data."

    def __init__(self):
        self.crime_service = CrimeService()

    def execute(self, parameters: dict):
        district = parameters.get("district")
        crime = parameters.get("crime")
        year = parameters.get("year")

        stats = self.crime_service.statistics(district=district, year=year, crime=crime)
        trend = self.crime_service.monthly_trend(district=district, year=year, crime=crime)
        distribution = self.crime_service.crime_distribution(district=district, year=year, crime=crime)

        return {
            "statistics": stats,
            "monthly_trend": trend,
            "crime_distribution": distribution,
            "filters": {
                "district": district,
                "crime": crime,
                "year": year
            }
        }
