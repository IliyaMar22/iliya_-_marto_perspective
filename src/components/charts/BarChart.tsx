import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesData, DataPoint } from '../../types';
import { CHART_COLORS } from '../../constants/indicators';

interface BarChartProps {
  data: TimeSeriesData[] | DataPoint[];
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
  horizontal?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  formatYAxis?: (value: number) => string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 300,
  showLegend = true,
  showTooltip = true,
  colors = [CHART_COLORS.bulgaria, CHART_COLORS.eu, CHART_COLORS.accent],
  horizontal = false,
  xAxisLabel,
  yAxisLabel,
  formatYAxis,
}) => {
  // Fixed height - no dynamic resizing on scroll
  const chartHeight = height;
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
    <ResponsiveContainer width="100%" height={chartHeight}>
      <RechartsBarChart
        data={chartData}
        layout={horizontal ? 'vertical' : 'horizontal'}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        {horizontal ? (
          <>
            <XAxis type="number" stroke="#6b7280" tickFormatter={formatYAxis} />
            <YAxis dataKey="year" type="category" stroke="#6b7280" />
          </>
        ) : (
          <>
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
            <YAxis stroke="#6b7280" label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined} tickFormatter={formatYAxis} />
          </>
        )}
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        {isTimeSeries ? (
          series.map((seriesItem, index) => (
            <Bar
              key={seriesItem.label}
              dataKey={seriesItem.label}
              fill={seriesItem.color || colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))
        ) : (
          <Bar
            dataKey="value"
            fill={colors[0]}
            radius={[4, 4, 0, 0]}
          />
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

