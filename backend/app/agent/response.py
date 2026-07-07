from app.agent.models import ToolResult, AgentResponse
from app.chatbot.response_formatter import ResponseFormatter
import pandas as pd

class ResponseGenerator:
    @staticmethod
    def generate(results: list[ToolResult], context: dict, query: str) -> AgentResponse:
        summary = "No matching records found."
        count = 0
        records = []
        suggestions = ["Show overall statistics", "Show cases in Bengaluru City"]
        timeline = {}
        similar_cases = []
        tools_used = [r.tool for r in results]
        
        investigation_result = next((r for r in results if r.tool == "investigation"), None)

        if investigation_result and investigation_result.success:
            skill_data = investigation_result.data
            
            # Extract nested tool data from the skill execution
            search_data = skill_data.get("search", {})
            records = search_data.get("records", [])
            count = search_data.get("count", 0)
            
            timeline = skill_data.get("timeline", {})
            similar_cases = skill_data.get("similar_cases", {}).get("similar_cases", [])
            
            # Format using existing ResponseFormatter logic
            df_temp = pd.DataFrame(records)
            if df_temp.empty:
                df_temp = pd.DataFrame(columns=["Arrested Count\tNo.", "Conviction Count", "UnitName"])
                
            formatted = ResponseFormatter.format_with_context(df_temp, context, query)
            summary = formatted.get("summary", summary)
            suggestions = formatted.get("suggestions", suggestions)

        # Build reasoning block
        reasoning = {
            "intent": context.get("intent") or "crime_query",
            "tools_used": tools_used,
            "filters": {k: v for k, v in context.items() if v is not None},
            "records_examined": 1674734,
            "records_returned": count
        }

        return AgentResponse(
            success=True,
            summary=summary,
            evidence=results,
            count=count,
            records=records,
            context=context,
            suggestions=suggestions,
            reasoning=reasoning,
            timeline=timeline,
            similar_cases=similar_cases
        )
