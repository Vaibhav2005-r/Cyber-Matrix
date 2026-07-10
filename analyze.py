import pandas as pd
import json

def analyze():
    print("Loading dataset...")
    df = pd.read_csv("backend/data/FIR_Details_Data.csv", low_memory=False)
    
    print("Computing stats...")
    stats = {}
    
    stats['total_rows'] = len(df)
    stats['total_columns'] = len(df.columns)
    stats['columns'] = list(df.columns)
    
    # Missing values percentage
    missing = (df.isnull().sum() / len(df) * 100).round(2).to_dict()
    stats['missing_values'] = missing
    
    # Top 10 districts
    if 'District_Name' in df.columns:
        stats['top_districts'] = df['District_Name'].value_counts().head(10).to_dict()
        
    # Top 10 crimes
    if 'CrimeHead_Name' in df.columns:
        stats['top_crimes'] = df['CrimeHead_Name'].value_counts().head(10).to_dict()
        
    # Top 10 crime groups
    if 'CrimeGroup_Name' in df.columns:
        stats['top_crime_groups'] = df['CrimeGroup_Name'].value_counts().head(10).to_dict()
        
    # Cases by year
    if 'FIR_YEAR' in df.columns:
        stats['cases_by_year'] = df['FIR_YEAR'].value_counts().sort_index().to_dict()
        
    # FIR Stages
    if 'FIR_Stage' in df.columns:
        stats['fir_stages'] = df['FIR_Stage'].value_counts().head(10).to_dict()
        
    # Convictions
    if 'Conviction Count' in df.columns:
        stats['total_convictions'] = float(df['Conviction Count'].fillna(0).sum())
        
    # Memory usage (in MB)
    stats['memory_usage_mb'] = float(df.memory_usage(deep=True).sum() / (1024 * 1024))
    
    print("Writing results to analysis.json...")
    with open('analysis.json', 'w') as f:
        json.dump(stats, f, indent=4)
        
    print("Done!")

if __name__ == "__main__":
    analyze()
