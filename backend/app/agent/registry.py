TOOLS = {}
SKILLS = {}

def register(tool):
    TOOLS[tool.name] = tool

def get(tool_name):
    return TOOLS.get(tool_name)

def list_tools():
    return list(TOOLS.keys())

def register_skill(skill):
    SKILLS[skill.name] = skill

def get_skill(name):
    return SKILLS.get(name)

def list_skills():
    return list(SKILLS.keys())
