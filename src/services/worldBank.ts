import axios from 'axios';
import { WorldBankResponse, DataPoint } from '../types';
import { API_ENDPOINTS, COUNTRY_CODES, WORLD_BANK_INDICATORS } from '../constants/indicators';
import { processWorldBankData } from '../utils/dataTransformers';
import { cache } from '../utils/cache';
import { formatCurrency, formatNumber } from '../utils/formatters';

const CACHE_DURATION = 60; // 1 hour

/**
 * Fetch data from World Bank API
 */
async function fetchWorldBankIndicator(
  indicator: string,
  countryCode: string = COUNTRY_CODES.BULGARIA,
  startYear: number = 2000,
  endYear: number = new Date().getFullYear()
): Promise<DataPoint[]> {
  const cacheKey = `wb_${indicator}_${countryCode}_${startYear}_${endYear}`;
  
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
    
    let data: DataPoint[] = [];
    
    // Format based on indicator type
    if (indicator.includes('GDP') && !indicator.includes('GROWTH')) {
      data = processWorldBankData(response.data, formatCurrency);
    } else if (indicator.includes('GROWTH') || indicator.includes('UNEMPLOYMENT') || indicator.includes('INFLATION')) {
      data = processWorldBankData(response.data, (v) => formatNumber(v, 2));
    } else {
      data = processWorldBankData(response.data);
    }

    // Cache the result
    cache.set(cacheKey, data, CACHE_DURATION);
    
    return data;
  } catch (error) {
    console.error(`Error fetching World Bank indicator ${indicator}:`, error);
    
    // Return cached data even if expired, or empty array
    const expiredCache = cache.get<DataPoint[]>(cacheKey);
    if (expiredCache) {
      return expiredCache;
    }
    
    return [];
  }
}

/**
 * Fetch GDP data
 */
export async function fetchGDPData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<DataPoint[]> {
  return fetchWorldBankIndicator(WORLD_BANK_INDICATORS.GDP, countryCode);
}

/**
 * Fetch GDP per capita data
 */
export async function fetchGDPPerCapitaData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<DataPoint[]> {
  return fetchWorldBankIndicator(WORLD_BANK_INDICATORS.GDP_PER_CAPITA, countryCode);
}

/**
 * Fetch GDP growth rate data
 */
export async function fetchGDPGrowthData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<DataPoint[]> {
  return fetchWorldBankIndicator(WORLD_BANK_INDICATORS.GDP_GROWTH, countryCode);
}

/**
 * Fetch unemployment data
 */
export async function fetchUnemploymentData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<DataPoint[]> {
  return fetchWorldBankIndicator(WORLD_BANK_INDICATORS.UNEMPLOYMENT, countryCode);
}

/**
 * Fetch employment data
 */
export async function fetchEmploymentData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<DataPoint[]> {
  return fetchWorldBankIndicator(WORLD_BANK_INDICATORS.EMPLOYMENT, countryCode);
}

/**
 * Fetch inflation data
 */
export async function fetchInflationData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<DataPoint[]> {
  return fetchWorldBankIndicator(WORLD_BANK_INDICATORS.INFLATION, countryCode);
}

/**
 * Fetch FDI data
 */
export async function fetchFDIData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<DataPoint[]> {
  return fetchWorldBankIndicator(WORLD_BANK_INDICATORS.FDI_NET_INFLOWS, countryCode);
}

/**
 * Fetch government debt data
 */
export async function fetchGovernmentDebtData(
  countryCode: string = COUNTRY_CODES.BULGARIA
): Promise<DataPoint[]> {
  return fetchWorldBankIndicator(WORLD_BANK_INDICATORS.GOVERNMENT_DEBT, countryCode);
}

/**
 * Fetch all World Bank data for Bulgaria
 */
export async function fetchAllWorldBankData() {
  try {
    const [
      gdp,
      gdpPerCapita,
      gdpGrowth,
      unemployment,
      employment,
      inflation,
      fdi,
      debt,
    ] = await Promise.allSettled([
      fetchGDPData(),
      fetchGDPPerCapitaData(),
      fetchGDPGrowthData(),
      fetchUnemploymentData(),
      fetchEmploymentData(),
      fetchInflationData(),
      fetchFDIData(),
      fetchGovernmentDebtData(),
    ]);

    return {
      gdp: gdp.status === 'fulfilled' ? gdp.value : [],
      gdpPerCapita: gdpPerCapita.status === 'fulfilled' ? gdpPerCapita.value : [],
      gdpGrowth: gdpGrowth.status === 'fulfilled' ? gdpGrowth.value : [],
      unemployment: unemployment.status === 'fulfilled' ? unemployment.value : [],
      employment: employment.status === 'fulfilled' ? employment.value : [],
      inflation: inflation.status === 'fulfilled' ? inflation.value : [],
      fdi: fdi.status === 'fulfilled' ? fdi.value : [],
      debt: debt.status === 'fulfilled' ? debt.value : [],
    };
  } catch (error) {
    console.error('Error fetching all World Bank data:', error);
    return {
      gdp: [],
      gdpPerCapita: [],
      gdpGrowth: [],
      unemployment: [],
      employment: [],
      inflation: [],
      fdi: [],
      debt: [],
    };
  }
}



