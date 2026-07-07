import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crosshair, Layers } from 'lucide-react';
import { fetchMapCoordinates } from '@/lib/catalyst';

export const Heatmap: React.FC = () => {
  const [points, setPoints] = useState<any[]>([]);

  useEffect(() => {
    const loadPoints = async () => {
      setPoints(await fetchMapCoordinates());
    };
    loadPoints();
  }, []);

  return (
    <div className="p-6 h-[calc(100vh-2rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-mono font-bold tracking-widest mb-1 text-foreground">GEOSPATIAL_MAP</h1>
          <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">KSP • Intelligence Matrix • Module 03</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 border border-border bg-card flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <Layers size={12} /> MAP_LAYERS: TACTICAL_DARK
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-1 space-y-4 h-full flex flex-col">
          <Card className="bg-card border border-border rounded-none shadow-none flex-1">
            <CardHeader className="border-b border-border pb-3">
              <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                <Crosshair size={14} className="text-secondary"/> COORDINATE_DATA
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 overflow-y-auto">
              {points.length === 0 ? (
                <div className="text-xs font-mono text-muted-foreground animate-pulse">FETCHING_COORDINATES...</div>
              ) : (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-secondary mb-4 border-b border-border pb-2">
                    ACTIVE_NODES: {points.length}
                  </div>
                  {points.slice(0, 15).map((p, i) => (
                    <div key={i} className="text-[10px] font-mono p-2 border border-border bg-background hover:border-secondary transition-colors cursor-crosshair">
                      <div className="text-foreground font-bold">{p.crime}</div>
                      <div className="text-muted-foreground">{p.lat.toFixed(4)}, {p.lng.toFixed(4)}</div>
                      <div className="text-secondary mt-1">{p.district}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3 h-full border border-border bg-background relative overflow-hidden">
          {/* Scanline overlay effect */}
          <div className="absolute inset-0 z-[1000] pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '100% 4px'
          }}></div>
          
          <MapContainer 
            center={[15.3173, 75.7139]} 
            zoom={7} 
            className="w-full h-full"
            zoomControl={false}
          >
            {/* Dark/Tactical Mapbox or CartoDB tile layer */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {points.map((point, idx) => (
              <CircleMarker
                key={idx}
                center={[point.lat, point.lng]}
                radius={4}
                pathOptions={{ 
                  color: 'hsl(var(--secondary))', 
                  fillColor: 'hsl(var(--secondary))', 
                  fillOpacity: 0.7, 
                  weight: 1 
                }}
              >
                <Popup className="font-mono text-xs rounded-none">
                  <div className="font-bold text-secondary uppercase">{point.crime}</div>
                  <div className="text-foreground">{point.district}</div>
                  <div className="text-muted-foreground mt-1 text-[10px]">Station: {point.station}</div>
                  <div className="text-muted-foreground text-[10px]">Year: {point.year}</div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
