import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export default function EuropeScene() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Animate entrance
    if (groupRef.current) {
      gsap.fromTo(
        groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.out' }
      );
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Europe map placeholder - will be replaced with actual 3D map */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[18, 64, 64]} />
        <meshStandardMaterial
          color="#0A1F0A"
          emissive="#D2FF00"
          emissiveIntensity={0.15}
          wireframe
        />
      </mesh>
      
      {/* Highlight Bulgaria on the map */}
      <mesh position={[5, -2, 7]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#D2FF00" emissive="#D2FF00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

