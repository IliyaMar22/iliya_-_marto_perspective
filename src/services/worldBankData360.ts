import axios from 'axios';
import { WorldBankResponse, DataPoint } from '../types';
import { API_ENDPOINTS, COUNTRY_CODES } from '../constants/indicators';
import {
  DATA360_PEOPLE_INDICATORS,
  DATA360_PROSPERITY_INDICATORS,
  DATA360_PLANET_INDICATORS,
  DATA360_INFRASTRUCTURE_INDICATORS,
  DATA360_DIGITAL_INDICATORS,
} from '../constants/indicators';
import { processWorldBankData } from '../utils/dataTransformers';
import { cache } from '../utils/cache';
import { formatNumber, formatCurrency } from '../utils/formatters';

const CACHE_DURATION = 60; // 1 hour in minutes

/**
 * Enhanced World Bank Data360 API Service
 * Fetches comprehensive indicators across People, Prosperity, Planet, Infrastructure, and Digital categories
 */

/**
 * Generic function to fetch any World Bank indicator with caching
 */
async function fetchIndicatorData(
  indicator: string,
  countryCode: string = COUNTRY_CODES.BULGARIA,
  startYear: number = 2000,
  endYear: number = new Date().getFullYear()
): Promise<DataPoint[]> {
  const cacheKey = `wb360_${indicator}_${countryCode}_${startYear}_${endYear}`;
  
  // Check cache first
  const cached = cache.get<DataPoint[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const url = `${API_ENDPOINTS.WORLD_BANK}/country/${countryCode}/indicator/${indicator}`;
    const params = {
      format: 'json',
      date: `${startYear}:${endYear}`,
      per_page: 1000,
    };

    const response = await axios.get<WorldBankResponse>(url, { params, timeout: 15000 });
    const data = processWorldBankData(response.data);

    // Cache the result
    cache.set(cacheKey, data, CACHE_DURATION);
    
    return data;
  } catch (error) {
    console.error(`Error fetching indicator ${indicator}:`, error);
    
    // Return cached data even if expired, or empty array
    const expiredCache = cache.get<DataPoint[]>(cacheKey);
    return expiredCache || [];
  }
}

/**
 * Fetch multiple indicators in parallel with error handling
 */
