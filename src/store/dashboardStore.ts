import { create } from 'zustand';
import { DashboardState } from '../types';
import { DataService } from '../services/dataService';

interface DashboardStore extends Partial<DashboardState> {
  fetchData: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  loading: true,
  error: null,
  lastUpdate: null,
  gdpData: null,
  laborData: null,
  fiscalData: null,
  tradeData: null,
  fdiData: null,
  inflationData: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    
    try {
      const data = await DataService.fetchAllData();
      
      console.log('DataService returned:', {
        hasGdpData: !!data.gdpData,
        gdpGrowthLength: data.gdpData?.growthRate?.length || 0,
        gdpLength: data.gdpData?.gdp?.length || 0,
        error: data.error,
      });
      
      // If no data was fetched, use fallback
      if (!data.gdpData || data.gdpData.growthRate.length === 0) {
        console.warn('No GDP data found, using fallback');
        const fallback = DataService.getFallbackData();
        set({ ...fallback, loading: false });
      } else {
        console.log('Setting data in store:', {
          gdpGrowthPoints: data.gdpData.growthRate.length,
          gdpPoints: data.gdpData.gdp.length,
        });
        set({ ...data, loading: false });
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
      const fallback = DataService.getFallbackData();
      set({ ...fallback, loading: false });
    }
  },

  refreshData: async () => {
    // Clear cache and fetch fresh data
    const { cache } = await import('../utils/cache');
    cache.clear();
    await get().fetchData();
  },
}));

