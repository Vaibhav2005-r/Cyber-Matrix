from fastapi import APIRouter
from pydantic import BaseModel

from app.services.crime_service import CrimeService
from app.chatbot.query_parser import QueryParser
from app.chatbot.response_formatter import ResponseFormatter

router = APIRouter()

crime_service = CrimeService()
parser = QueryParser()


class ChatRequest(BaseModel):
    query: str
    context: dict | None = None


@router.post("/chat")
def chat(request: ChatRequest):
    # Parse new entities from the user's query
    new_entities = parser.extractor.extract(request.query)
    
    # Merge with previous context if provided
    prev_context = request.context or {}
    
    # Check for reset/clear commands in the user query
    if any(word in request.query.lower() for word in ["reset", "clear", "restart", "start over"]):
        prev_context = {}
        new_entities = parser.extractor.extract(request.query)
        
    merged_context = {
        "district": new_entities.get("district") or prev_context.get("district"),
        "crime": new_entities.get("crime") or prev_context.get("crime"),
        "station": new_entities.get("station") or prev_context.get("station"),
        "year": new_entities.get("year") or prev_context.get("year")
    }
    
    # Check for conviction filters in query or previous context
    only_convicted = any(word in request.query.lower() for word in ["convic", "convicted", "conviction"])
    is_convicted = only_convicted or prev_context.get("only_convicted", False)
    
    # If the user says "all cases" or "any cases" or "no conviction", clear conviction filter
    if any(word in request.query.lower() for word in ["all cases", "any cases", "every case", "without conviction"]):
        is_convicted = False
        
    merged_context["only_convicted"] = is_convicted
    
    # Execute the flexible search using the merged context
    df_filtered = crime_service.search_flexible(
        district=merged_context.get("district"),
        crime=merged_context.get("crime"),
        station=merged_context.get("station"),
        year=merged_context.get("year"),
        only_convicted=merged_context.get("only_convicted", False)
    )
    
    # Format response using the new format_with_context method
    return ResponseFormatter.format_with_context(df_filtered, merged_context, request.query)