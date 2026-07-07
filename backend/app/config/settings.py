from pathlib import Path
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parents[2]

load_dotenv(BASE_DIR / ".env")

DATASET_PATH = os.getenv("DATASET_PATH")

API_NAME = os.getenv("API_NAME")

API_VERSION = os.getenv("API_VERSION")