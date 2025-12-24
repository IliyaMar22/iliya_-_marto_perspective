import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export default function BulgariaScene() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Zoom in animation
    if (groupRef.current) {
      gsap.fromTo(
        groupRef.current.position,
        { z: -50 },
        { z: 0, duration: 2, ease: 'power3.inOut' }
      );
      gsap.fromTo(
        groupRef.current.scale,
        { x: 0.1, y: 0.1, z: 0.1 },
        { x: 1, y: 1, z: 1, duration: 2, ease: 'power3.inOut' }
      );
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Bulgaria map representation - will be replaced with actual GeoJSON 3D */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[15, 10, 20, 20]} />
        <meshStandardMaterial
          color="#0A1F0A"
          emissive="#D2FF00"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>

      {/* Regional markers */}
      {[
        { name: 'Sofia', pos: [0, 2, 0.5] },
        { name: 'Plovdiv', pos: [-1, -1, 0.5] },
        { name: 'Varna', pos: [3, 1, 0.5] },
        { name: 'Burgas', pos: [2, -2, 0.5] },
      ].map((region, i) => (
        <mesh key={i} position={region.pos as [number, number, number]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#D2FF00" emissive="#D2FF00" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

