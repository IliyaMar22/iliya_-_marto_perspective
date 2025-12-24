import axios from 'axios';
import { EurostatResponse, DataPoint } from '../types';
import { API_ENDPOINTS, EUROSTAT_INDICATORS } from '../constants/indicators';
import { cache } from '../utils/cache';
import { formatNumber } from '../utils/formatters';

const CACHE_DURATION = 60; // 1 hour

/**
 * Parse Eurostat JSON-stat format
 */
function parseEurostatData(response: EurostatResponse, geoCode: string = 'BG'): DataPoint[] {
  const data: DataPoint[] = [];
  
  try {
    // Eurostat uses a complex structure, we need to extract values
    const values = response.value || {};
    const dimensions = response.dimension || {};
    
    // Get time dimension
    const timeDim = dimensions.time;
    if (!timeDim) return [];
    
    const timeLabels = timeDim.category?.label || {};
    const timeIndex = timeDim.category?.index || {};
    
    // Get geo dimension
    const geoDim = dimensions.geo;
    if (!geoDim) return [];
    
    const geoIndex = geoDim.category?.index || {};
    const geoCodeIndex = geoIndex[geoCode];
    
    if (geoCodeIndex === undefined) return [];
    
    // Extract data points
    Object.keys(timeLabels).forEach((timeKey) => {
      const timeLabel = timeLabels[timeKey];
      const timeIdx = timeIndex[timeKey];
      
      // Construct the key for the value object
      // Eurostat uses a specific key format based on dimension indices
      const key = `${geoCodeIndex}:${timeIdx}`;
      
      // Try different key formats
      const possibleKeys = [
        key,
        `${timeIdx}:${geoCodeIndex}`,
        `${geoCodeIndex}_${timeIdx}`,
        timeKey,
      ];
      
      let value: number | null = null;
      
      for (const k of possibleKeys) {
        if (values[k] !== undefined) {
          value = values[k] as number;
          break;
        }
      }
      
      // If not found, try direct lookup
      if (value === null) {
        const allKeys = Object.keys(values);
        const matchingKey = allKeys.find((k) => k.includes(String(geoCodeIndex)) && k.includes(String(timeIdx)));
        if (matchingKey) {
          value = values[matchingKey] as number;
        }
      }
      
      if (value !== null && !isNaN(value)) {
        // Parse year from time label (format: "2023" or "2023Q1" or "2023M01")
        const yearMatch = timeLabel.match(/^(\d{4})/);
        if (yearMatch) {
          const year = parseInt(yearMatch[1]);
          data.push({
            year,
            value,
            formatted: formatNumber(value, 2),
          });
        }
      }
    });
    
    // Sort by year
    data.sort((a, b) => a.year - b.year);
    
    return data;
  } catch (error) {
    console.error('Error parsing Eurostat data:', error);
    return [];
  }
}

/**
 * Fetch data from Eurostat API
 */
async function fetchEurostatIndicator(
  indicator: string,
  geoCode: string = 'BG',
  params: Record<string, string> = {}
): Promise<DataPoint[]> {
  const cacheKey = `eurostat_${indicator}_${geoCode}`;
  
  // Check cache first
  const cached = cache.get<DataPoint[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const url = `${API_ENDPOINTS.EUROSTAT}/${indicator}`;
    const requestParams = {
      format: 'JSON',
      lang: 'EN',
      geo: geoCode,
      ...params,
    };

    const response = await axios.get<EurostatResponse>(url, { 
      params: requestParams, 
      timeout: 15000,
      headers: {
        'Accept': 'application/json',
      },
    });
    
    const data = parseEurostatData(response.data, geoCode);
    
    // Cache the result
    if (data.length > 0) {
      cache.set(cacheKey, data, CACHE_DURATION);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching Eurostat indicator ${indicator}:`, error);
    
    // Return cached data even if expired
    const expiredCache = cache.get<DataPoint[]>(cacheKey);
    if (expiredCache) {
      return expiredCache;
    }
    
    return [];
  }
}

/**
 * Fetch GDP data from Eurostat
 */
export async function fetchEurostatGDP(geoCode: string = 'BG'): Promise<DataPoint[]> {
  return fetchEurostatIndicator(EUROSTAT_INDICATORS.GDP, geoCode, {
    na_item: 'B1GQ', // Gross domestic product at market prices
    unit: 'CP_MEUR', // Current prices, million euro
  });
}

/**
 * Fetch unemployment data from Eurostat
 */
export async function fetchEurostatUnemployment(geoCode: string = 'BG'): Promise<DataPoint[]> {
  return fetchEurostatIndicator(EUROSTAT_INDICATORS.UNEMPLOYMENT, geoCode, {
    age: 'TOTAL',
    sex: 'T',
    unit: 'PC', // Percentage
  });
}

/**
 * Fetch government debt data from Eurostat
 */
export async function fetchEurostatDebt(geoCode: string = 'BG'): Promise<DataPoint[]> {
  return fetchEurostatIndicator(EUROSTAT_INDICATORS.GOVERNMENT_DEBT, geoCode, {
    unit: 'PC_GDP', // Percentage of GDP
  });
}

/**
 * Fetch all Eurostat data for Bulgaria
 */
export async function fetchAllEurostatData() {
  try {
    const [gdp, unemployment, debt] = await Promise.allSettled([
      fetchEurostatGDP(),
      fetchEurostatUnemployment(),
      fetchEurostatDebt(),
    ]);

    return {
      gdp: gdp.status === 'fulfilled' ? gdp.value : [],
      unemployment: unemployment.status === 'fulfilled' ? unemployment.value : [],
      debt: debt.status === 'fulfilled' ? debt.value : [],
    };
  } catch (error) {
    console.error('Error fetching all Eurostat data:', error);
    return {
      gdp: [],
      unemployment: [],
      debt: [],
    };
  }
}



