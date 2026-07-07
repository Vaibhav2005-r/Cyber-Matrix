from app.agent.registry import get
from app.agent.models import ToolResult, AgentPlan

class Executor:
    def execute(self, plan: AgentPlan) -> list[ToolResult]:
        results = []
        for tool_call in plan.tool_calls:
            tool = get(tool_call.tool)
            if tool is None:
                continue
            try:
                data = tool.execute(tool_call.parameters)
                results.append(
                    ToolResult(
                        tool=tool_call.tool,
                        success=True,
                        data=data,
                    )
                )
            except Exception as e:
                results.append(
                    ToolResult(
                        tool=tool_call.tool,
                        success=False,
                        data={"error": str(e)},
                    )
                )
        return results
