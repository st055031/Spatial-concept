import React from 'react';
import { Html, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Define intrinsic elements as local constants to bypass JSX type checking issues
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;

const CoordinateSystemVisualizer: React.FC = () => {
  // Physical coordinates [Red:2, Green:3, Blue:2]
  // Mapping: Red->Y, Green->Z, Blue->X
  // So logical (x, y, z) = (2, 2, 3)
  const point: [number, number, number] = [2, 3, 2];

  return (
    <Group>
      {/* Axes */}
      <Line points={[[-1, 0, 0], [6, 0, 0]]} color="#ef4444" lineWidth={4} /> {/* Physical X -> Y */}
      <Line points={[[0, -1, 0], [0, 6, 0]]} color="#22c55e" lineWidth={4} /> {/* Physical Y -> Z */}
      <Line points={[[0, 0, -1], [0, 0, 6]]} color="#3b82f6" lineWidth={4} /> {/* Physical Z -> X */}

      <Html position={[6.5, 0, 0]}><div className="text-red-600 font-bold text-lg">Y</div></Html>
      <Html position={[0, 6.5, 0]}><div className="text-green-600 font-bold text-lg">Z</div></Html>
      <Html position={[0, 0, 6.5]}><div className="text-blue-600 font-bold text-lg">X</div></Html>

      {/* Point P(x, y, z) */}
      <Sphere position={point} args={[0.15]}>
        <MeshStandardMaterial color="#1e293b" />
      </Sphere>
      <Html position={point} center>
        <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl shadow-2xl border border-indigo-400 text-sm font-bold -translate-y-16 whitespace-nowrap scale-110 font-mono">
          P (x:2, y:2, z:3)
        </div>
      </Html>

      {/* Projection lines */}
      <Line points={[point, [2, 3, 0]]} color="#94a3b8" lineWidth={1.5} dashed dashScale={10} />
      <Line points={[point, [2, 0, 2]]} color="#94a3b8" lineWidth={1.5} dashed dashScale={10} />
      <Line points={[point, [0, 3, 2]]} color="#94a3b8" lineWidth={1.5} dashed dashScale={10} />

      {/* Semi-transparent reference cube */}
      <Mesh position={[1, 1.5, 1]}>
        <BoxGeometry args={[2, 3, 2]} />
        <MeshStandardMaterial color="#6366f1" transparent opacity={0.1} />
      </Mesh>

      {/* Component labels reflecting swapped names */}
      <Html position={[2, -0.5, 0]} center>
        <div className="text-red-600 font-mono text-xs bg-white/90 px-2 py-0.5 rounded shadow-sm border border-red-100 font-bold">y = 2</div>
      </Html>
      <Html position={[-0.8, 3, 0]} center>
        <div className="text-green-700 font-mono text-xs bg-white/90 px-2 py-0.5 rounded shadow-sm border border-green-100 font-bold">z = 3</div>
      </Html>
      <Html position={[0, -0.5, 2]} center>
        <div className="text-blue-600 font-mono text-xs bg-white/90 px-2 py-0.5 rounded shadow-sm border border-blue-100 font-bold">x = 2</div>
      </Html>
    </Group>
  );
};

export default CoordinateSystemVisualizer;