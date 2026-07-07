from pathlib import Path
import pandas as pd

from app.config.settings import DATASET_PATH


class DataLoader:
    """
    Singleton Data Loader
    Loads the dataset only once.
    """

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)

            cls._instance.load_data()

        return cls._instance

    def load_data(self):

        dataset = Path(__file__).resolve().parents[2] / DATASET_PATH

        print("=" * 60)
        print("Loading Crime Dataset...")
        print("=" * 60)

        self.df = pd.read_csv(dataset, low_memory=False)

        print(f"Rows Loaded : {len(self.df):,}")
        print("Building indexes...")

        self.build_indexes()

        print("Indexes Ready!")
        print("=" * 60)

    def build_indexes(self):

        df = self.df

        self.district_index = {
            district: group
            for district, group in df.groupby("District_Name")
        }

        self.crime_index = {
            crime: group
            for crime, group in df.groupby("CrimeHead_Name")
        }

        self.station_index = {
            station: group
            for station, group in df.groupby("UnitName")
        }

        self.year_index = {
            year: group
            for year, group in df.groupby("FIR_YEAR")
        }

    def dataframe(self):
        return self.df