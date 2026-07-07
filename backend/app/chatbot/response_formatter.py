class ResponseFormatter:

    @staticmethod
    def format(records):
        if not records:
            return {
                "summary": "No matching records found.",
                "count": 0,
                "records": []
            }
        return {
            "summary": f"{len(records)} records found.",
            "count": len(records),
            "records": records
        }

    @staticmethod
    def format_with_context(df_filtered, context, query):
        count = len(df_filtered)
        
        # Limit records to top 100
        df_head = df_filtered.head(100)
        
        import numpy as np
        # Replace nan with None for JSON compliance
        records = df_head.replace({np.nan: None}).to_dict("records")
        
        if count == 0:
            summary = "I couldn't find any matching crime records based on your search criteria. Try modifying your filters or typing 'reset' to start over."
            suggestions = [
                "Show overall statistics",
                "Show cases in Bengaluru City",
                "Show theft cases in Bagalkot"
            ]
            return {
                "summary": summary,
                "count": 0,
                "records": [],
                "context": context,
                "suggestions": suggestions
            }
            
        # Extract filters for the summary
        district = context.get("district")
        crime = context.get("crime")
        year = context.get("year")
        station = context.get("station")
        only_convicted = context.get("only_convicted")
        
        filters = []
        if only_convicted:
            filters.append("convicted")
            
        if crime:
            filters.append(f"{crime} cases")
        else:
            filters.append("cases")
            
        if district:
            filters.append(f"in {district}")
            
        if station:
            filters.append(f"at {station}")
            
        if year:
            filters.append(f"during {year}")
            
        filter_desc = " ".join(filters)
        
        # Calculate statistics
        # Use sum on numeric columns (handle missing columns safely)
        total_arrested = 0
        if "Arrested Count\tNo." in df_filtered.columns:
            total_arrested = int(df_filtered["Arrested Count\tNo."].fillna(0).sum())
            
        total_convictions = 0
        if "Conviction Count" in df_filtered.columns:
            total_convictions = int(df_filtered["Conviction Count"].fillna(0).sum())
            
        top_station = None
        if "UnitName" in df_filtered.columns and not station:
            stations = df_filtered["UnitName"].dropna()
            if not stations.empty:
                top_station = str(stations.mode().iloc[0])
                
        # Generate summary string
        summary = f"I found **{count:,}** {filter_desc}.\n\n"
        summary += f"• **Arrests:** {total_arrested:,} individuals have been arrested in connection with these cases.\n"
        summary += f"• **Convictions:** {total_convictions:,} convictions have been recorded.\n"
        if top_station:
            summary += f"• **Primary Division:** Most cases were registered under **{top_station}**."
            
        # Generate suggested follow-up questions
        suggestions = []
        if not only_convicted and total_convictions > 0:
            suggestions.append("Show only convictions")
            
        if not year:
            suggestions.append("Filter by year 2023")
            suggestions.append("Filter by year 2022")
        else:
            try:
                suggestions.append(f"Compare with {int(year) - 1}")
            except (ValueError, TypeError):
                pass
                
        if not district and not station:
            suggestions.append("Show cases in Bengaluru City")
            suggestions.append("Show cases in Bagalkot")
            
        # Ensure we always have some suggestions
        if len(suggestions) < 3:
            suggestions.append("Show overall statistics")
            suggestions.append("Clear all filters")
            
        return {
            "summary": summary,
            "count": count,
            "records": records,
            "context": context,
            "suggestions": suggestions[:4]
        }