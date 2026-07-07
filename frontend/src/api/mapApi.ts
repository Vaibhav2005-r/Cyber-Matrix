import api from "./axios";

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  district: string;
  crime: string;
  station: string;
  year: number;
}

export const getMapCoordinates = async (district?: string, crime?: string): Promise<MapPoint[]> => {
  const params: any = {};
  if (district) params.district = district;
  if (crime) params.crime = crime;
  
  const response = await api.get('/map-coordinates', { params });
  return response.data;
};
