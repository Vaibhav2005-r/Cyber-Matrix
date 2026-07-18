from app.agent.registry import get_skill
from app.agent.models import ToolResult, AgentPlan

class Executor:
    def execute(self, plan: AgentPlan) -> list[ToolResult]:
        skill = get_skill(plan.skill)
        if skill is None:
            raise ValueError(f"Skill '{plan.skill}' not found")
            
        results = []
        try:
            data = skill.run(plan.parameters)
            results.append(
                ToolResult(
                    tool=plan.skill,
                    success=True,
                    data=data,
                )
            )
        except Exception as e:
            results.append(
                ToolResult(
                    tool=plan.skill,
                    success=False,
                    data={"error": str(e)},
                )
            )
        return results
