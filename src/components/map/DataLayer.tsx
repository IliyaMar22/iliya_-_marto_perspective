import { motion } from 'framer-motion';
import type { RegionData } from '../../hooks/useMapData';

interface DataLayerProps {
  regions: RegionData[];
  onRegionHover?: (regionId: string | null) => void;
}

export default function DataLayer({ regions, onRegionHover }: DataLayerProps) {
  const getDevelopmentColor = (level: string) => {
    switch (level) {
      case 'high':
        return '#D2FF00'; // Lime
      case 'medium':
        return '#82E6FF'; // Cyan
      case 'low':
        return '#FF6B9D'; // Pink
      default:
        return '#808080'; // Gray
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {regions.map((region) => (
        <motion.div
          key={region.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.random() * 0.5 }}
          className="absolute pointer-events-auto"
          style={{
            left: `${(region.coordinates[0] + 180) * (100 / 360)}%`,
            top: `${(90 - region.coordinates[1]) * (100 / 180)}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onMouseEnter={() => onRegionHover?.(region.id)}
          onMouseLeave={() => onRegionHover?.(null)}
        >
          <div className="relative group cursor-pointer">
            {/* Data point */}
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: getDevelopmentColor(region.developmentLevel) }}
            />

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-black/90 backdrop-blur-lg border border-lime-400 rounded-lg p-3 min-w-[200px] shadow-xl">
                <h3 className="text-lime-400 font-bold mb-2">{region.name}</h3>
                <div className="space-y-1 text-xs text-white">
                  <div className="flex justify-between">
                    <span>GDP Total:</span>
                    <span className="font-mono">€{(region.metrics.gdp / 1000).toFixed(1)}B</span>
                  </div>
                  {region.metrics.gdp_per_capita && (
                    <div className="flex justify-between">
                      <span>GDP per Capita:</span>
                      <span className="font-mono">{region.metrics.gdp_per_capita.toLocaleString()} BGN</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Population:</span>
                    <span className="font-mono">{region.metrics.population.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

