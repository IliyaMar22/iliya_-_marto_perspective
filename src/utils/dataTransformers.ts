import { WorldBankIndicator, WorldBankResponse, DataPoint, TimeSeriesData } from '../types';
import { formatCurrency, formatNumber, formatPercentage } from './formatters';

/**
 * Transform World Bank API response to DataPoint array
 */
export const processWorldBankData = (
  response: WorldBankResponse,
  formatter?: (value: number) => string
): DataPoint[] => {
  if (!response || !response[1]) return [];
  
  return response[1]
    .filter((item: WorldBankIndicator) => item.value !== null && item.value !== undefined)
    .map((item: WorldBankIndicator) => ({
      year: parseInt(item.date),
      value: item.value!,
      formatted: formatter ? formatter(item.value!) : formatNumber(item.value!),
    }))
    .sort((a, b) => a.year - b.year);
};

/**
 * Calculate growth rate from data points
 */
export const calculateGrowthRate = (data: DataPoint[]): DataPoint[] => {
  return data.map((point, index) => {
    if (index === 0) {
      return { ...point, value: 0, formatted: '0%' };
    }
    const previousValue = data[index - 1].value;
    if (previousValue === 0) {
      return { ...point, value: 0, formatted: '0%' };
    }
    const growth = ((point.value - previousValue) / previousValue) * 100;
    return {
      ...point,
      value: growth,
      formatted: formatPercentage(growth),
    };
  });
};

/**
 * Calculate percentage change between two values
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Filter data by year range
 */
export const filterByYearRange = (
  data: DataPoint[],
  startYear: number,
  endYear: number
): DataPoint[] => {
  return data.filter((point) => point.year >= startYear && point.year <= endYear);
};

/**
 * Get latest value from data points
 */
export const getLatestValue = (data: DataPoint[]): number | null => {
  if (data.length === 0) return null;
  return data[data.length - 1].value;
};

/**
 * Get average value from data points
 */
export const getAverageValue = (data: DataPoint[]): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, point) => acc + point.value, 0);
  return sum / data.length;
};

/**
 * Create comparison dataset
 */
export const createComparisonData = (
  bulgaria: DataPoint[],
  euAverage: DataPoint[],
  otherCountries?: { name: string; data: DataPoint[] }[]
): TimeSeriesData[] => {
  const datasets: TimeSeriesData[] = [
    {
      label: 'Bulgaria',
      data: bulgaria,
      color: '#00966E',
    },
    {
      label: 'EU Average',
      data: euAverage,
      color: '#0066CC',
    },
  ];

  if (otherCountries) {
    const colors = ['#FFD700', '#DC143C', '#0D5EAF', '#FF6347', '#9370DB'];
    otherCountries.forEach((country, index) => {
      datasets.push({
        label: country.name,
        data: country.data,
        color: colors[index % colors.length],
      });
    });
  }

  return datasets;
};

/**
 * Calculate moving average
 */
export const calculateMovingAverage = (data: DataPoint[], window: number = 3): DataPoint[] => {
  return data.map((point, index) => {
    if (index < window - 1) {
      return { ...point, value: point.value };
    }
    
    const windowData = data.slice(index - window + 1, index + 1);
    const average = windowData.reduce((sum, p) => sum + p.value, 0) / window;
    
    return {
      ...point,
      value: average,
      formatted: formatNumber(average),
    };
  });
};

/**
 * Normalize data to percentage of first value
 */
export const normalizeToBaseYear = (data: DataPoint[]): DataPoint[] => {
  if (data.length === 0) return [];
  
  const baseValue = data[0].value;
  if (baseValue === 0) return data;
  
  return data.map((point) => ({
    ...point,
    value: (point.value / baseValue) * 100,
    formatted: formatPercentage((point.value / baseValue) * 100),
  }));
};



