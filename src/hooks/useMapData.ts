import { useState, useEffect } from 'react';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { GeoJSON } from 'geojson';

export interface RegionData {
  id: string;
  name: string;
  name_en?: string;
  nuts_code?: string;
  parent_region?: string;
  coordinates: [number, number];
  metrics: {
    gdp: number;
    gdp_per_capita?: number;
    gva_total?: number;
    gva_agriculture?: number;
    gva_industry?: number;
    gva_services?: number;
    ppp?: number;
    population: number;
    unemployment?: number;
    industries: string[];
  };
  developmentLevel: 'high' | 'medium' | 'low';
}

export const useMapData = (mapType: 'europe' | 'bulgaria') => {
  const [geoData, setGeoData] = useState<GeoJSON | null>(null);
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        setLoading(true);
        
        if (mapType === 'bulgaria') {
          // Load Bulgaria GeoJSON data
          const response = await fetch('/data/bulgaria.geojson');
          const data = await response.json();
          setGeoData(data);
          
          // Load NSI regional metrics (2023 data)
          const metricsResponse = await fetch('/data/nsi-regions-2023.json');
          const metrics = await metricsResponse.json();
          setRegionData(metrics.regions || []);
        } else {
          // Load Europe TopoJSON data
          const response = await fetch('/data/europe.topojson');
          const topoData: Topology = await response.json();
          
          // Convert TopoJSON to GeoJSON
          const geoJson = feature(
            topoData,
            topoData.objects.countries as GeometryCollection
          );
          setGeoData(geoJson);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading map data:', err);
        setError('Failed to load map data');
        setLoading(false);
      }
    };

    loadMapData();
  }, [mapType]);

  return { geoData, regionData, loading, error };
};

