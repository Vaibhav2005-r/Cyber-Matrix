from fastapi import APIRouter
from pydantic import BaseModel

from app.chatbot.query_parser import QueryParser
from app.agent.agent import CrimeAgent

router = APIRouter()
parser = QueryParser()
agent = CrimeAgent()

class ChatRequest(BaseModel):
    query: str
    context: dict | None = None

@router.post("/chat")
def chat(request: ChatRequest):
    # Parse new entities from the user's query
    parsed_query = parser.parse(request.query)
    
    # Check for reset/clear commands in the user query
    prev_context = request.context or {}
    if any(word in request.query.lower() for word in ["reset", "clear", "restart", "start over"]):
        prev_context = {}
        
    # Check for conviction filters in query or previous context
    only_convicted = any(word in request.query.lower() for word in ["convic", "convicted", "conviction"])
    is_convicted = only_convicted or prev_context.get("only_convicted", False)
    
    # If the user says "all cases" or "any cases" or "no conviction", clear conviction filter
    if any(word in request.query.lower() for word in ["all cases", "any cases", "every case", "without conviction"]):
        is_convicted = False
        
    parsed_query["only_convicted"] = is_convicted

    # Run the CrimeAgent orchestrator
    agent_response = agent.run(parsed_query, request.query, prev_context)
    
    # Return the response directly
    return agent_response