
import React from 'react';
import { Html, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const PyramidVisualizer: React.FC = () => {
  const baseSize = 2;
  const height = 3;

  const basePoints: [number, number, number][] = [
    [-baseSize, 0, -baseSize],
    [baseSize, 0, -baseSize],
    [baseSize, 0, baseSize],
    [-baseSize, 0, baseSize],
  ];

  const apex: [number, number, number] = [0, height, 0];
  const center: [number, number, number] = [0, 0, 0];

  return (
    <group>
      {/* Base Edges */}
      <Line points={[basePoints[0], basePoints[1]]} color="#334155" lineWidth={3} />
      <Line points={[basePoints[1], basePoints[2]]} color="#334155" lineWidth={3} />
      <Line points={[basePoints[2], basePoints[3]]} color="#334155" lineWidth={3} />
      <Line points={[basePoints[3], basePoints[0]]} color="#334155" lineWidth={3} />

      {/* Slant Edges */}
      {basePoints.map((p, i) => (
        <Line key={i} points={[apex, p]} color="#475569" lineWidth={3} />
      ))}

      {/* Diagonals */}
      <Line points={[basePoints[0], basePoints[2]]} color="#3b82f6" lineWidth={2} dashed dashScale={10} />
      <Line points={[basePoints[1], basePoints[3]]} color="#3b82f6" lineWidth={2} dashed dashScale={10} />

      {/* Height */}
      <Line points={[apex, center]} color="#ef4444" lineWidth={4} />
      <Html position={[0, height / 2, 0]}>
        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg font-bold">高 Height</div>
      </Html>

      {/* Diagonal intersection point */}
      <Sphere position={center} args={[0.12, 16, 16]}>
        <meshBasicMaterial color="#2563eb" />
      </Sphere>
      <Html position={[0, -0.6, 0]}>
        <div className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded shadow-md font-bold whitespace-nowrap">對角線交點 Intersection</div>
      </Html>

      {/* Transparent faces */}
      <mesh position={[0, height / 2, 0]}>
        <coneGeometry args={[baseSize * Math.sqrt(2), height, 4]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default PyramidVisualizer;
