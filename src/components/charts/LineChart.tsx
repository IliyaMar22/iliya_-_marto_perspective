import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesData, DataPoint } from '../../types';
import { CHART_COLORS } from '../../constants/indicators';

interface LineChartProps {
  data: TimeSeriesData[] | DataPoint[];
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  formatYAxis?: (value: number) => string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 300,
  showLegend = true,
  showTooltip = true,
  colors = [CHART_COLORS.bulgaria, CHART_COLORS.eu, CHART_COLORS.accent],
  xAxisLabel,
  yAxisLabel,
  formatYAxis,
}) => {
  // Fixed height - no dynamic resizing on scroll
  const chartHeight = height;
  // Check if data is TimeSeriesData[] or DataPoint[]
  const isTimeSeries = Array.isArray(data) && data.length > 0 && 'data' in data[0];
  
  let chartData: any[] = [];
  let series: TimeSeriesData[] = [];

  if (isTimeSeries) {
    series = data as TimeSeriesData[];
    // Combine all series into a single array with year as key
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
    // Single series - DataPoint[]
    const singleSeries = data as DataPoint[];
    
    // Debug logging
    console.log('LineChart - Processing DataPoint[]:', {
      dataLength: singleSeries.length,
      samplePoint: singleSeries[0],
      allPoints: singleSeries.slice(0, 3),
    });
    
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
  
  // Debug: Log final chart data
  console.log('LineChart - Final chartData:', {
    length: chartData.length,
    sample: chartData.slice(0, 3),
    seriesCount: series.length,
  });

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
      <RechartsLineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
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
            <Line
              key={seriesItem.label}
              type="monotone"
              dataKey={seriesItem.label}
              stroke={seriesItem.color || colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))
        ) : (
          <Line
            type="monotone"
            dataKey="value"
            stroke={colors[0]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

