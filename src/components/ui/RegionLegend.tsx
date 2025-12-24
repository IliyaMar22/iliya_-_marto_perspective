import { motion } from 'framer-motion';

const developmentLevels = [
  { level: 'High', color: '#D2FF00', description: 'GDP > 25k, Low unemployment' },
  { level: 'Medium', color: '#82E6FF', description: 'GDP 15-25k, Moderate growth' },
  { level: 'Low', color: '#FF6B9D', description: 'GDP < 15k, Development needed' },
];

export default function RegionLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-8 left-8 bg-black/90 backdrop-blur-lg border border-lime-400 rounded-lg p-6 z-40"
    >
      <h3 className="text-lime-400 font-bold mb-4 text-lg">Development Levels</h3>
      <div className="space-y-3">
        {developmentLevels.map((item) => (
          <div key={item.level} className="flex items-start gap-3">
            <div
              className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <div className="text-white font-semibold text-sm">{item.level}</div>
              <div className="text-gray-400 text-xs">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>Interactive data visualization</span>
        </div>
      </div>
    </motion.div>
  );
}

