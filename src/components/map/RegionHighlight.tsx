import { motion } from 'framer-motion';

interface RegionHighlightProps {
  regionName: string;
  position: { x: number; y: number };
  color?: string;
}

export default function RegionHighlight({
  regionName,
  position,
  color = '#D2FF00',
}: RegionHighlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Pulsing circle */}
      <motion.div
        className="w-8 h-8 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Label */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 px-3 py-1 rounded-full text-sm border"
        style={{ color, borderColor: color }}
      >
        {regionName}
      </div>
    </motion.div>
  );
}

