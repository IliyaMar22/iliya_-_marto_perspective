import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-lime-400 via-cyan-400 to-lime-400"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />
    </div>
  );
}

