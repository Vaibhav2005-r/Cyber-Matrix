from app.skills.base_skill import BaseSkill
from app.agent.registry import get as get_tool

class InvestigationSkill(BaseSkill):
    name = "investigation"
    description = "Coordinates search, statistics, timeline reconstruction, and cross-district similar case lookups to deliver a traceably detailed case file."

    def run(self, parameters: dict) -> dict:
        results = {}
        
        # 1. Run Search Tool
        search_tool = get_tool("search")
        if search_tool:
            search_data = search_tool.execute(parameters)
            results["search"] = search_data
            
            # 2. Run Timeline Tool on matched records
            timeline_tool = get_tool("timeline")
            if timeline_tool and search_data.get("records"):
                timeline_data = timeline_tool.execute({"records": search_data["records"]})
                results["timeline"] = timeline_data
                
        # 3. Run Analytics Tool
        analytics_tool = get_tool("analytics")
        if analytics_tool:
            analytics_data = analytics_tool.execute(parameters)
            results["analytics"] = analytics_data
            
        # 4. Run Similar Cases Tool
        similar_tool = get_tool("similar_cases")
        if similar_tool:
            similar_data = similar_tool.execute(parameters)
            results["similar_cases"] = similar_data

        return results
