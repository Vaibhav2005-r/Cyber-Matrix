import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Network, ZoomIn, ZoomOut, Maximize, User, FileText, Phone, Car } from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';

// Mock Network Data
const mockGraphData = {
  nodes: [
    { id: 'Accused-1', name: 'Ramesh Kumar', type: 'accused', val: 20 },
    { id: 'Accused-2', name: 'Suresh Rao', type: 'accused', val: 15 },
    { id: 'FIR-1', name: 'FIR #22156', type: 'fir', val: 10 },
    { id: 'FIR-2', name: 'FIR #22157', type: 'fir', val: 10 },
    { id: 'Phone-1', name: '+91 9876543210', type: 'phone', val: 5 },
    { id: 'Phone-2', name: '+91 9988776655', type: 'phone', val: 5 },
    { id: 'Vehicle-1', name: 'KA-01-AB-1234', type: 'vehicle', val: 8 },
    { id: 'Victim-1', name: 'Anil Desai', type: 'victim', val: 5 },
  ],
  links: [
    { source: 'Accused-1', target: 'FIR-1', label: 'Named in' },
    { source: 'Accused-2', target: 'FIR-1', label: 'Named in' },
    { source: 'Accused-1', target: 'FIR-2', label: 'Named in' },
    { source: 'Accused-1', target: 'Phone-1', label: 'Owns' },
    { source: 'Accused-2', target: 'Phone-2', label: 'Owns' },
    { source: 'Accused-1', target: 'Vehicle-1', label: 'Drove' },
    { source: 'Victim-1', target: 'FIR-1', label: 'Complainant' },
    { source: 'Phone-1', target: 'Phone-2', label: 'Calls (45)' },
  ]
};

const getNodeColor = (type: string) => {
  switch (type) {
    case 'accused': return '#ef4444';
    case 'fir': return '#f59e0b';
    case 'phone': return '#8b5cf6';
    case 'vehicle': return '#10b981';
    case 'victim': return '#3b82f6';
    default: return '#cbd5e1';
  }
};

export const CriminalNetwork: React.FC = () => {
  const fgRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
    
    // Auto zoom to fit on load
    setTimeout(() => {
      fgRef.current?.zoomToFit(400, 50);
    }, 500);
  }, []);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Criminal Network Analysis</h1>
          <p className="text-sm text-muted-foreground">Discover hidden connections between accused, FIRs, and assets.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => fgRef.current?.zoom(fgRef.current.zoom() * 1.2, 400)}><ZoomIn size={16} /></Button>
          <Button variant="outline" onClick={() => fgRef.current?.zoom(fgRef.current.zoom() / 1.2, 400)}><ZoomOut size={16} /></Button>
          <Button variant="outline" onClick={() => fgRef.current?.zoomToFit(400, 50)}><Maximize size={16} /></Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        
        {/* Network Graph Container */}
        <Card className="flex-1 overflow-hidden relative border-border bg-card shadow-sm" ref={containerRef}>
          <ForceGraph2D
            ref={fgRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={mockGraphData}
            nodeLabel="name"
            nodeColor={(node: any) => getNodeColor(node.type)}
            nodeRelSize={6}
            linkColor={() => 'rgba(255,255,255,0.2)'}
            linkWidth={2}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.005}
            onNodeClick={handleNodeClick}
            backgroundColor="#0a0a0a" // dark background matching Tailwind
          />

          {/* Floating Legend */}
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur border border-border rounded-lg p-4 text-xs">
            <h4 className="font-bold mb-2">Entity Types</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Accused</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> FIR</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Victim</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Phone</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Vehicle</div>
            </div>
          </div>
        </Card>

        {/* Info Panel */}
        <Card className="w-80 overflow-y-auto border-border bg-card">
          <div className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Network className="text-primary" size={20} /> Selection Details
            </h3>
            
            {selectedNode ? (
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-muted/50 rounded-lg border border-border flex flex-col items-center text-center">
                  {selectedNode.type === 'accused' && <User size={48} className="text-red-500 mb-2" />}
                  {selectedNode.type === 'fir' && <FileText size={48} className="text-yellow-500 mb-2" />}
                  {selectedNode.type === 'phone' && <Phone size={48} className="text-purple-500 mb-2" />}
                  {selectedNode.type === 'vehicle' && <Car size={48} className="text-green-500 mb-2" />}
                  {selectedNode.type === 'victim' && <User size={48} className="text-blue-500 mb-2" />}
                  
                  <h4 className="font-bold text-xl">{selectedNode.name}</h4>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{selectedNode.type}</span>
                </div>

                <div>
                  <h5 className="text-sm font-semibold mb-2">Connections</h5>
                  <ul className="text-sm space-y-2">
                    {mockGraphData.links.filter((l: any) => l.source.id === selectedNode.id || l.target.id === selectedNode.id).map((link: any, i) => {
                      const isSource = link.source.id === selectedNode.id;
                      const targetNode = isSource ? link.target : link.source;
                      return (
                        <li key={i} className="flex justify-between items-center p-2 bg-muted/30 rounded border border-border">
                          <span>{link.label}</span>
                          <span className="font-medium">{targetNode.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Click on any node in the graph to view its connections and details.</p>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
};
