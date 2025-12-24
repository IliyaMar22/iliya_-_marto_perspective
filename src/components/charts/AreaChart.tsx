import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesData, DataPoint } from '../../types';
import { CHART_COLORS } from '../../constants/indicators';

interface AreaChartProps {
  data: TimeSeriesData[] | DataPoint[];
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
  stacked?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  formatYAxis?: (value: number) => string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  height,
  showLegend = true,
  showTooltip = true,
  colors = [CHART_COLORS.bulgaria, CHART_COLORS.eu, CHART_COLORS.accent],
  stacked = false,
  xAxisLabel,
  yAxisLabel,
  formatYAxis,
}) => {
  // Responsive height based on screen size
  const responsiveHeight = height || (typeof window !== 'undefined' 
    ? window.innerWidth < 640 ? 250 
    : window.innerWidth < 1024 ? 350 
    : 400 
    : 400);
  const isTimeSeries = Array.isArray(data) && data.length > 0 && 'data' in data[0];
  
  let chartData: any[] = [];
  let series: TimeSeriesData[] = [];

  if (isTimeSeries) {
    series = data as TimeSeriesData[];
    const yearMap = new Map<number, any>();
    
    series.forEach((seriesItem) => {
      seriesItem.data.forEach((point) => {
        if (!yearMap.has(point.year)) {
          yearMap.set(point.year, { year: point.year });
        }
        yearMap.get(point.year)[seriesItem.label] = point.value;
      });
    });
    
    chartData = Array.from(yearMap.values()).sort((a, b) => a.year - b.year);
  } else {
    const singleSeries = data as DataPoint[];
    chartData = singleSeries.map((point) => ({
      year: point.year,
      value: point.value,
    }));
    series = [{
      label: 'Value',
      data: singleSeries,
      color: colors[0],
    }];
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900 dark:text-white mb-2">{`Year: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value?.toLocaleString() || 'N/A'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={responsiveHeight}>
      <RechartsAreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          {series.map((seriesItem, index) => (
            <linearGradient key={seriesItem.label} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={seriesItem.color || colors[index % colors.length]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={seriesItem.color || colors[index % colors.length]} stopOpacity={0.1} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="year"
          stroke="#6b7280"
          label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined}
          tickFormatter={(value) => {
            // Ensure year is displayed as integer
            const year = typeof value === 'number' ? Math.round(value) : parseInt(String(value));
            return String(year);
          }}
          type="number"
          scale="linear"
          domain={['dataMin', 'dataMax']}
          allowDecimals={false}
        />
        <YAxis
          stroke="#6b7280"
          label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
          tickFormatter={formatYAxis}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        {isTimeSeries ? (
          series.map((seriesItem, index) => (
            <Area
              key={seriesItem.label}
              type="monotone"
              dataKey={seriesItem.label}
              stroke={seriesItem.color || colors[index % colors.length]}
              fill={`url(#color${index})`}
              stackId={stacked ? "1" : undefined}
            />
          ))
        ) : (
          <Area
            type="monotone"
            dataKey="value"
            stroke={colors[0]}
            fill={`url(#color0)`}
            stackId={stacked ? "1" : undefined}
          />
        )}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

