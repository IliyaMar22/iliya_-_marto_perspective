import { motion, AnimatePresence } from 'framer-motion';

const developmentLevels = [
  { level: 'High', color: '#D2FF00', description: 'GDP > 25k, Low unemployment' },
  { level: 'Medium', color: '#82E6FF', description: 'GDP 15-25k, Moderate growth' },
  { level: 'Low', color: '#FF6B9D', description: 'GDP < 15k, Development needed' },
];

interface RegionLegendProps {
  visible?: boolean;
}

export default function RegionLegend({ visible = true }: RegionLegendProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-8 md:left-8 bg-black/90 backdrop-blur-lg border border-lime-400 rounded-lg p-3 sm:p-4 md:p-6 z-40 max-w-[calc(100vw-1rem)] sm:max-w-xs"
        >
      <h3 className="text-lime-400 font-bold mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">Development Levels</h3>
      <div className="space-y-2 sm:space-y-3">
        {developmentLevels.map((item) => (
          <div key={item.level} className="flex items-start gap-2 sm:gap-3">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mt-0.5 sm:mt-1 flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-white font-semibold text-xs sm:text-sm">{item.level}</div>
              <div className="text-gray-400 text-[10px] sm:text-xs leading-tight">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lime-400 animate-pulse flex-shrink-0" />
          <span className="truncate">Interactive data visualization</span>
        </div>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

