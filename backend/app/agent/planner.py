from app.agent.models import AgentPlan

class Planner:
    def create_plan(self, parsed_query: dict) -> AgentPlan:
        intent = parsed_query.get("intent")
        
        # Route to the appropriate Skill Coordinator
        # For Phase B, all cased queries use the "investigation" skill.
        skill_name = "investigation"
        
        return AgentPlan(
            intent=intent or "unknown",
            skill=skill_name,
            parameters=parsed_query,
        )
