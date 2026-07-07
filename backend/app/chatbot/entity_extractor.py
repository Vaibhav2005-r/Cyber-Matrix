import re

from app.database.data_loader import DataLoader


class EntityExtractor:

    def __init__(self):

        loader = DataLoader()

        self.districts = list(loader.district_index.keys())
        self.crimes = list(loader.crime_index.keys())
        self.stations = list(loader.station_index.keys())

    def extract(self, text: str):

        text_lower = text.lower()

        # 1. Extract District
        district = None
        # Sort districts by length descending to match longer ones first
        for d in sorted(self.districts, key=len, reverse=True):
            d_clean = d.lower()
            for suffix in [" city", " dist", " district"]:
                if d_clean.endswith(suffix):
                    d_clean = d_clean[:-len(suffix)]
            d_clean = d_clean.strip()
            
            pattern = r"\b" + re.escape(d_clean) + r"\b"
            if re.search(pattern, text_lower):
                district = d
                break

        # 2. Extract Station
        station = None
        crime_or_district_terms = {"cyber", "crime", "theft", "murder"}
        for s in sorted(self.stations, key=len, reverse=True):
            s_clean = s.lower()
            has_explicit_station_indicator = any(x in text_lower for x in ["ps", "station", "police"])
            
            for suffix in [" ps", " police station", " station"]:
                if s_clean.endswith(suffix):
                    s_clean = s_clean[:-len(suffix)]
            s_clean = s_clean.strip()
            
            # If the core name of the station is a crime/district term, require explicit indicator
            if any(term in s_clean.split() for term in crime_or_district_terms) and not has_explicit_station_indicator:
                continue
                
            pattern = r"\b" + re.escape(s_clean) + r"\b"
            if re.search(pattern, text_lower):
                station = s
                break

        # 3. Extract Crime
        crime = None
        # Keyword mapping for common terms
        crime_keywords = {
            "theft": "House Theft",
            "murder": "Murder(Homicide)",
            "cyber": "Information Technology Act 2000, 2009",
            "cheating": "CHEATING",
            "rape": "Rape",
        }
        
        for kw, category in crime_keywords.items():
            if re.search(r"\b" + re.escape(kw) + r"\b", text_lower):
                crime = category
                break
                
        if not crime:
            stop_words = {
                "from", "with", "other", "under", "above", "not", "included", "causes", "relative", "husband", "law",
                "court", "government", "public", "private", "establishment", "places", "place", "state", "national",
                "highway", "highways", "roads", "road", "items", "good", "behaviour", "sec", "excise", "act", "mines",
                "minerals", "regulation", "development", "officer", "official", "organization", "authority", "personnel",
                "person", "persons", "member", "members", "dignitaries", "figures", "general", "related", "dispute", "disputes",
                "order", "issue", "issues", "accident", "incident"
            }
            for c in sorted(self.crimes, key=len, reverse=True):
                c_clean = c.lower().strip()
                c_clean = re.sub(r"[\(\)\-\d]", " ", c_clean).strip()
                if not c_clean or c_clean in ["others", "men", "women"]:
                    if re.search(r"\b" + re.escape(c.lower().strip()) + r"\b", text_lower):
                        crime = c
                        break
                    continue
                    
                words = [w for w in c_clean.split() if len(w) > 3 and w not in stop_words]
                if words:
                    if any(re.search(r"\b" + re.escape(w) + r"\b", text_lower) for w in words):
                        crime = c
                        break
                else:
                    if re.search(r"\b" + re.escape(c_clean) + r"\b", text_lower):
                        crime = c
                        break

        # 4. Extract Year
        year = None
        match = re.search(r"\b(19\d{2}|20\d{2})\b", text)
        if match:
            year = int(match.group())

        return {
            "district": district,
            "crime": crime,
            "station": station,
            "year": year
        }