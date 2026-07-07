import pandas as pd

import pandas as pd
from app.database.data_loader import DataLoader


class CrimeService:

    def __init__(self):

        loader = DataLoader()

        self.df = loader.dataframe()

        self.districts = loader.district_index
        self.crimes = loader.crime_index
        self.stations = loader.station_index
        self.years = loader.year_index

    def statistics(self, district=None, year=None, crime=None):
        df = self.search_flexible(district=district, year=year, crime=crime)
        return {
            "total_records": len(df),
            "districts": df["District_Name"].nunique() if len(df) > 0 else 0,
            "crime_types": df["CrimeHead_Name"].nunique() if len(df) > 0 else 0,
            "stations": df["UnitName"].nunique() if len(df) > 0 else 0,
            "convictions": int(df["Conviction Count"].fillna(0).sum())
        }

    def monthly_trend(self, district=None, year=None, crime=None):
        df = self.search_flexible(district=district, year=year, crime=crime)
        # If year filter is not provided, default to the most common year in the filtered dataset, or 2023
        if not year and len(df) > 0:
            target_year = df["FIR_YEAR"].mode()[0]
            df_target = df[df["FIR_YEAR"] == target_year]
        else:
            df_target = df

        monthly_counts = df_target["FIR_MONTH"].value_counts().sort_index()
        
        months_map = {
            1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
            7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
        }
        
        trend = []
        for m, name in months_map.items():
            count = int(monthly_counts.get(m, 0))
            trend.append({
                "month": name,
                "cases": count
            })
        return trend

    def crime_distribution(self, district=None, year=None, crime=None):
        df = self.search_flexible(district=district, year=year, crime=crime)
        counts = df["CrimeHead_Name"].value_counts()
        top_5 = counts.head(5)
        others_count = int(counts.iloc[5:].sum()) if len(counts) > 5 else 0
        
        distribution = []
        colors = ["#2563EB", "#06B6D4", "#F59E0B", "#EF4444", "#8B5CF6", "#64748B"]
        
        for i, (name, val) in enumerate(top_5.items()):
            distribution.append({
                "name": name,
                "value": int(val),
                "color": colors[i % len(colors)]
            })
            
        if others_count > 0:
            distribution.append({
                "name": "Others",
                "value": others_count,
                "color": colors[-1]
            })
        return distribution

    def district_distribution(self, district=None, year=None, crime=None):
        df = self.search_flexible(district=district, year=year, crime=crime)
        counts = df["District_Name"].value_counts()
        top_10 = counts.head(10)
        
        distribution = []
        for name, val in top_10.items():
            distribution.append({
                "district": name,
                "cases": int(val)
            })
        return distribution

    def recent_cases(self, district=None, year=None, crime=None):
        df = self.search_flexible(district=district, year=year, crime=crime)
        tail = df.tail(6)
        recent = []
        severity_map = {
            "murder": "high",
            "rape": "high",
            "kidnapping": "high",
            "theft": "medium",
            "cheating": "medium",
            "fraud": "medium",
        }
        
        for idx, row in tail.iloc[::-1].iterrows():
            crime_val = str(row.get("CrimeHead_Name", "Unknown"))
            severity = "low"
            for k, v in severity_map.items():
                if k in crime_val.lower():
                    severity = v
                    break
                    
            status_raw = str(row.get("FIR_Stage", "Active"))
            status = "Active"
            if "investigation" in status_raw.lower():
                status = "Investigating"
            elif any(x in status_raw.lower() for x in ["traced", "closed", "convict"]):
                status = "Resolved"
                
            day = int(row.get("FIR_Day", 1) if not pd.isna(row.get("FIR_Day")) else 1)
            month_num = int(row.get("FIR_MONTH", 1) if not pd.isna(row.get("FIR_MONTH")) else 1)
            year_val = int(row.get("FIR_YEAR", 2024) if not pd.isna(row.get("FIR_YEAR")) else 2024)
            
            months_map = {
                1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
                7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
            }
            month_name = months_map.get(month_num, "Jan")
            
            recent.append({
                "id": str(idx),
                "time": f"{month_name} {day}, {year_val}",
                "type": crime_val,
                "location": str(row.get("District_Name", "Unknown")),
                "status": status,
                "severity": severity
            })
        return recent


    def _format_records(self, df):
        import numpy as np
        # Replace NaN with None so that they serialize to JSON null correctly
        return df.head(100).replace({np.nan: None}).to_dict("records")

    def search_by_district(self, district):

        if district not in self.districts:
            return []

        df = self.districts[district]

        return self._format_records(df)

    def search_by_crime(self, crime):

        if crime not in self.crimes:
            return []

        df = self.crimes[crime]

        return self._format_records(df)

    def search_by_station(self, station):

        if station not in self.stations:
            return []

        df = self.stations[station]

        return self._format_records(df)

    def search_by_year(self, year):

        if year not in self.years:
            return []

        df = self.years[year]

        return self._format_records(df)

    def search_crime_in_district(self, district, crime):

        if district not in self.districts:
            return []

        df = self.districts[district]

        result = df[
            df["CrimeHead_Name"] == crime
        ]

        return self._format_records(result)

    def search_cases(self, district, crime, year):

        if district not in self.districts:
            return []

        df = self.districts[district]

        result = df[
            (df["CrimeHead_Name"] == crime)
            &
            (df["FIR_YEAR"] == year)
        ]

        return self._format_records(result)

    def search_flexible(self, district=None, crime=None, station=None, year=None, only_convicted=False):
        df = self.df
        
        if district:
            df = df[df["District_Name"].str.contains(district, case=False, na=False)]
        if crime:
            df = df[df["CrimeHead_Name"].str.contains(crime, case=False, na=False)]
        if station:
            df = df[df["UnitName"].str.contains(station, case=False, na=False)]
        if year:
            try:
                df = df[df["FIR_YEAR"] == int(year)]
            except (ValueError, TypeError):
                pass
        if only_convicted:
            df = df[df["Conviction Count"] > 0]
            
        return df
