from pydantic import BaseModel
from typing import Any, Optional

class ToolCall(BaseModel):
    tool: str
    parameters: dict

class AgentPlan(BaseModel):
    intent: str
    skill: str
    parameters: dict

class ToolResult(BaseModel):
    tool: str
    success: bool
    data: Any

class AgentResponse(BaseModel):
    success: bool
    summary: str
    evidence: list[ToolResult]
    count: int = 0
    records: list = []
    context: dict = {}
    suggestions: list[str] = []
    reasoning: dict = {}
    timeline: dict = {}
    similar_cases: list = []
