from abc import ABC, abstractmethod

class BaseSkill(ABC):
    name: str = ""
    description: str = ""

    @abstractmethod
    def run(self, parameters: dict) -> dict:
        pass
