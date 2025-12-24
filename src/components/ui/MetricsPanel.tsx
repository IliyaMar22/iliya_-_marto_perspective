import { motion } from 'framer-motion';
import type { RegionData } from '../../hooks/useMapData';

interface MetricsPanelProps {
  region: RegionData | null;
  onClose?: () => void;
}

export default function MetricsPanel({ region, onClose }: MetricsPanelProps) {
  if (!region) return null;

  return (
    <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-8 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-lg border border-lime-400 p-8 rounded-lg shadow-2xl max-w-md z-50"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-lime-400 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-lime-400 mb-6">{region.name}</h2>

        <div className="space-y-4">
          <MetricBar
            label="GDP per Capita"
            value={region.metrics.gdp_per_capita || region.metrics.gdp}
            max={70000}
            color="#D2FF00"
            unit="BGN"
          />
          <MetricBar
            label="GDP Total"
            value={region.metrics.gdp || 0}
            max={80000}
            color="#82E6FF"
            unit="M BGN"
          />
          <MetricBar
            label="Population"
            value={region.metrics.population}
            max={1500000}
            color="#FFB800"
            unit=""
          />
        </div>

        {/* GVA Breakdown */}
        {(region.metrics.gva_agriculture || region.metrics.gva_industry || region.metrics.gva_services) && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-lg text-white mb-3 font-semibold">GVA by Sector (Million BGN)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">🌾 Agriculture:</span>
                <span className="font-mono text-lime-400 font-semibold">
                  {region.metrics.gva_agriculture?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">🏭 Industry:</span>
                <span className="font-mono text-cyan-400 font-semibold">
                  {region.metrics.gva_industry?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">💼 Services:</span>
                <span className="font-mono text-orange-400 font-semibold">
                  {region.metrics.gva_services?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                <span className="text-white font-semibold">Total GVA:</span>
                <span className="font-mono text-white font-bold">
                  {region.metrics.gva_total?.toLocaleString() || '0'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg text-white mb-3 font-semibold">Main Industries</h3>
          <div className="flex flex-wrap gap-2">
            {region.metrics.industries.map((industry) => (
              <motion.span
                key={industry}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="px-3 py-1 bg-lime-400/20 text-lime-400 rounded-full text-sm font-medium border border-lime-400/40 hover:bg-lime-400/30 transition-colors"
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Development Level:</span>
            <span
              className={`px-3 py-1 rounded-full font-semibold ${
                region.developmentLevel === 'high'
                  ? 'bg-lime-400/20 text-lime-400'
                  : region.developmentLevel === 'medium'
                  ? 'bg-cyan-400/20 text-cyan-400'
                  : 'bg-pink-400/20 text-pink-400'
              }`}
            >
              {region.developmentLevel.toUpperCase()}
            </span>
          </div>
        </div>
      </motion.div>
  );
}

interface MetricBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
  unit?: string;
  inverted?: boolean;
}

function MetricBar({ label, value, max, color, unit = '', inverted = false }: MetricBarProps) {
  const percentage = (value / max) * 100;
  const displayPercentage = Math.min(percentage, 100);

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-white">
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${displayPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full relative"
          style={{ backgroundColor: color }}
        >
          <motion.div
            className="absolute inset-0 bg-white/30"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

