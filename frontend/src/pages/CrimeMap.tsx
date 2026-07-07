import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getMapCoordinates } from '../api/mapApi';
import type { MapPoint } from '../api/mapApi';
import { Loader2, MapPin } from 'lucide-react';

// Bypass React-Leaflet version/JSX JSX namespace errors by casting components to 'any'
const SafeMapContainer = MapContainer as any;
const SafeTileLayer = TileLayer as any;
const SafeMarker = Marker as any;
const SafePopup = Popup as any;

// Styled Custom divIcon marker for neon glowing heatpoints
const customMarkerIcon = (color: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: ${color};" class="w-3.5 h-3.5 rounded-full border border-slate-950 shadow-[0_0_12px_2px_${color}] animate-pulse"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

// Component to dynamically adjust map center when coordinates load
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom]);
  return null;
}

export default function CrimeMap() {
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState('');
  const [crime, setCrime] = useState('');

  const commonDistricts = [
    "Bengaluru City", "Bagalkot", "Yadgir", "Mysuru Dist", "Tumakuru", "Shivamogga", "Belagavi Dist"
  ];

  const commonCrimes = [
    "Information Technology Act 2000, 2009",
    "House Theft",
    "Rape",
    "Murder(Homicide)",
    "Other Roads"
  ];

  useEffect(() => {
    setLoading(true);
    getMapCoordinates(district || undefined, crime || undefined)
      .then((data) => {
        setPoints(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [district, crime]);

  // Default center of Karnataka
  const defaultCenter: [number, number] = [15.3173, 75.7139];
  const mapCenter: [number, number] = points.length > 0 ? [points[0].lat, points[0].lng] : defaultCenter;
  const zoomLevel = district ? 11 : 7;

  return (
    <div className="h-[calc(100vh-10rem)] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
      {/* Filters Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex flex-wrap gap-4 items-center justify-between z-1000">
        <div className="flex items-center gap-2">
          <MapPin className="text-blue-500" size={20} />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Geospatial Hotspots</h2>
        </div>

        <div className="flex gap-4">
          {/* District Filter */}
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-300 focus:border-blue-500/50 outline-none transition"
          >
            <option value="">All Districts</option>
            {commonDistricts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Crime Filter */}
          <select
            value={crime}
            onChange={(e) => setCrime(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-300 focus:border-blue-500/50 outline-none transition select-wrapper"
          >
            <option value="">All Crimes</option>
            {commonCrimes.map((c) => (
              <option key={c} value={c}>
                {c.length > 25 ? c.substring(0, 25) + '...' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-900">
        {loading && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-9999 flex flex-col items-center justify-center gap-2">
            <Loader2 className="animate-spin text-blue-500" size={32} />
            <span className="text-sm font-semibold text-slate-300">Plotting coordinates from database...</span>
          </div>
        )}

        <SafeMapContainer 
          center={defaultCenter} 
          zoom={7} 
          className="h-full w-full z-10"
          style={{ background: '#020617' }}
        >
          {/* Use styled dark tiles to matches the theme */}
          <SafeTileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <ChangeView center={mapCenter} zoom={zoomLevel} />

          {points.map((p) => {
            // Pick color based on crime type
            let color = '#06B6D4'; // cyan (cyber)
            if (p.crime.toLowerCase().includes('theft')) color = '#2563EB'; // blue
            if (p.crime.toLowerCase().includes('rape')) color = '#EF4444'; // red
            if (p.crime.toLowerCase().includes('murder')) color = '#EF4444'; // red

            return (
              <SafeMarker 
                key={p.id} 
                position={[p.lat, p.lng]} 
                icon={customMarkerIcon(color)}
              >
                <SafePopup className="custom-popup">
                  <div className="p-1 font-sans text-xs text-slate-800">
                    <div className="font-bold text-slate-950 border-b pb-1 mb-1">
                      {p.crime}
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1 text-[10px]">
                      <div><strong>District:</strong> {p.district}</div>
                      <div><strong>Year:</strong> {p.year}</div>
                      <div className="col-span-2"><strong>Station:</strong> {p.station}</div>
                    </div>
                  </div>
                </SafePopup>
              </SafeMarker>
            );
          })}
        </SafeMapContainer>
      </div>
    </div>
  );
}
