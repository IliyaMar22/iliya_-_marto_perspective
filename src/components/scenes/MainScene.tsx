import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
import { useScrollSection } from '../../hooks/useScrollSection';
import ParticleField from '../three/ParticleField';
import EuropeScene from './EuropeScene';
import BulgariaScene from './BulgariaScene';
import RegionalDetailsScene from './RegionalDetailsScene';

export default function MainScene() {
  const currentSection = useScrollSection();

  return (
    <div className="fixed inset-0 w-full h-screen z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={60} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
        <directionalLight position={[-10, 5, -5]} intensity={0.3} />

        {/* Background particle field */}
        <ParticleField />

        {/* Scene transitions based on scroll */}
        {currentSection === 'europe' && <EuropeScene />}
        {currentSection === 'bulgaria' && <BulgariaScene />}
        {currentSection === 'details' && <RegionalDetailsScene />}

        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

