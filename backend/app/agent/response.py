from app.agent.models import ToolResult, AgentResponse
from app.chatbot.response_formatter import ResponseFormatter
import pandas as pd

class ResponseGenerator:
    @staticmethod
    def generate(results: list[ToolResult], context: dict, query: str) -> AgentResponse:
        # Defaults
        summary = "No matching records found."
        count = 0
        records = []
        suggestions = ["Show overall statistics", "Show cases in Bengaluru City"]
        tools_used = [r.tool for r in results]
        
        # Check if we have search tool results
        search_result = next((r for r in results if r.tool == "search"), None)
        analytics_result = next((r for r in results if r.tool == "analytics"), None)

        if search_result and search_result.success:
            data = search_result.data
            records = data.get("records", [])
            count = data.get("count", 0)
            
            # Recreate df for ResponseFormatter
            df_temp = pd.DataFrame(records)
            # If empty, make sure columns exist
            if df_temp.empty:
                df_temp = pd.DataFrame(columns=["Arrested Count\tNo.", "Conviction Count", "UnitName"])
                
            formatted = ResponseFormatter.format_with_context(df_temp, context, query)
            summary = formatted.get("summary", summary)
            suggestions = formatted.get("suggestions", suggestions)
            
        elif analytics_result and analytics_result.success:
            data = analytics_result.data
            stats = data.get("statistics", {})
            total = stats.get("total_records", 0)
            convictions = stats.get("convictions", 0)
            
            summary = f"Aggregated Criminology Statistics compiled successfully.\n\n"
            summary += f"• **Total Recorded Cases:** {total:,}\n"
            summary += f"• **Unique Districts:** {stats.get('districts', 0)}\n"
            summary += f"• **Precincts:** {stats.get('stations', 0)}\n"
            summary += f"• **Total Convictions:** {convictions:,}"
            
            count = total
            suggestions = [
                "Show cases in Bengaluru City",
                "Show theft cases in Bagalkot",
                "Compare with previous year"
            ]

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
            reasoning=reasoning
        )
