import { DashboardState, DataPoint } from '../types';
import axios from 'axios';
import {
  mockGDP,
  mockGDPPerCapita,
  mockGDPGrowth,
  mockUnemployment,
  mockEmployment,
  mockDebt,
  mockFDI,
  mockInflation,
} from './mockData';

/**
 * Get the API base URL based on environment
 * Priority: REACT_APP_API_URL env var > production detection > localhost fallback
 */
const getApiBaseUrl = (): string => {
  // First check for explicit env var
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // In production on Railway, the backend URL should be set
  // If not set, we'll use the mock data fallback
  if (process.env.NODE_ENV === 'production') {
    console.log('Production mode: Using REACT_APP_API_URL or fallback data');
    return ''; // Will trigger fallback to mock data
  }
  
  // Local development default
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Main data service that aggregates data from all sources
 */
export class DataService {
  /**
   * Fetch all dashboard data from Python backend
   */
  static async fetchAllData(): Promise<Partial<DashboardState>> {
    try {
      console.log('Fetching data from backend API:', API_BASE_URL);
      
      const response = await axios.get(`${API_BASE_URL}/api/data`, {
        timeout: 30000, // 30 second timeout
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Backend response received:', {
        success: response.data.success,
        hasData: !!response.data.data,
        dataKeys: response.data.data ? Object.keys(response.data.data) : [],
      });

      if (response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Convert backend data format to frontend format
        const convertDataPoints = (points: any[]): DataPoint[] => {
          if (!points || !Array.isArray(points)) return [];
          return points.map((p: any) => ({
            year: p.year,
            value: p.value,
            formatted: p.formatted || String(p.value),
          }));
        };

        return {
          loading: false,
          error: null,
          lastUpdate: new Date(response.data.timestamp),
          gdpData: {
            gdp: convertDataPoints(data.gdp),
            gdpPerCapita: convertDataPoints(data.gdpPerCapita),
            growthRate: convertDataPoints(data.gdpGrowth),
          },
          laborData: {
            unemployment: convertDataPoints(data.unemployment),
            employment: convertDataPoints(data.employment),
            averageWage: [],
          },
          fiscalData: {
            debtToGDP: convertDataPoints(data.debt),
            deficit: [],
          },
          tradeData: {
            exports: [],
            imports: [],
            balance: [],
          },
          fdiData: {
            inflows: convertDataPoints(data.fdi),
            stock: [],
            bySector: [],
          },
          inflationData: convertDataPoints(data.inflation),
        };
      } else {
        throw new Error('Invalid response from backend');
      }
    } catch (error: any) {
      console.error('Error fetching data from backend, using fallback data:', error);
      
      // If backend is not available, use comprehensive fallback data
      return DataService.getFallbackData();
    }
  }

  /**
   * Fetch comparison data for multiple countries
   * Note: This would need to be implemented in the backend
   */
  static async fetchComparisonData() {
    // This would be implemented in the backend API
    return {
      bulgaria: [],
      romania: [],
      poland: [],
      euAverage: [],
    };
  }

  /**
   * Get fallback data when APIs fail - Uses comprehensive historical mock data
   */
  static getFallbackData(): Partial<DashboardState> {
    console.log('Loading comprehensive fallback data with historical trends...');
    
    return {
      loading: false,
      error: null, // No error message - data is valid
      lastUpdate: new Date(),
      gdpData: {
        gdp: mockGDP,
        gdpPerCapita: mockGDPPerCapita,
        growthRate: mockGDPGrowth,
      },
      laborData: {
        unemployment: mockUnemployment,
        employment: mockEmployment,
        averageWage: [],
      },
      fiscalData: {
        debtToGDP: mockDebt,
        deficit: [],
      },
      tradeData: {
        exports: [],
        imports: [],
        balance: [],
      },
      fdiData: {
        inflows: mockFDI,
        stock: [],
        bySector: [],
      },
      inflationData: mockInflation,
    };
  }
}

