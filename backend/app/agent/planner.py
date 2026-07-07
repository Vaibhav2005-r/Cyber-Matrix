from app.agent.models import AgentPlan, ToolCall
from app.constants.tools import ToolName

class Planner:
    def create_plan(self, parsed_query: dict) -> AgentPlan:
        intent = parsed_query.get("intent")
        tools = []

        # Map queries to tool calls based on intent
        if intent in [
            "district",
            "crime",
            "station",
            "year",
            "district_crime",
            "district_crime_year",
        ]:
            tools.append(
                ToolCall(
                    tool=ToolName.SEARCH,
                    parameters=parsed_query,
                )
            )
        elif intent == "statistics":
            tools.append(
                ToolCall(
                    tool=ToolName.ANALYTICS,
                    parameters=parsed_query,
                )
            )
        else:
            # Default fallback to search with parsed parameters
            tools.append(
                ToolCall(
                    tool=ToolName.SEARCH,
                    parameters=parsed_query,
                )
            )

        return AgentPlan(
            intent=intent or "unknown",
            tool_calls=tools,
        )
