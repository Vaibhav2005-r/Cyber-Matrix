class Memory:
    def __init__(self):
        self.context = {}

    def update(self, parsed: dict):
        # We only update if the parameters are not None, to preserve the previous context memory
        for key in ["district", "crime", "station", "year", "only_convicted"]:
            val = parsed.get(key)
            if val is not None:
                self.context[key] = val

    def get(self) -> dict:
        return self.context

    def clear(self):
        self.context = {}
