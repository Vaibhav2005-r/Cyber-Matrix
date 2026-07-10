import pandas as pd
import numpy as np

def impute_coordinates():
    file_path = 'backend/data/FIR_Details_Data.csv'
    print(f"Loading dataset from {file_path}...")
    df = pd.read_csv(file_path, low_memory=False)
    
    # 1. Identify valid vs invalid coordinates
    # Considering anything exactly 0.0 or NaN as invalid
    invalid_mask = df['Latitude'].isna() | df['Longitude'].isna() | (df['Latitude'] == 0) | (df['Longitude'] == 0)
    valid_mask = ~invalid_mask
    
    print(f"Valid coordinates found: {valid_mask.sum():,}")
    print(f"Invalid coordinates to impute: {invalid_mask.sum():,}")
    
    # 2. Calculate mean coordinates for each UnitName and District_Name
    # Group by UnitName
    unit_means = df[valid_mask].groupby('UnitName')[['Latitude', 'Longitude']].mean().to_dict('index')
    # Group by District_Name as fallback
    district_means = df[valid_mask].groupby('District_Name')[['Latitude', 'Longitude']].mean().to_dict('index')
    
    # Global fallback (rough center of Karnataka)
    GLOBAL_FALLBACK_LAT = 15.3173
    GLOBAL_FALLBACK_LNG = 75.7139
    
    print("Derived local centroids. Imputing and scattering...")
    
    # Extract the subset of data to modify
    invalid_df = df[invalid_mask].copy()
    
    # Fast vectorized lookup for base coordinates
    def get_base_lat(row):
        u = row['UnitName']
        if pd.notna(u) and u in unit_means:
            return unit_means[u]['Latitude']
        d = row['District_Name']
        if pd.notna(d) and d in district_means:
            return district_means[d]['Latitude']
        return GLOBAL_FALLBACK_LAT
        
    def get_base_lng(row):
        u = row['UnitName']
        if pd.notna(u) and u in unit_means:
            return unit_means[u]['Longitude']
        d = row['District_Name']
        if pd.notna(d) and d in district_means:
            return district_means[d]['Longitude']
        return GLOBAL_FALLBACK_LNG

    # Apply base coords
    base_lats = invalid_df.apply(get_base_lat, axis=1)
    base_lngs = invalid_df.apply(get_base_lng, axis=1)
    
    # 3. Add Spatial Jitter (Normal distribution, scale 0.03 ~ 3km radius)
    jitter_lat = np.random.normal(loc=0, scale=0.03, size=len(invalid_df))
    jitter_lng = np.random.normal(loc=0, scale=0.03, size=len(invalid_df))
    
    # Assign new scattered coordinates
    df.loc[invalid_mask, 'Latitude'] = base_lats + jitter_lat
    df.loc[invalid_mask, 'Longitude'] = base_lngs + jitter_lng
    
    # Round to 6 decimal places for cleanliness
    df['Latitude'] = df['Latitude'].round(6)
    df['Longitude'] = df['Longitude'].round(6)
    
    print("Saving updated dataset...")
    df.to_csv(file_path, index=False)
    print("Dataset successfully updated and saved!")

if __name__ == "__main__":
    impute_coordinates()
