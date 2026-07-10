import zipfile
import os

zip_path = 'backend/data/FIR_Details_Data.zip'
csv_path = 'backend/data/FIR_Details_Data.csv'

print(f"Compressing {csv_path}...")
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
    zf.write(csv_path, 'FIR_Details_Data.csv')
    
size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"Zip File Size: {size_mb:.2f} MB")
