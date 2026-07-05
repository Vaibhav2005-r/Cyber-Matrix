import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Filter, Layers, MapPin } from 'lucide-react';

// Mock data for crime incidents in Karnataka
const mockIncidents = [
  { id: 1, lat: 12.9716, lng: 77.5946, type: 'Theft', severity: 'High', fir: '1B001202400142' }, // Bengaluru
  { id: 2, lat: 12.9250, lng: 77.5938, type: 'Assault', severity: 'Medium', fir: '1B001202400143' }, // Jayanagar
  { id: 3, lat: 13.0827, lng: 77.5877, type: 'Cyber Crime', severity: 'Low', fir: '1B001202400144' }, // Yelahanka
  { id: 4, lat: 12.2958, lng: 76.6394, type: 'Robbery', severity: 'High', fir: '3M014202400142' }, // Mysuru
  { id: 5, lat: 15.3647, lng: 75.1240, type: 'Fraud', severity: 'Medium', fir: '5H014202400142' }, // Hubballi
  { id: 6, lat: 12.8732, lng: 74.8436, type: 'Drug Offence', severity: 'High', fir: '4D014202400142' }, // Mangaluru
  { id: 7, lat: 15.8497, lng: 74.4977, type: 'Theft', severity: 'Low', fir: '6B014202400142' }, // Belagavi
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'High': return '#ef4444'; // destructive
    case 'Medium': return '#f59e0b'; // warning
    case 'Low': return '#3b82f6'; // primary
    default: return '#10b981';
  }
};

export const Heatmap: React.FC = () => {
  const [showPredictions, setShowPredictions] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Crime Heatmap</h1>
          <p className="text-sm text-muted-foreground">Geospatial analysis of active cases and predicted hotspots.</p>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Map Filters
          </Button>
          <Button 
            variant={showPredictions ? 'default' : 'outline'} 
            onClick={() => setShowPredictions(!showPredictions)}
            className="gap-2"
          >
            <Layers size={16} /> {showPredictions ? 'Hide Predictions' : 'Show Predictive Layer'}
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-border bg-card shadow-sm p-0 relative">
        <MapContainer center={[14.5, 76.0]} zoom={7} style={{ height: '100%', width: '100%', zIndex: 0 }}>
          {/* Dark mode map tiles */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {mockIncidents.map(incident => (
            <CircleMarker
              key={incident.id}
              center={[incident.lat, incident.lng]}
              pathOptions={{ 
                color: getSeverityColor(incident.severity), 
                fillColor: getSeverityColor(incident.severity), 
                fillOpacity: 0.6 
              }}
              radius={8}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold text-sm mb-1">{incident.type}</h3>
                  <p className="text-xs m-0">FIR: {incident.fir}</p>
                  <p className="text-xs m-0">Severity: {incident.severity}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Predictive Hotspots Layer */}
          {showPredictions && (
            <>
              <CircleMarker center={[13.0, 77.6]} pathOptions={{ color: '#8b5cf6', fillColor: '#8b5cf6', fillOpacity: 0.3 }} radius={40}>
                <Popup>Predicted Hotspot (85% confidence)</Popup>
              </CircleMarker>
              <CircleMarker center={[12.3, 76.6]} pathOptions={{ color: '#8b5cf6', fillColor: '#8b5cf6', fillOpacity: 0.3 }} radius={30}>
                <Popup>Predicted Hotspot (72% confidence)</Popup>
              </CircleMarker>
            </>
          )}
        </MapContainer>

        {/* Floating Legend */}
        <Card className="absolute bottom-6 left-6 z-[400] w-48 bg-card/90 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><MapPin size={16}/> Legend</h4>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> High Severity</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Medium Severity</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Low Severity</div>
              {showPredictions && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border"><div className="w-3 h-3 rounded-full bg-purple-500/50 border border-purple-500"></div> Predicted Hotspot</div>
              )}
            </div>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};
