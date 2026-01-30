import React, { useMemo } from 'react';
import { Html, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Define intrinsic elements as local constants to bypass JSX type checking issues
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;

const PlaneIntersectionsVisualizer: React.FC = () => {
  const y_int = 3;   // Physical Red -> Label Y
  const z_int = 4;   // Physical Green -> Label Z
  const x_int = 2.5; // Physical Blue -> Label X

  const pA: [number, number, number] = [y_int, 0, 0];
  const pB: [number, number, number] = [0, z_int, 0];
  const pC: [number, number, number] = [0, 0, x_int];

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
    <Group>
      {/* Axes */}
      <Line points={[[-1, 0, 0], [6, 0, 0]]} color="#ef4444" lineWidth={3} />
      <Line points={[[0, -1, 0], [0, 6, 0]]} color="#22c55e" lineWidth={3} />
      <Line points={[[0, 0, -1], [0, 0, 6]]} color="#3b82f6" lineWidth={3} />

      {/* Intercept Points */}
      <Sphere position={pA} args={[0.15]}>
        <MeshBasicMaterial color="#dc2626" />
      </Sphere>
      <Html position={pA} center>
        <div className="text-red-700 font-bold bg-white/90 px-3 py-1 rounded-full shadow-lg border border-red-200 translate-y-8 whitespace-nowrap font-mono">
          y={y_int} (0, {y_int}, 0)
        </div>
      </Html>

      <Sphere position={pB} args={[0.15]}>
        <MeshBasicMaterial color="#16a34a" />
      </Sphere>
      <Html position={pB} center>
        <div className="text-green-700 font-bold bg-white/90 px-3 py-1 rounded-full shadow-lg border border-green-200 -translate-x-20 whitespace-nowrap font-mono">
          z={z_int} (0, 0, {z_int})
        </div>
      </Html>

      <Sphere position={pC} args={[0.15]}>
        <MeshBasicMaterial color="#2563eb" />
      </Sphere>
      <Html position={pC} center>
        <div className="text-blue-700 font-bold bg-white/90 px-3 py-1 rounded-full shadow-lg border border-blue-200 translate-x-16 translate-z-4 whitespace-nowrap font-mono">
          x={x_int} ({x_int}, 0, 0)
        </div>
      </Html>

      <Mesh>
        <BufferGeometry>
          <BufferAttribute
            attach="attributes-position"
            array={positions}
            count={3}
            itemSize={3}
          />
        </BufferGeometry>
        <MeshStandardMaterial color="#8b5cf6" transparent opacity={0.4} side={THREE.DoubleSide} />
      </Mesh>

      <Line points={[pA, pB]} color="#7c3aed" lineWidth={2} />
      <Line points={[pB, pC]} color="#7c3aed" lineWidth={2} />
      <Line points={[pC, pA]} color="#7c3aed" lineWidth={2} />

      {/* Equation Label: Logical (X, Y, Z) order */}
      <Group position={[4.5, 5, 4.5]}>
        <Html center>
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200 shadow-2xl min-w-[320px]">
            <h4 className="text-xs font-black text-slate-400 mb-6 text-center uppercase tracking-[0.2em]">截距式平面方程式</h4>
            <div className="flex items-center justify-center text-3xl font-serif text-slate-800">
              <Fraction numerator={<span className="text-blue-600 italic">x</span>} denominator={x_int} />
              <span className="mx-3 text-slate-300 font-light">+</span>
              <Fraction numerator={<span className="text-red-500 italic">y</span>} denominator={y_int} />
              <span className="mx-3 text-slate-300 font-light">+</span>
              <Fraction numerator={<span className="text-green-600 italic">z</span>} denominator={z_int} />
              <span className="ml-4 text-slate-600">= 1</span>
            </div>
          </div>
        </Html>
      </Group>
    </Group>
  );
};

export default PlaneIntersectionsVisualizer;