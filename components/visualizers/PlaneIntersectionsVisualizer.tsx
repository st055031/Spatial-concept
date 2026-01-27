
import React, { useMemo } from 'react';
import { Html, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const PlaneIntersectionsVisualizer: React.FC = () => {
  const a = 3;
  const b = 4;
  const c = 2.5;

  const pA: [number, number, number] = [a, 0, 0];
  const pB: [number, number, number] = [0, b, 0];
  const pC: [number, number, number] = [0, 0, c];

  const positions = useMemo(() => {
    return new Float32Array([
      ...pA,
      ...pB,
      ...pC,
    ]);
  }, [pA, pB, pC]);

  const Fraction = ({ numerator, denominator, color = "text-slate-800" }: { numerator: React.ReactNode, denominator: React.ReactNode, color?: string }) => (
    <div className={`inline-flex flex-col items-center align-middle mx-1 ${color}`}>
      <span className="border-b-2 border-slate-400 px-3 leading-none pb-1">{numerator}</span>
      <span className="leading-none pt-1.5">{denominator}</span>
    </div>
  );

  return (
    <group>
      {/* Axes */}
      <Line points={[[-1, 0, 0], [6, 0, 0]]} color="#ef4444" lineWidth={3} />
      <Line points={[[0, -1, 0], [0, 6, 0]]} color="#22c55e" lineWidth={3} />
      <Line points={[[0, 0, -1], [0, 0, 6]]} color="#3b82f6" lineWidth={3} />

      {/* Intercept Points with clearly horizontal coordinate notation */}
      <Sphere position={pA} args={[0.15]}><meshBasicMaterial color="#dc2626" /></Sphere>
      <Html position={pA} center>
        <div className="text-red-700 font-bold bg-white/90 px-3 py-1 rounded-full shadow-lg border border-red-200 translate-y-8 whitespace-nowrap font-mono">
          ({a}, 0, 0)
        </div>
      </Html>

      <Sphere position={pB} args={[0.15]}><meshBasicMaterial color="#16a34a" /></Sphere>
      <Html position={pB} center>
        <div className="text-green-700 font-bold bg-white/90 px-3 py-1 rounded-full shadow-lg border border-green-200 -translate-x-20 whitespace-nowrap font-mono">
          (0, {b}, 0)
        </div>
      </Html>

      <Sphere position={pC} args={[0.15]}><meshBasicMaterial color="#2563eb" /></Sphere>
      <Html position={pC} center>
        <div className="text-blue-700 font-bold bg-white/90 px-3 py-1 rounded-full shadow-lg border border-blue-200 translate-x-16 translate-z-4 whitespace-nowrap font-mono">
          (0, 0, {c})
        </div>
      </Html>

      {/* The Plane Triangle */}
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={3}
            itemSize={3}
          />
        </bufferGeometry>
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      <Line points={[pA, pB]} color="#7c3aed" lineWidth={2} />
      <Line points={[pB, pC]} color="#7c3aed" lineWidth={2} />
      <Line points={[pC, pA]} color="#7c3aed" lineWidth={2} />

      {/* Equation Label with Vertical Fractions as per instruction 1 */}
      <group position={[4.5, 5, 4.5]}>
        <Html center>
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200 shadow-2xl min-w-[320px]">
            <h4 className="text-xs font-black text-slate-400 mb-6 text-center uppercase tracking-[0.2em]">截距式平面方程式</h4>
            <div className="flex items-center justify-center text-3xl font-serif text-slate-800">
              <Fraction numerator={<span className="text-red-500 italic">x</span>} denominator={a} />
              <span className="mx-3 text-slate-300 font-light">+</span>
              <Fraction numerator={<span className="text-green-600 italic">y</span>} denominator={b} />
              <span className="mx-3 text-slate-300 font-light">+</span>
              <Fraction numerator={<span className="text-blue-600 italic">z</span>} denominator={c} />
              <span className="ml-4 text-slate-600">= 1</span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
};

export default PlaneIntersectionsVisualizer;
