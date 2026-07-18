import React, { useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Activity, Filter, ZoomIn, ZoomOut, Maximize, Share2 } from 'lucide-react';
import { fetchCriminalNetwork, submitAction } from '@/lib/catalyst';
import { toast } from 'sonner';

export const CriminalNetwork: React.FC = () => {
  const fgRef = useRef<any>(null);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [data, setData] = useState<any>({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('graph-container');
      if (container) {
        setWindowSize({ width: container.clientWidth, height: container.clientHeight });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadGraph = async () => {
      setIsLoading(true);
      const networkData = await fetchCriminalNetwork();
      // Add labels or values if needed, our mock already includes them
      setData(networkData);
      setIsLoading(false);
    };
    loadGraph();
  }, []);

  return (
    <div className="p-6 h-[calc(100vh-2rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-mono font-bold tracking-widest mb-1 text-foreground">CRIMINAL_NETWORK_GRAPH</h1>
          <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">KSP • Intelligence Matrix • Module 05</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 border border-border bg-card flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <Activity size={12} className="text-secondary animate-pulse" /> FORCE_ENGINE_ACTIVE
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-4">
        {/* Main Graph Area */}
        <div className="col-span-3 border border-border bg-[#050505] relative overflow-hidden flex flex-col" id="graph-container">
          <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start z-10 pointer-events-none">
            <div className="text-[10px] font-mono text-muted-foreground tracking-widest bg-black/50 p-2 border border-border/50">
              <span className="text-secondary">NODES:</span> {data.nodes.length} | <span className="text-secondary">EDGES:</span> {data.links.length}
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <button 
                className="p-2 bg-black/50 border border-border/50 hover:border-secondary text-muted-foreground transition-colors"
                onClick={() => { if(fgRef.current) fgRef.current.zoom(fgRef.current.zoom() * 1.2); }}
              ><ZoomIn size={14}/></button>
              <button 
                className="p-2 bg-black/50 border border-border/50 hover:border-secondary text-muted-foreground transition-colors"
                onClick={() => { if(fgRef.current) fgRef.current.zoom(fgRef.current.zoom() / 1.2); }}
              ><ZoomOut size={14}/></button>
              <button 
                className="p-2 bg-black/50 border border-border/50 hover:border-secondary text-muted-foreground transition-colors"
                onClick={() => { if(fgRef.current) fgRef.current.zoomToFit(400); }}
              ><Maximize size={14}/></button>
            </div>
          </div>

          <div className="flex-1 w-full h-full flex items-center justify-center">
            {isLoading ? (
              <div className="text-muted-foreground font-mono animate-pulse">COMPILING_GRAPH_DATA...</div>
            ) : (
              <ForceGraph2D
                ref={fgRef}
                width={windowSize.width}
                height={windowSize.height}
                graphData={data}
                nodeLabel="label"
                nodeColor={node => {
                  if (node.group === 1) return '#ef4444'; // Red Kingpin
                  if (node.group === 3) return '#eab308'; // Yellow FIR
                  if (node.group === 4) return '#3b82f6'; // Blue Fence
                  return '#2dd4bf'; // Teal Associate
                }}
                linkColor={() => 'rgba(255,255,255,0.1)'}
                linkWidth={link => link.value ? link.value * 0.5 : 1}
                nodeRelSize={4}
                backgroundColor="#050505"
                onNodeClick={node => setSelectedNode(node)}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={1.5}
                linkDirectionalParticleColor={() => 'rgba(45, 212, 191, 0.5)'}
                linkDirectionalParticleSpeed={0.005}
              />
            )}
          </div>
          
          {/* Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px)',
            backgroundSize: '100% 4px'
          }}></div>
        </div>

        {/* Side Panel */}
        <div className="col-span-1 flex flex-col space-y-4">
          <Card className="bg-card border border-border rounded-none shadow-none flex-1">
            <CardHeader className="border-b border-border pb-3 bg-background">
              <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                <Network size={14} className="text-secondary"/> NODE_INSPECTOR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-6 space-y-6">
              {selectedNode ? (
                <div className="space-y-4 font-mono animate-in fade-in zoom-in-95 duration-200">
                  <div className="space-y-1 border-b border-border pb-4">
                    <div className="text-[10px] text-muted-foreground tracking-widest">TARGET_ID</div>
                    <div className={`text-lg font-bold ${
                      selectedNode.group === 1 ? 'text-destructive' :
                      selectedNode.group === 3 ? 'text-amber-500' :
                      'text-secondary'
                    }`}>
                      {selectedNode.id}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-[10px] text-muted-foreground tracking-widest">CLASSIFICATION</div>
                    <div className="p-2 border border-border bg-background text-xs">
                      {selectedNode.label || selectedNode.type || 'UNKNOWN'}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] text-muted-foreground tracking-widest">THREAT_LEVEL</div>
                    <div className="w-full bg-background border border-border h-4 relative overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 bottom-0 ${
                          selectedNode.group === 1 ? 'bg-destructive/50' : 'bg-secondary/50'
                        }`} 
                        style={{ width: `${(selectedNode.val || 10) * 5}%` }} 
                      />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIiAvPgo8cGF0aCBkPSJNMCAwTDIgMloiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiIC8+Cjwvc3ZnPg==')] opacity-50" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex gap-2">
                    <button 
                      onClick={async () => {
                        toast.loading(`Isolating ${selectedNode.id}...`);
                        await submitAction('ISOLATE_NODE', { nodeId: selectedNode.id });
                        toast.success('Node Isolated', { description: 'Running deep connection analysis on target.' });
                      }}
                      className="flex-1 p-2 border border-border hover:border-secondary text-[10px] text-muted-foreground hover:text-secondary transition-colors uppercase bg-background flex items-center justify-center gap-2"
                    >
                      <Filter size={12}/> Isolate
                    </button>
                    <button 
                      onClick={() => toast.success('Graph Exported', { description: 'Network layout saved to workspace.' })}
                      className="flex-1 p-2 border border-border hover:border-secondary text-[10px] text-muted-foreground hover:text-secondary transition-colors uppercase bg-background flex items-center justify-center gap-2"
                    >
                      <Share2 size={12}/> Export
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-xs font-mono text-muted-foreground text-center border border-dashed border-border p-8 bg-background">
                  AWAITING_NODE_SELECTION...
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
