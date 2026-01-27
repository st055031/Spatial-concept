
import React from 'react';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

const DihedralAngleVisualizer: React.FC = () => {
  const angle = Math.PI / 3; // 60 degrees

  return (
    <group>
      {/* Intersection line (The hinge) */}
      <Line points={[[0, -3.5, 0], [0, 3.5, 0]]} color="#f59e0b" lineWidth={6} />
      <Html position={[0, 3.8, 0]}>
        <div className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">交線 Intersection Line</div>
      </Html>

      {/* Plane 1 (Static) */}
      <mesh rotation={[0, 0, 0]} position={[1.75, 0, 0]}>
        <planeGeometry args={[3.5, 7]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Plane 2 (Angled) */}
      <group rotation={[0, -angle, 0]}>
        <mesh position={[1.75, 0, 0]}>
          <planeGeometry args={[3.5, 7]} />
          <meshStandardMaterial color="#ef4444" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Angle indicator */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.4, 32, 1, 0, angle]} />
        <meshBasicMaterial color="#1e293b" side={THREE.DoubleSide} />
      </mesh>
      
      <Html position={[2, 0.8, -1.2]}>
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-slate-200 text-slate-800 text-2xl font-serif">
          θ = 60°
        </div>
      </Html>

      <Html position={[3.5, 0, 0]}>
        <div className="text-blue-600 font-black text-xl italic opacity-70">E1</div>
      </Html>
      <Html position={[3.5 * Math.cos(angle), 0, -3.5 * Math.sin(angle)]}>
        <div className="text-red-600 font-black text-xl italic opacity-70">E2</div>
      </Html>
    </group>
  );
};

export default DihedralAngleVisualizer;
