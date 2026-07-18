from app.agent.planner import Planner
from app.agent.executor import Executor
from app.agent.memory import Memory
from app.agent.response import ResponseGenerator
from app.agent.models import AgentResponse
from app.agent.registry import register, register_skill

from app.tools.search_tool import SearchTool
from app.tools.analytics_tool import AnalyticsTool
from app.tools.timeline_tool import TimelineTool
from app.tools.similar_cases_tool import SimilarCasesTool

from app.skills.investigation import InvestigationSkill

# Register tools
register(SearchTool())
register(AnalyticsTool())
register(TimelineTool())
register(SimilarCasesTool())

# Register skills
register_skill(InvestigationSkill())

class CrimeAgent:
      def __init__(self):
          self.planner = Planner()
          self.executor = Executor()
          self.memory = Memory()

      def run(self, parsed: dict, query: str, context: dict = None) -> AgentResponse:
          if context:
              self.memory.context = context.copy()
              
          self.memory.update(parsed)
          
          if parsed.get("intent"):
              self.memory.context["intent"] = parsed["intent"]

          # 1. Create plan matching intent to skill
          plan = self.planner.create_plan(self.memory.get())
          
          # 2. Execute skill
          results = self.executor.execute(plan)
          
          # 3. Generate response
          return ResponseGenerator.generate(results, self.memory.get(), query)
