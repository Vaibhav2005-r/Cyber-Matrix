TOOLS = {}

def register(tool):
    TOOLS[tool.name] = tool

def get(tool_name):
    return TOOLS.get(tool_name)

def list_tools():
    return list(TOOLS.keys())
