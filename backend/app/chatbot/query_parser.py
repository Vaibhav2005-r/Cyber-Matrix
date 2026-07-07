from app.chatbot.entity_extractor import EntityExtractor
from app.chatbot.intent_router import IntentRouter


class QueryParser:

    def __init__(self):

        self.extractor = EntityExtractor()
        self.router = IntentRouter()

    def parse(self, query: str):

        entities = self.extractor.extract(query)

        intent = self.router.detect(entities)

        entities["intent"] = intent

        return entities