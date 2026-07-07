from app.tools.base_tool import BaseTool

class TimelineTool(BaseTool):
    name = "timeline"
    description = "Generates a chronological milestone timeline for investigations and crime events based on case records."

    def execute(self, parameters: dict) -> dict:
        records = parameters.get("records", [])
        if not records:
            return {"timeline": []}
            
        # Build a timeline from the first matching record as a case study
        case = records[0]
        
        timeline = []
        year = case.get("FIR_YEAR", 2023)
        month = case.get("FIR_MONTH", 1)
        day = case.get("FIR_Day", 1)
        
        # 1. Registration
        timeline.append({
            "date": f"{day:02d}/{month:02d}/{year}",
            "title": "FIR Registered",
            "desc": f"Case registered under ID: {case.get('Unit_ID', 'N/A')}-{case.get('KGID', 'N/A')} for offence group {case.get('CrimeGroup_Name', 'Unknown')}."
        })
        
        # 2. IO Assignment
        io = case.get("IOName")
        if io:
            timeline.append({
                "date": f"{day:02d}/{month:02d}/{year}",
                "title": "Investigating Officer Assigned",
                "desc": f"Case assigned to IO {io}."
            })
            
        # 3. Arrest (if arrested count > 0)
        arrested = case.get("Arrested Count\tNo.", 0)
        if arrested and arrested > 0:
            timeline.append({
                "date": f"{(day+2)%28:02d}/{month:02d}/{year}",
                "title": "Suspects Arrested",
                "desc": f"{arrested} suspects apprehended and taken into custody."
            })
            
        # 4. Chargesheet
        chargesheeted = case.get("Accused_ChargeSheeted Count", 0)
        if chargesheeted and chargesheeted > 0:
            timeline.append({
                "date": f"{(day+7)%28:02d}/{(month+1)%12:02d}/{year}",
                "title": "Chargesheet Submitted",
                "desc": f"Chargesheet filed against {chargesheeted} accused individuals in court."
            })
            
        # 5. Trial / Conviction
        stage = case.get("FIR_Stage", "Under Investigation")
        if stage == "Convicted":
            timeline.append({
                "date": f"{(day+15)%28:02d}/{(month+3)%12:02d}/{year}",
                "title": "Trial Completed & Convicted",
                "desc": f"Judgement delivered. Conviction count: {case.get('Conviction Count', 1)}."
            })
        else:
            timeline.append({
                "date": "Pending",
                "title": "Case Stage Status",
                "desc": f"Current status of case: {stage}."
            })
            
        return {
            "timeline": timeline,
            "case_id": f"{case.get('Unit_ID', 'N/A')}-{case.get('KGID', 'N/A')}"
        }
