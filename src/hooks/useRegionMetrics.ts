import { useState, useEffect } from 'react';
import type { RegionData } from './useMapData';

export const useRegionMetrics = (regionId: string | null) => {
  const [metrics, setMetrics] = useState<RegionData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!regionId) {
      setMetrics(null);
      return;
    }

    const fetchMetrics = async () => {
      setLoading(true);
      try {
        // Simulate API call - replace with actual API endpoint
        const response = await fetch(`/data/bulgaria-metrics.json`);
        const data = await response.json();
        const region = data.regions.find((r: RegionData) => r.id === regionId);
        setMetrics(region || null);
      } catch (error) {
        console.error('Error fetching region metrics:', error);
        setMetrics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [regionId]);

  return { metrics, loading };
};

