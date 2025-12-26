import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface Investment {
  [year: string]: number | null;
}

interface Sector {
  code: string;
  name: string;
  investments: Investment;
}

interface FDIData {
  source: string;
  description: string;
  unit: string;
  years: number[];
  last_updated: string;
  sectors: Sector[];
}

interface FDIBySectorChartProps {
  data: FDIData;
}

const FDIBySectorChart: React.FC<FDIBySectorChartProps> = ({ data }) => {
  const [selectedSectors, setSelectedSectors] = useState<string[]>(['1', 'G', 'L', 'D', 'JB']);

  // Get top 10 sectors by 2024 value (excluding TOTAL)
  const topSectors = data.sectors
    .filter(s => s.code !== '1')
    .sort((a, b) => {
      const aVal = a.investments['2024'] || 0;
      const bVal = b.investments['2024'] || 0;
      return bVal - aVal;
    })
    .slice(0, 10);

  // Prepare chart data
  const chartData = data.years.map(year => {
    const yearData: any = { year: year.toString() };
    selectedSectors.forEach(code => {
      const sector = data.sectors.find(s => s.code === code);
      if (sector) {
        yearData[sector.code] = sector.investments[year.toString()] 
          ? (sector.investments[year.toString()]! / 1000000).toFixed(2) 
          : null;
      }
    });
    return yearData;
  });

  // Calculate total growth
  const totalSector = data.sectors.find(s => s.code === '1');
  const totalGrowth = totalSector ? 
    ((totalSector.investments['2024']! - totalSector.investments['2015']!) / totalSector.investments['2015']! * 100).toFixed(1)
    : 0;

  const colors = [
    '#D2FF00', // Lime
    '#00D9FF', // Cyan
    '#FF00D9', // Magenta
    '#FFD900', // Yellow
    '#00FFD9', // Turquoise
    '#D900FF', // Purple
    '#FF9900', // Orange
    '#00FF99', // Green
    '#9900FF', // Violet
    '#FF0099', // Pink
  ];

  const toggleSector = (code: string) => {
    setSelectedSectors(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-lime-500/20">
      {/* Header */}
      <div className="mb-6">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-lime-400 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Foreign Direct Investment by Economic Sector
            </h3>
            <p className="text-gray-400 text-sm mt-1">{data.description}</p>
          </div>

        {/* Total FDI Stats */}
        {totalSector && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total FDI (2024)</p>
              <p className="text-2xl font-bold text-lime-400">
                €{(totalSector.investments['2024']! / 1000000000).toFixed(2)}B
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total FDI (2015)</p>
              <p className="text-2xl font-bold text-cyan-400">
                €{(totalSector.investments['2015']! / 1000000000).toFixed(2)}B
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Growth (2015-2024)</p>
              <p className="text-2xl font-bold text-green-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                +{totalGrowth}%
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Annual Avg Growth</p>
              <p className="text-2xl font-bold text-yellow-400">
                +{((parseFloat(totalGrowth.toString()) / 9)).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
              label={{ value: 'Billion €', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #4B5563',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#D2FF00' }}
            />
            <Legend />
            {selectedSectors.map((code, index) => {
              const sector = data.sectors.find(s => s.code === code);
              return sector ? (
                <Line
                  key={code}
                  type="monotone"
                  dataKey={code}
                  name={sector.name}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length], r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ) : null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sector Selection */}
      <div className="px-2 sm:px-0">
        <h4 className="text-base sm:text-lg font-semibold text-lime-400 mb-3 text-center sm:text-left">
          Top 10 Sectors by FDI (2024) - Tap to toggle
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {topSectors.map((sector, index) => {
            const isSelected = selectedSectors.includes(sector.code);
            const growth = sector.investments['2024'] && sector.investments['2015']
              ? ((sector.investments['2024']! - sector.investments['2015']!) / sector.investments['2015']! * 100).toFixed(1)
              : 0;
            
            return (
              <button
                key={sector.code}
                onClick={() => toggleSector(sector.code)}
                className={`p-2.5 sm:p-3 rounded-lg text-left transition-all touch-manipulation active:scale-95 ${
                  isSelected
                    ? 'bg-lime-500/20 border-2 border-lime-500'
                    : 'bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600 active:bg-gray-700/50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div 
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                    style={{ 
                      backgroundColor: isSelected 
                        ? colors[selectedSectors.indexOf(sector.code) % colors.length]
                        : colors[index % colors.length]
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-gray-400">{sector.code}</p>
                    <p className="text-sm font-semibold text-white truncate" title={sector.name}>
                      {sector.name.split(',')[0]}
                    </p>
                    <p className="text-xs text-lime-400 mt-1">
                      €{(sector.investments['2024']! / 1000000).toFixed(0)}M
                    </p>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${
                      parseFloat(growth.toString()) >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {parseFloat(growth.toString()) >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {growth}% (2015-24)
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Source */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          Source: {data.source} | Updated: {data.last_updated} | Unit: {data.unit}
        </p>
      </div>
    </div>
  );
};

export default FDIBySectorChart;

