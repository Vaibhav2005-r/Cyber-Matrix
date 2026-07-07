# 🚔 Cyber Matrix: AI-Powered Criminology Intelligence & Analytics

**Cyber Matrix** is a state-of-the-art criminal intelligence and geospatial analytics platform designed for law enforcement agencies and investigators. It processes a dataset of **1.67 million crime records (FIRs)** dynamically, providing real-time data insights, conversational query understanding, suspect linkage network graphs, and interactive geographical hot-spot mapping.

---

## 🚀 Key Features

### 🕸️ 1. Criminal Linkage Network Graph
- **Suspect Nexus mapping** built using `@xyflow/react`.
- Visualizes complex crime syndicates, linking suspects (kingpins/associates), active cases (FIR registries), and local police divisions.
- Includes a details panel that slides in upon node selection to view real-time intelligence briefs.

### 🗺️ 2. Geospatial Crime Hotspots
- High-performance mapping built using `react-leaflet`.
- Plots live geographical incident markers from over **508,000 geocoded rows** in the dataset.
- Styled with neon, pulsating heatpoints matching different crime categories (Violent Crime = Red, Theft = Blue, Cyber Crime = Cyan).
- Dropdown selectors allow real-time scope filtering by district and crime type.

### 🤖 3. AI Investigation Assistant
- Natural language query parser with stateless context memory.
- Dynamically calculates criminology metrics (total arrests, convictions, and primary division hot-spots) for matching subsets.
- Generates context-aware recommended follow-up questions to drill down into the data.
- **PDF Export:** Click **Export Report** to compile the active search parameters and Q&A conversation transcript into a formatted law enforcement intelligence briefing.

### 📊 4. Live Intelligence Dashboard
- Real-time aggregation of overall statistics (Total cases, unique crime groups, convictions, and divisions).
- Dynamic Recharts analytics showing monthly trends, division workloads, and crime distributions directly from the backend database.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Active app:** `client/`
- **Styling:** Tailwind CSS v3
- **Visuals & Graphs:** Recharts, Lucide Icons, React Force Graph
- **Interactions:** Leaflet (`react-leaflet`)

### Backend
- **Framework:** FastAPI (Python 3.13)
- **Data Engine:** Pandas (vectorized groupings, custom string indexing, and optimized coordinate lookups for <10s load times on 1.67M rows)
- **Validation:** Pydantic v2

---

## 📦 Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Clone & Set Up Dataset
1. Save your FIR details CSV inside the backend directory under:
   `backend/data/FIR_Details_Data.csv`
2. Create a `.env` file inside `backend/`:
   ```env
   DATASET_PATH=data/FIR_Details_Data.csv
   API_NAME=Cyber Matrix Crime API
   API_VERSION=1.0.0
   ```

### 2. Run Python Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The server will start at `http://localhost:8000`.

### 3. Run React Frontend
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