async function fetchMultipleIndicators(
  indicators: Record<string, string>,
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<Record<string, DataPoint[]>> {
  const results: Record<string, DataPoint[]> = {};
  
  const promises = Object.entries(indicators).map(async ([key, indicator]) => {
    try {
      const data = await fetchIndicatorData(indicator, countryCode);
      return { key, data };
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      return { key, data: [] };
    }
  });

  const settled = await Promise.allSettled(promises);
  
  settled.forEach((result) => {
    if (result.status === 'fulfilled' && result.value) {
      results[result.value.key] = result.value.data;
    }
  });

  return results;
}

/**
 * PEOPLE CATEGORY - Education, Health, Labor, Demographics
 */
export async function fetchPeopleData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<Record<string, DataPoint[]>> {
  console.log('Fetching People indicators from World Bank Data360...');
  return fetchMultipleIndicators(DATA360_PEOPLE_INDICATORS as Record<string, string>, countryCode);
}

/**
 * PROSPERITY CATEGORY - Economic Performance, Trade, Financial Inclusion, Innovation
 */
export async function fetchProsperityData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<Record<string, DataPoint[]>> {
  console.log('Fetching Prosperity indicators from World Bank Data360...');
  return fetchMultipleIndicators(DATA360_PROSPERITY_INDICATORS as Record<string, string>, countryCode);
}

/**
 * PLANET CATEGORY - Emissions, Climate, Energy, Natural Resources
 */
export async function fetchPlanetData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<Record<string, DataPoint[]>> {
  console.log('Fetching Planet indicators from World Bank Data360...');
  return fetchMultipleIndicators(DATA360_PLANET_INDICATORS as Record<string, string>, countryCode);
}

/**
 * INFRASTRUCTURE CATEGORY - Transport, Energy, Water, Urban Development
 */
export async function fetchInfrastructureData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<Record<string, DataPoint[]>> {
  console.log('Fetching Infrastructure indicators from World Bank Data360...');
  return fetchMultipleIndicators(DATA360_INFRASTRUCTURE_INDICATORS as Record<string, string>, countryCode);
}

/**
 * DIGITAL CATEGORY - Internet, Connectivity, ICT, Innovation
 */
export async function fetchDigitalData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<Record<string, DataPoint[]>> {
  console.log('Fetching Digital indicators from World Bank Data360...');
  return fetchMultipleIndicators(DATA360_DIGITAL_INDICATORS as Record<string, string>, countryCode);
}

/**
 * Fetch ALL Data360 indicators across all categories
 */
export async function fetchAllData360Indicators(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<{
  people: Record<string, DataPoint[]>;
  prosperity: Record<string, DataPoint[]>;
  planet: Record<string, DataPoint[]>;
  infrastructure: Record<string, DataPoint[]>;
  digital: Record<string, DataPoint[]>;
}> {
  console.log('Fetching all World Bank Data360 indicators...');
  
  try {
    const [people, prosperity, planet, infrastructure, digital] = await Promise.allSettled([
      fetchPeopleData(countryCode),
      fetchProsperityData(countryCode),
      fetchPlanetData(countryCode),
      fetchInfrastructureData(countryCode),
      fetchDigitalData(countryCode),
    ]);

    return {
      people: people.status === 'fulfilled' ? people.value : {},
      prosperity: prosperity.status === 'fulfilled' ? prosperity.value : {},
      planet: planet.status === 'fulfilled' ? planet.value : {},
      infrastructure: infrastructure.status === 'fulfilled' ? infrastructure.value : {},
      digital: digital.status === 'fulfilled' ? digital.value : {},
    };
  } catch (error) {
    console.error('Error fetching all Data360 indicators:', error);
    return {
      people: {},
      prosperity: {},
      planet: {},
      infrastructure: {},
      digital: {},
    };
  }
}

/**
 * Fetch key highlights - most important indicators for dashboard overview
 */
export async function fetchKeyHighlights(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<Record<string, DataPoint[]>> {
  console.log('Fetching key highlight indicators...');
  
  const keyIndicators = {
    // People
    lifeExpectancy: DATA360_PEOPLE_INDICATORS.LIFE_EXPECTANCY,
    laborForceFemalePCT: DATA360_PEOPLE_INDICATORS.LABOR_FORCE_FEMALE,
    learningPoverty: DATA360_PEOPLE_INDICATORS.LEARNING_POVERTY,
    
    // Prosperity
    gdpGrowth: DATA360_PROSPERITY_INDICATORS.GDP_GROWTH_ANNUAL,
    giniIndex: DATA360_PEOPLE_INDICATORS.GINI_INDEX,
    accountOwnership: DATA360_PROSPERITY_INDICATORS.ACCOUNT_OWNERSHIP,
    
    // Planet
    co2Emissions: DATA360_PLANET_INDICATORS.CO2_EMISSIONS,
    renewableEnergy: DATA360_PLANET_INDICATORS.RENEWABLE_ENERGY,
    waterStress: DATA360_PLANET_INDICATORS.WATER_STRESS,
    
    // Infrastructure
    accessElectricity: DATA360_INFRASTRUCTURE_INDICATORS.ACCESS_ELECTRICITY,
    urbanPopulation: DATA360_INFRASTRUCTURE_INDICATORS.URBAN_POPULATION_PERCENT,
    
    // Digital
    internetUsers: DATA360_DIGITAL_INDICATORS.INTERNET_USERS,
    mobileSubscriptions: DATA360_DIGITAL_INDICATORS.MOBILE_SUBSCRIPTIONS,
    fixedBroadband: DATA360_DIGITAL_INDICATORS.FIXED_BROADBAND,
  };
  
  return fetchMultipleIndicators(keyIndicators, countryCode);
}

/**
 * Get latest value for a specific indicator
 */
export function getLatestValue(data: DataPoint[]): { year: number; value: number } | null {
  if (!data || data.length === 0) {
    return null;
  }
  
  // Data is typically sorted by year descending from World Bank API
  const sortedData = [...data].sort((a, b) => b.year - a.year);
  const latest = sortedData[0];
  
  return latest ? { year: latest.year, value: latest.value } : null;
}

/**
 * Calculate year-over-year change
 */
export function calculateYoYChange(data: DataPoint[]): number | null {
  if (!data || data.length < 2) {
    return null;
  }
  
  const sortedData = [...data].sort((a, b) => b.year - a.year);
  const latest = sortedData[0];
  const previous = sortedData[1];
  
  if (!latest || !previous || previous.value === 0) {
    return null;
  }
  
  return ((latest.value - previous.value) / previous.value) * 100;
}

/**
 * Get data summary statistics
 */
export function getDataSummary(data: DataPoint[]): {
  latest: { year: number; value: number } | null;
  min: number | null;
  max: number | null;
  average: number | null;
  trend: 'up' | 'down' | 'stable' | null;
  yoyChange: number | null;
} {
  if (!data || data.length === 0) {
    return {
      latest: null,
      min: null,
      max: null,
      average: null,
      trend: null,
      yoyChange: null,
    };
  }
  
  const values = data.map(d => d.value);
  const latest = getLatestValue(data);
  const yoyChange = calculateYoYChange(data);
  
  // Determine trend based on last 3 years
  let trend: 'up' | 'down' | 'stable' | null = null;
  if (data.length >= 3) {
    const recentData = [...data].sort((a, b) => b.year - a.year).slice(0, 3);
    const recentValues = recentData.map(d => d.value);
    const avgChange = (recentValues[0] - recentValues[recentValues.length - 1]) / recentValues[recentValues.length - 1];
    
    if (Math.abs(avgChange) < 0.02) trend = 'stable';
    else if (avgChange > 0) trend = 'up';
    else trend = 'down';
  }
  
  return {
    latest,
    min: Math.min(...values),
    max: Math.max(...values),
    average: values.reduce((a, b) => a + b, 0) / values.length,
    trend,
    yoyChange,
  };
}

export default {
  fetchPeopleData,
  fetchProsperityData,
  fetchPlanetData,
  fetchInfrastructureData,
  fetchDigitalData,
  fetchAllData360Indicators,
  fetchKeyHighlights,
  getLatestValue,
  calculateYoYChange,
  getDataSummary,
};

