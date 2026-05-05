'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { EVACUATION_CENTERS, CEBU_CENTER, getRiskLevelColor } from '@/lib/evacuation-data';

interface EvacuationMarkerProps {
  center: typeof EVACUATION_CENTERS[0];
  onClick?: (centerId: string) => void;
}

const EvacuationMarker: React.FC<EvacuationMarkerProps> = ({ center, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
      const scale = isHovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  // Convert latitude/longitude to 3D coordinates
  // Scale down to fit in a reasonable 3D space
  const x = (center.longitude - CEBU_CENTER.longitude) * 100;
  const z = (center.latitude - CEBU_CENTER.latitude) * 100;
  const y = 0;

  const color = getRiskLevelColor(center.riskLevel);

  return (
    <group position={[x, y, z]}>
      {/* Pulsing ring for high/flooded risk */}
      {(center.riskLevel === 'high' || center.riskLevel === 'flooded') && (
        <mesh>
          <ringGeometry args={[0.8, 1, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Main marker sphere */}
      <mesh
        ref={meshRef}
        onClick={() => onClick?.(center.id)}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        castShadow
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 1 : 0.4}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>

      {/* Label on hover */}
      {isHovered && (
        <Html position={[0, 1.5, 0]} center>
          <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-xs font-semibold text-foreground whitespace-nowrap pointer-events-none">
            {center.name}
          </div>
        </Html>
      )}
    </group>
  );
};

const CebuMapBase: React.FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Set optimal camera position
    camera.position.set(5, 8, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};

interface Cebu3DMapProps {
  selectedCenterId?: string;
  onSelectCenter?: (centerId: string) => void;
}

export const Cebu3DMap: React.FC<Cebu3DMapProps> = ({
  selectedCenterId,
  onSelectCenter
}) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 relative">
      <Canvas
        camera={{ position: [5, 8, 5], fov: 75 }}
        shadows
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, 5]} intensity={0.3} />

        {/* Background grid plane */}
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#e8f5bd" />
        </mesh>

        {/* Grid lines for reference */}
        <lineSegments>
          <bufferGeometry>
            {(() => {
              const points = [];
              const size = 50;
              const divisions = 20;
              const step = size / divisions;

              for (let i = -size / 2; i <= size / 2; i += step) {
                // Vertical lines
                points.push(i, 0, -size / 2);
                points.push(i, 0, size / 2);
                // Horizontal lines
                points.push(-size / 2, 0, i);
                points.push(size / 2, 0, i);
              }

              return <bufferAttribute
                attach="attributes-position"
                count={points.length / 3}
                array={new Float32Array(points)}
                itemSize={3}
              />;
            })()}
          </bufferGeometry>
          <lineBasicMaterial color="#a2cb8b" opacity={0.3} transparent />
        </lineSegments>

        {/* Evacuation Centers as markers */}
        {EVACUATION_CENTERS.map((center) => (
          <EvacuationMarker
            key={center.id}
            center={center}
            onClick={onSelectCenter}
          />
        ))}

        {/* Map base component */}
        <CebuMapBase />

        {/* Controls */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enableZoom
          enablePan
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>

      {/* Instructions overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm text-foreground shadow-lg">
        <p className="font-semibold mb-2">Cebu City Evacuation Map</p>
        <ul className="text-xs space-y-1 opacity-75">
          <li>• Drag to rotate • Scroll to zoom</li>
          <li>• Click marker for details</li>
        </ul>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs text-foreground shadow-lg">
        <p className="font-semibold mb-2">Risk Levels</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5B7E3C' }} />
            <span>Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#A2CB8B' }} />
            <span>Moderate Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C44545' }} />
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#080616' }} />
            <span>Flooded</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cebu3DMap;
