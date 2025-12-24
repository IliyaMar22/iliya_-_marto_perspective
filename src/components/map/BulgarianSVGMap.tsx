import { useState } from 'react';
import { motion } from 'framer-motion';
import { bulgarianRegionPaths, MAP_WIDTH, MAP_HEIGHT } from '../../utils/bulgarianMapPaths';
import type { RegionData } from '../../hooks/useMapData';

interface BulgarianSVGMapProps {
  regionData: RegionData[];
  onRegionClick?: (region: RegionData) => void;
  width?: number;
  height?: number;
}

export default function BulgarianSVGMap({
  regionData,
  onRegionClick,
  width = 1000,
  height = 652,
}: BulgarianSVGMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Scale factor to fit the map to the desired size
  const scaleX = width / MAP_WIDTH;
  const scaleY = height / MAP_HEIGHT;

  // Map old jvectormap codes to correct NSI NUTS codes
  const codeMapping: Record<string, string> = {
    'BG222': 'BG344', // Stara Zagora
    'BG224': 'BG423', // Pazardzhik
    'BG225': 'BG424', // Smolyan
    'BG112': 'BG312', // Montana
    'BG113': 'BG313', // Vratsa
    'BG122': 'BG315', // Lovech
    'BG124': 'BG322', // Gabrovo
    'BG133': 'BG333', // Shumen
    'BG131': 'BG331', // Varna
    'BG136': 'BG325', // Silistra
    'BG215': 'BG415', // Kyustendil
    'BG231': 'BG341', // Burgas
    'BG233': 'BG343', // Yambol
  };

  // Helper function to get the correct code
  const getCorrectCode = (mapCode: string): string => {
    return codeMapping[mapCode] || mapCode;
  };

  const getDevelopmentColor = (mapRegionId: string) => {
    const correctCode = getCorrectCode(mapRegionId);
    const region = regionData.find(r => 
      r.nuts_code === correctCode || 
      r.id === correctCode.toLowerCase() ||
      r.nuts_code === mapRegionId ||
      r.id === mapRegionId.toLowerCase()
    );
    
    if (!region) return '#808080'; // Gray for unmapped regions

    switch (region.developmentLevel) {
      case 'high':
        return '#D2FF00'; // Lime - High development
      case 'medium':
        return '#82E6FF'; // Cyan - Medium development
      case 'low':
        return '#FF6B9D'; // Pink - Low development
      default:
        return '#808080'; // Gray
    }
  };

  const handleRegionClick = (mapRegionId: string) => {
    const correctCode = getCorrectCode(mapRegionId);
    const region = regionData.find(r => 
      r.nuts_code === correctCode || 
      r.id === correctCode.toLowerCase() ||
      r.nuts_code === mapRegionId ||
      r.id === mapRegionId.toLowerCase()
    );
    
    if (region && onRegionClick) {
      onRegionClick(region);
    }
  };

  const getRegionName = (mapRegionId: string) => {
    const correctCode = getCorrectCode(mapRegionId);
    const region = regionData.find(r => 
      r.nuts_code === correctCode || 
      r.id === correctCode.toLowerCase() ||
      r.nuts_code === mapRegionId ||
      r.id === mapRegionId.toLowerCase()
    );
    return region?.name || region?.name_en || mapRegionId;
  };

  return (
    <div className="relative w-full" style={{ maxWidth: width, margin: '0 auto' }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-2xl"
        style={{ filter: 'drop-shadow(0 0 20px rgba(210, 255, 0, 0.3))' }}
      >
        {/* Define gradients and filters */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0A1F0A', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#mapGradient)" />

        {/* Render each region */}
        {bulgarianRegionPaths.map((region) => {
          const isHovered = hoveredRegion === region.id;
          const fillColor = getDevelopmentColor(region.id);
          
          return (
            <motion.path
              key={region.id}
              d={region.path}
              fill={isHovered ? '#D2FF00' : fillColor}
              fillOpacity={isHovered ? 0.9 : 0.7}
              stroke="#D2FF00"
              strokeWidth={isHovered ? 2.5 : 1}
              strokeOpacity={0.8}
              className="transition-all duration-300 cursor-pointer"
              style={{ filter: isHovered ? 'url(#glow)' : 'none' }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region.id)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          );
        })}

        {/* Labels for regions */}
        {bulgarianRegionPaths.map((region) => {
          // Calculate approximate centroid (simplified - you might want to calculate actual centroids)
          const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          pathElement.setAttribute('d', region.path);
          const bbox = pathElement.getBBox();
          const centerX = bbox.x + bbox.width / 2;
          const centerY = bbox.y + bbox.height / 2;

          return (
            <text
              key={`label-${region.id}`}
              x={centerX}
              y={centerY}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="500"
              pointerEvents="none"
              opacity={hoveredRegion === region.id ? 1 : 0.7}
              className="transition-opacity duration-200"
            >
              {getRegionName(region.id)}
            </text>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredRegion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-lg border border-lime-400 px-4 py-2 rounded-lg z-10 pointer-events-none"
        >
          <div className="text-lime-400 font-semibold text-center">
            {getRegionName(hoveredRegion)}
          </div>
          <div className="text-gray-300 text-xs text-center mt-1">
            Click to view details
          </div>
        </motion.div>
      )}

      {/* Title */}
      <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-sm border border-lime-400/50 px-4 py-2 rounded-lg">
        <h2 className="text-lime-400 font-bold text-lg">Bulgarian Regions</h2>
        <p className="text-gray-400 text-xs">NSI Data 2023</p>
      </div>
    </div>
  );
}

