import { useState } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ShieldAlert, UserCheck } from 'lucide-react';

// Pre-defined node types
const initialNodesKariya: Node[] = [
  {
    id: 'syndicate',
    type: 'default',
    data: { label: '🎯 Kariya Theft Syndicate' },
    position: { x: 250, y: 150 },
    style: { background: '#0F172A', color: '#F8FAFC', border: '2px solid #EF4444', borderRadius: '12px', padding: '10px', fontWeight: 'bold', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' }
  },
  {
    id: 'suspect1',
    type: 'default',
    data: { label: '👤 Kariya (Kingpin)' },
    position: { x: 100, y: 50 },
    style: { background: '#1E293B', color: '#EF4444', border: '1px solid #EF4444/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  },
  {
    id: 'suspect2',
    type: 'default',
    data: { label: '👤 Manju (Associate)' },
    position: { x: 400, y: 50 },
    style: { background: '#1E293B', color: '#F59E0B', border: '1px solid #F59E0B/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  },
  {
    id: 'case1',
    type: 'default',
    data: { label: '📄 FIR 189/2018 (House Theft)' },
    position: { x: 50, y: 250 },
    style: { background: '#1E293B', color: '#38BDF8', border: '1px solid #2563EB/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  },
  {
    id: 'case2',
    type: 'default',
    data: { label: '📄 FIR 255/2018 (House Theft)' },
    position: { x: 250, y: 280 },
    style: { background: '#1E293B', color: '#38BDF8', border: '1px solid #2563EB/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  },
  {
    id: 'case3',
    type: 'default',
    data: { label: '📄 FIR 603/2021 (House Theft)' },
    position: { x: 450, y: 250 },
    style: { background: '#1E293B', color: '#38BDF8', border: '1px solid #2563EB/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  },
  {
    id: 'ps',
    type: 'default',
    data: { label: '🏢 Mudhol Police Station' },
    position: { x: 250, y: 400 },
    style: { background: '#1E293B', color: '#C084FC', border: '1px solid #8B5CF6/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  }
];

const initialEdgesKariya: Edge[] = [
  { id: 'e1', source: 'syndicate', target: 'suspect1', animated: true, style: { stroke: '#EF4444' } },
  { id: 'e2', source: 'syndicate', target: 'suspect2', animated: true, style: { stroke: '#F59E0B' } },
  { id: 'e3', source: 'syndicate', target: 'case1', style: { stroke: '#38BDF8' } },
  { id: 'e4', source: 'syndicate', target: 'case2', style: { stroke: '#38BDF8' } },
  { id: 'e5', source: 'syndicate', target: 'case3', style: { stroke: '#38BDF8' } },
  { id: 'e6', source: 'case1', target: 'ps', style: { stroke: '#C084FC', strokeDasharray: '5 5' } },
  { id: 'e7', source: 'case2', target: 'ps', style: { stroke: '#C084FC', strokeDasharray: '5 5' } },
  { id: 'e8', source: 'case3', target: 'ps', style: { stroke: '#C084FC', strokeDasharray: '5 5' } }
];

const initialNodesCyber: Node[] = [
  {
    id: 'syndicate',
    type: 'default',
    data: { label: '🎯 Bengaluru Phishing Ring' },
    position: { x: 250, y: 150 },
    style: { background: '#0F172A', color: '#F8FAFC', border: '2px solid #06B6D4', borderRadius: '12px', padding: '10px', fontWeight: 'bold', boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)' }
  },
  {
    id: 'suspect1',
    type: 'default',
    data: { label: '👤 Sagar (Operator)' },
    position: { x: 100, y: 50 },
    style: { background: '#1E293B', color: '#06B6D4', border: '1px solid #06B6D4/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  },
  {
    id: 'suspect2',
    type: 'default',
    data: { label: '👤 Ramesh (Mule Acct Provider)' },
    position: { x: 400, y: 50 },
    style: { background: '#1E293B', color: '#F59E0B', border: '1px solid #F59E0B/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  },
  {
    id: 'case1',
    type: 'default',
    data: { label: '📄 FIR 12/2023 (Cyber Fraud)' },
    position: { x: 150, y: 280 },
    style: { background: '#1E293B', color: '#38BDF8', border: '1px solid #2563EB/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  },
  {
    id: 'ps',
    type: 'default',
    data: { label: '🏢 CEN Police Station (Blr)' },
    position: { x: 250, y: 400 },
    style: { background: '#1E293B', color: '#C084FC', border: '1px solid #8B5CF6/30', borderRadius: '8px', padding: '8px', fontSize: '12px' }
  }
];

const initialEdgesCyber: Edge[] = [
  { id: 'e1', source: 'syndicate', target: 'suspect1', animated: true, style: { stroke: '#06B6D4' } },
  { id: 'e2', source: 'syndicate', target: 'suspect2', animated: true, style: { stroke: '#F59E0B' } },
  { id: 'e3', source: 'syndicate', target: 'case1', style: { stroke: '#38BDF8' } },
  { id: 'e4', source: 'case1', target: 'ps', style: { stroke: '#C084FC', strokeDasharray: '5 5' } }
];

export default function Network() {
  const [nodes, setNodes] = useState<Node[]>(initialNodesKariya);
  const [edges, setEdges] = useState<Edge[]>(initialEdgesKariya);
  const [selectedSyndicate, setSelectedSyndicate] = useState('kariya');
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<any>(null);

  const handleSelectSyndicate = (type: string) => {
    setSelectedSyndicate(type);
    setSelectedNodeDetails(null);
    if (type === 'kariya') {
      setNodes(initialNodesKariya);
      setEdges(initialEdgesKariya);
    } else {
      setNodes(initialNodesCyber);
      setEdges(initialEdgesCyber);
    }
  };

  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    // Populate details panel depending on node clicked
    if (node.id === 'syndicate') {
      setSelectedNodeDetails({
        title: node.data.label,
        type: 'Criminal Ring',
        status: 'Active Surveillence',
        desc: 'Organized crime operation targeting house burglaries and digital infrastructure vulnerabilities.'
      });
    } else if (node.id.startsWith('suspect')) {
      setSelectedNodeDetails({
        title: node.data.label,
        type: 'Accused Suspect',
        status: 'Wanted / Under Investigation',
        desc: 'Suspected operations lead linked to multiple non-bailable warrants across North Karnataka divisions.'
      });
    } else if (node.id.startsWith('case')) {
      setSelectedNodeDetails({
        title: node.data.label,
        type: 'Active FIR Registry',
        status: 'Pending Trial / Chargesheet Filed',
        desc: 'Incidents matching burglary methods registered with fingerprints recovered from crime scenes.'
      });
    } else if (node.id === 'ps') {
      setSelectedNodeDetails({
        title: node.data.label,
        type: 'Law Enforcement Unit',
        status: 'Investigating Division',
        desc: 'Jurisdictional precinct responsible for patrolling, local reporting, and arrest warrants.'
      });
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex">
      {/* Left Sidebar - Syndicate List */}
      <div className="w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="text-rose-500 animate-pulse" size={20} />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">Linkage Suspects</h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleSelectSyndicate('kariya')}
              className={`w-full text-left p-3.5 rounded-xl border transition ${
                selectedSyndicate === 'kariya'
                  ? 'bg-rose-500/10 border-rose-500/30 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <h4 className="font-bold text-sm">Kariya House Theft Ring</h4>
              <p className="text-xs text-slate-500 mt-1">7 Nodes • Bagalkot Division</p>
            </button>

            <button
              onClick={() => handleSelectSyndicate('cyber')}
              className={`w-full text-left p-3.5 rounded-xl border transition ${
                selectedSyndicate === 'cyber'
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <h4 className="font-bold text-sm">Bengaluru Cyber Syndicate</h4>
              <p className="text-xs text-slate-500 mt-1">5 Nodes • CEN Division</p>
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-center text-xs text-slate-500">
          Click nodes in the network graph to inspect entity intelligence details.
        </div>
      </div>

      {/* Network Graph Area */}
      <div className="flex-1 relative bg-slate-950">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.5}
          maxZoom={1.5}
        >
          <Background color="#334155" gap={16} size={1} />
          <Controls className="bg-slate-900 border border-slate-800 text-slate-200 fill-slate-200 rounded-lg p-1" />
          <MiniMap 
            nodeColor={(node) => {
              if (node.id === 'syndicate') return '#EF4444';
              if (node.id.startsWith('suspect')) return '#F59E0B';
              return '#2563EB';
            }}
            maskColor="rgba(2, 6, 23, 0.7)"
            style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '8px' }}
          />
        </ReactFlow>
      </div>

      {/* Right Sidebar - Node Details Panel */}
      {selectedNodeDetails && (
        <div className="w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <UserCheck className="text-blue-400" size={18} />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Node Intelligence</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">{selectedNodeDetails.type}</div>
                <h4 className="text-base font-bold text-white mt-1">{selectedNodeDetails.title}</h4>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Operational Status</div>
                <div className="text-xs font-semibold text-rose-400 mt-1 uppercase tracking-wider">
                  {selectedNodeDetails.status}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Surveillence Details</div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedNodeDetails.desc}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedNodeDetails(null)}
            className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 font-semibold py-2.5 rounded-xl text-xs uppercase tracking-wider transition"
          >
            Close Panel
          </button>
        </div>
      )}
    </div>
  );
}
