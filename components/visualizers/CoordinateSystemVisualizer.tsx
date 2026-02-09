import React from 'react';
import { Html, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;

const CoordinateSystemVisualizer: React.FC = () => {
  // point = [x, y, z]
  const point: [number, number, number] = [3, 4, 2];

  return (
    <Group>
      {/* Axes: Red (X), Green (Y), Blue (Z) */}
      <Line points={[[-1, 0, 0], [6, 0, 0]]} color="#ef4444" lineWidth={3} />
      <Line points={[[0, -1, 0], [0, 6, 0]]} color="#22c55e" lineWidth={3} />
      <Line points={[[0, 0, -1], [0, 0, 6]]} color="#3b82f6" lineWidth={3} />

      <Sphere position={point} args={[0.15]}><MeshStandardMaterial color="#1e293b" /></Sphere>
      
      {/* Projections */}
      <Line points={[point, [3, 4, 0]]} color="#94a3b8" lineWidth={1} dashed dashScale={15} /> {/* to XY */}
      <Line points={[point, [3, 0, 2]]} color="#94a3b8" lineWidth={1} dashed dashScale={15} /> {/* to XZ */}
      <Line points={[point, [0, 4, 2]]} color="#94a3b8" lineWidth={1} dashed dashScale={15} /> {/* to YZ */}

      <Mesh position={[1.5, 2, 1]}>
        <BoxGeometry args={[3, 4, 2]} />
        <MeshStandardMaterial color="#6366f1" transparent opacity={0.05} />
      </Mesh>

      {/* Redesigned Horizontal Info Panel */}
      <Group position={[0, 4.5, 0]}>
        <Html center>
          <div className="bg-white/90 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/50 shadow-[0_30px_60px_rgba(0,0,0,0.12)] w-[640px] max-w-[95vw] select-none flex flex-col md:flex-row gap-6 items-stretch overflow-hidden">
            
            <div className="flex-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <h4 className="font-black text-slate-800 text-lg tracking-tight">空間點坐標</h4>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">Point Projection</p>
            </div>

            <div className="flex-[2] flex items-center justify-around gap-4 md:pl-4">
              <div className="text-center">
                <span className="block text-[10px] font-black text-red-400 mb-1">X-Coord</span>
                <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100 text-red-700 font-mono font-black">{point[0]}</div>
              </div>
              <div className="text-center">
                <span className="block text-[10px] font-black text-green-400 mb-1">Y-Coord</span>
                <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100 text-green-700 font-mono font-black">{point[1]}</div>
              </div>
              <div className="text-center">
                <span className="block text-[10px] font-black text-blue-400 mb-1">Z-Coord</span>
                <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 text-blue-700 font-mono font-black">{point[2]}</div>
              </div>
              <div className="h-12 w-[1px] bg-slate-100" />
              <div className="text-center">
                <span className="block text-[10px] font-black text-slate-400 mb-1">P (x, y, z)</span>
                <div className="bg-slate-800 px-4 py-2 rounded-xl text-white font-mono font-black shadow-lg">({point[0]}, {point[1]}, {point[2]})</div>
              </div>
            </div>
          </div>
        </Html>
      </Group>
    </Group>
  );
};

export default CoordinateSystemVisualizer;