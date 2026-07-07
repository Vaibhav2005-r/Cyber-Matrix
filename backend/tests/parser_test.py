import sys
from pathlib import Path

# Add the parent directory (backend) to the search path for imports
backend_path = Path(__file__).resolve().parent.parent
sys.path.append(str(backend_path))

from app.chatbot.query_parser import QueryParser

parser = QueryParser()

questions = [

    "Show theft cases in Bagalkot",

    "Show murder cases in Mysuru in 2021",

    "Show FIRs from Amengad PS",

    "Cyber crime",

    "Statistics"

]

for q in questions:

    print("=" * 60)
    print(q)
    print(parser.parse(q))
    