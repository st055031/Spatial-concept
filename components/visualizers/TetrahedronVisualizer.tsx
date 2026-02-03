import React from 'react';
import { Html, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Define intrinsic elements as local constants to bypass JSX type checking issues
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;

const TetrahedronVisualizer: React.FC = () => {
  const s = 1.5;
  const vertices: [number, number, number][] = [
    [s, s, s],
    [s, -s, -s],
    [-s, s, -s],
    [-s, -s, s],
  ];

  const edges = [
    [vertices[0], vertices[1]],
    [vertices[0], vertices[2]],
    [vertices[0], vertices[3]],
    [vertices[1], vertices[2]],
    [vertices[1], vertices[3]],
    [vertices[2], vertices[3]],
  ];

  const baseCenter = new THREE.Vector3().addVectors(
    new THREE.Vector3(...vertices[1]),
    new THREE.Vector3(...vertices[2])
  ).add(new THREE.Vector3(...vertices[3])).divideScalar(3);

  const apex = new THREE.Vector3(...vertices[0]);
  const mid01 = new THREE.Vector3().addVectors(new THREE.Vector3(...vertices[0]), new THREE.Vector3(...vertices[1])).divideScalar(2);
  const mid23 = new THREE.Vector3().addVectors(new THREE.Vector3(...vertices[2]), new THREE.Vector3(...vertices[3])).divideScalar(2);

  return (
    /* Fix: use Group constant for intrinsic element */
    <Group>
      {/* Edges */}
      {edges.map((edge, i) => (
        <Line key={i} points={[edge[0], edge[1]]} color="#4f46e5" lineWidth={4} />
      ))}

      {/* Vertices */}
      {vertices.map((v, i) => (
        /* Fix: use Group constant for intrinsic element */
        <Group key={i} position={v}>
          <Sphere args={[0.08, 16, 16]}>
            {/* Fix: use MeshStandardMaterial constant for intrinsic element */}
            <MeshStandardMaterial color="#1e293b" />
          </Sphere>
          <Html distanceFactor={10} position={[0.2, 0.2, 0]}>
            <div className="text-slate-900 font-bold bg-white/80 px-1 rounded text-xs shadow-sm">V{i}</div>
          </Html>
        </Group>
      ))}

      {/* Height */}
      <Line points={[apex, baseCenter]} color="#ef4444" lineWidth={3} dashed dashScale={10} />
      <Html position={apex.clone().lerp(baseCenter, 0.5)}>
        <div className="bg-red-500 text-white text-[10px] px-2 py-1 rounded shadow-md font-bold whitespace-nowrap">高 Height</div>
      </Html>

      {/* Skew lines distance */}
      <Line points={[mid01, mid23]} color="#10b981" lineWidth={3} dashed dashScale={10} />
      <Html position={mid01.clone().lerp(mid23, 0.5)}>
        <div className="bg-green-600 text-white text-[10px] px-2 py-1 rounded shadow-md font-bold whitespace-nowrap">歪斜線距離 Skew Distance</div>
      </Html>

      {/* Dihedral angle indicator */}
      <Sphere position={mid01} args={[0.06]}>
        {/* Fix: use MeshBasicMaterial constant for intrinsic element */}
        <MeshBasicMaterial color="#f59e0b" />
      </Sphere>
      <Html position={mid01.clone().add(new THREE.Vector3(0, 0.6, 0))}>
        <div className="bg-amber-500 text-white text-[10px] px-2 py-1 rounded shadow-md font-bold whitespace-nowrap">兩面角 Dihedral Angle</div>
      </Html>
      
      {/* Semi-transparent faces */}
      {/* Fix: use Mesh constant for intrinsic element */}
      <Mesh>
        {/* Fix: use BufferGeometry constant for intrinsic element */}
        <BufferGeometry attach="geometry">
          {/* Fix: use BufferAttribute constant for intrinsic element */}
          <BufferAttribute
            attach="attributes-position"
            array={new Float32Array([
              ...vertices[1], ...vertices[2], ...vertices[3], // base
              ...vertices[0], ...vertices[1], ...vertices[2],
              ...vertices[0], ...vertices[2], ...vertices[3],
              ...vertices[0], ...vertices[3], ...vertices[1],
            ])}
            count={12}
            itemSize={3}
          />
        </BufferGeometry>
        {/* Fix: use MeshStandardMaterial constant for intrinsic element */}
        <MeshStandardMaterial color="#6366f1" transparent opacity={0.15} side={THREE.DoubleSide} />
      </Mesh>
    </Group>
  );
};

export default TetrahedronVisualizer;