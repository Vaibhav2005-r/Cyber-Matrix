class IntentRouter:

    def detect(self, entities):

        district = entities["district"]
        crime = entities["crime"]
        station = entities["station"]
        year = entities["year"]

        if district and crime and year:
            return "district_crime_year"

        if district and crime:
            return "district_crime"

        if station:
            return "station"

        if district:
            return "district"

        if crime:
            return "crime"

        if year:
            return "year"

        return "statistics"