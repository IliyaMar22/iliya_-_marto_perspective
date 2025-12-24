import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

export default function RegionalDetailsScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [selectedRegion, setSelectedRegion] = useState(0);

  const regions = [
    { name: 'София (столица)', color: '#D2FF00', pos: [0, 3, 0] },
    { name: 'Пловдив', color: '#82E6FF', pos: [-3, 0, 0] },
    { name: 'Варна', color: '#FF6B9D', pos: [3, 0, 0] },
    { name: 'Бургас', color: '#FFB800', pos: [0, -3, 0] },
  ];

  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(
        groupRef.current.position,
        { z: -30 },
        { z: 0, duration: 1.5, ease: 'power2.out' }
      );
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {regions.map((region, i) => (
        <group key={i} position={region.pos as [number, number, number]}>
          <mesh
            onClick={() => setSelectedRegion(i)}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
            }}
          >
            <cylinderGeometry args={[0.5, 0.8, 2, 32]} />
            <meshStandardMaterial
              color={region.color}
              emissive={region.color}
              emissiveIntensity={selectedRegion === i ? 0.8 : 0.3}
            />
          </mesh>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {region.name}
          </Text>
        </group>
      ))}
    </group>
  );
}

