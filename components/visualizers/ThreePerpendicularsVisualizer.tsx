
import React from 'react';
import { Html, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ThreePerpendicularsVisualizer: React.FC = () => {
  const P: [number, number, number] = [0, 3, 0];
  const O: [number, number, number] = [0, 0, 0];
  const A: [number, number, number] = [2, 0, 2];
  
  const dirL = new THREE.Vector3(-1, 0, 1).normalize();
  const startL = new THREE.Vector3(...A).add(dirL.clone().multiplyScalar(-4));
  const endL = new THREE.Vector3(...A).add(dirL.clone().multiplyScalar(4));

  return (
    <group>
      {/* Base Plane E */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#cbd5e1" transparent opacity={0.3} />
      </mesh>
      <Html position={[-4, 0, -4]}>
        <div className="text-slate-400 font-bold text-xl opacity-50 italic">平面 E</div>
      </Html>

      {/* Line L */}
      <Line points={[startL, endL]} color="#f59e0b" lineWidth={5} />
      <Html position={endL}>
        <div className="text-amber-600 font-bold bg-white/80 px-2 rounded-full shadow-sm">直線 L</div>
      </Html>

      {/* Perpendicular 1: PO */}
      <Line points={[P, O]} color="#ef4444" lineWidth={4} />
      <Sphere position={P} args={[0.12]}><meshStandardMaterial color="#ef4444" /></Sphere>
      <Sphere position={O} args={[0.08]}><meshStandardMaterial color="#1e293b" /></Sphere>
      <Html position={P}>
        <div className="bg-red-500 text-white px-2 py-0.5 rounded shadow-lg -translate-y-8 font-bold">P</div>
      </Html>
      <Html position={O}>
        <div className="bg-slate-700 text-white px-1.5 py-0.5 rounded shadow-sm translate-y-6 text-[10px] font-bold">O</div>
      </Html>

      {/* Perpendicular 2: OA */}
      <Line points={[O, A]} color="#3b82f6" lineWidth={4} />
      <Sphere position={A} args={[0.1]}><meshStandardMaterial color="#3b82f6" /></Sphere>
      <Html position={A}>
        <div className="bg-blue-600 text-white px-2 py-0.5 rounded shadow-lg translate-x-6 font-bold">A</div>
      </Html>

      {/* Result Perpendicular 3: PA */}
      <Line points={[P, A]} color="#10b981" lineWidth={4} />
      
      {/* Labels for theorem steps */}
      <group position={[-5, 4, -2]}>
        <Html center>
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-slate-200 text-slate-800 shadow-2xl w-64">
            <h4 className="font-bold border-b border-slate-100 pb-2 mb-3 text-sm text-center uppercase tracking-widest text-slate-500">三垂線定理</h4>
            <div className="space-y-3 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <p>1. <span className="text-red-600 font-bold">PO ⊥ 平面 E</span></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <p>2. <span className="text-blue-600 font-bold">OA ⊥ 直線 L</span></p>
              </div>
              <div className="h-[1px] bg-slate-100 mx-2"></div>
              <div className="flex items-center gap-3 bg-green-50 p-2 rounded-xl border border-green-100">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-green-700 font-bold underline">則 PA ⊥ 直線 L</p>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* Right angle symbols */}
      <group position={[0, 0, 0]}>
        <Line points={[[0.3, 0, 0], [0.3, 0.3, 0], [0, 0.3, 0]]} color="#ef4444" lineWidth={2} />
      </group>
      <group position={A} rotation={[0, Math.PI / 4, 0]}>
         <Line points={[[-0.2, 0, 0], [-0.2, 0.2, 0]]} color="#10b981" lineWidth={2} />
      </group>
    </group>
  );
};

export default ThreePerpendicularsVisualizer;
