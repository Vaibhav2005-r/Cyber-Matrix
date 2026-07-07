from app.agent.planner import Planner
from app.agent.executor import Executor
from app.agent.memory import Memory
from app.agent.response import ResponseGenerator
from app.agent.models import AgentResponse
from app.agent.registry import register
from app.tools.search_tool import SearchTool
from app.tools.analytics_tool import AnalyticsTool

# Register tools on import
register(SearchTool())
register(AnalyticsTool())

class CrimeAgent:
    def __init__(self):
        self.planner = Planner()
        self.executor = Executor()
        self.memory = Memory()

    def run(self, parsed: dict, query: str, context: dict = None) -> AgentResponse:
        # Load previous context if passed
        if context:
            self.memory.context = context.copy()
            
        # Update memory context with newly parsed entities
        self.memory.update(parsed)
        
        # Merge intent back into context for tracking
        if parsed.get("intent"):
            self.memory.context["intent"] = parsed["intent"]

        # 1. Create Execution Plan
        plan = self.planner.create_plan(self.memory.get())
        
        # 2. Execute the Plan
        results = self.executor.execute(plan)
        
        # 3. Compile and generate trace/response
        return ResponseGenerator.generate(results, self.memory.get(), query)
