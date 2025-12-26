import { Suspense, useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useScrollSection } from '../hooks/useScrollSection';
import { useMapData } from '../hooks/useMapData';
import MainScene from './scenes/MainScene';
import ScrollProgress from './ui/ScrollProgress';
import NavigationDots from './ui/NavigationDots';
import RegionLegend from './ui/RegionLegend';
import MetricsPanel from './ui/MetricsPanel';
import BulgarianSVGMap from './map/BulgarianSVGMap';
import FDIBySectorChart from './charts/FDIBySectorChart';
import type { RegionData } from '../hooks/useMapData';

interface RDData {
  region: string;
  region_en: string;
  nuts_code: string;
  total: number;
  business_enterprises: number | null;
  government: number | null;
  higher_education: number | null;
  non_profit_institutions: number | null;
}

interface RDExpenditureData {
  year: number;
  source: string;
  total: any;
  macro_regions: RDData[];
}

// Mapping between individual regions and macro regions
const regionToMacroRegion: Record<string, string> = {
  // Northwestern (BG31)
  'bg313': 'BG31', // Vidin
  'bg314': 'BG31', // Montana
  'bg315': 'BG31', // Vratsa
  
  // North Central (BG32)
  'bg321': 'BG32', // Veliko Tarnovo
  'bg322': 'BG32', // Gabrovo
  'bg323': 'BG32', // Lovech
  'bg324': 'BG32', // Pleven
  'bg325': 'BG32', // Ruse
  
  // Northeastern (BG33)
  'bg331': 'BG33', // Varna
  'bg332': 'BG33', // Dobrich
  'bg333': 'BG33', // Razgrad
  'bg334': 'BG33', // Silistra
  'bg335': 'BG33', // Shumen
  'bg336': 'BG33', // Targovishte
  
  // Southeastern (BG34)
  'bg341': 'BG34', // Burgas
  'bg342': 'BG34', // Sliven
  'bg343': 'BG34', // Yambol
  
  // Southwestern (BG41)
  'bg411': 'BG41', // Sofia (capital)
  'bg412': 'BG41', // Sofia
  'bg413': 'BG41', // Blagoevgrad
  'bg414': 'BG41', // Kyustendil
  'bg415': 'BG41', // Pernik
  
  // South Central (BG42)
  'bg421': 'BG42', // Plovdiv
  'bg422': 'BG42', // Haskovo
  'bg423': 'BG42', // Kardzhali
  'bg424': 'BG42', // Pazardzhik
  'bg425': 'BG42', // Smolyan
  'bg426': 'BG42', // Stara Zagora
};

interface PopulationData {
  nuts_code: string;
  name: string;
  name_en: string;
  population_trend: Array<{
    year: number;
    total: number;
    change_pct: number | null;
  }>;
}

interface NaturalMovementData {
  nuts_code: string;
  name: string;
  name_en: string;
  natural_movement: {
    live_births: {
      total: number;
      male: number;
      female: number;
      rate_per_1000: number;
    };
    deaths: {
      total: number;
      male: number;
      female: number;
      rate_per_1000: number;
    };
    natural_increase: {
      total: number;
      rate_per_1000: number;
    };
    marriages: {
      total: number;
      rate_per_1000: number;
    };
    divorces: {
      total: number;
      rate_per_1000: number;
    };
    infant_mortality: {
      total: number;
      male: number;
      female: number;
      rate_per_1000_births: number;
    };
  };
}

interface FDIData {
  source: string;
  description: string;
  unit: string;
  years: number[];
  last_updated: string;
  sectors: Array<{
    code: string;
    name: string;
    investments: {
      [year: string]: number | null;
    };
  }>;
}

interface RegionalFDIData {
  source: string;
  description: string;
  unit: string;
  year: number;
  regions: Array<{
    code: string;
    name: string;
    fdi_2024: number;
  }>;
}

export default function PerspectiveView() {
  useSmoothScroll();
  const currentSection = useScrollSection();
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [rdData, setRdData] = useState<RDExpenditureData | null>(null);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [naturalMovementData, setNaturalMovementData] = useState<NaturalMovementData[]>([]);
  const [fdiData, setFdiData] = useState<FDIData | null>(null);
  const [regionalFdiData, setRegionalFdiData] = useState<RegionalFDIData | null>(null);
  
  const { geoData, regionData, loading } = useMapData('bulgaria');

  // Load R&D data
  useEffect(() => {
    fetch('/data/rd-expenditure-2024.json')
      .then((res) => res.json())
      .then((data) => setRdData(data))
      .catch((error) => console.error('Error loading R&D data:', error));
  }, []);

  // Load population trends data
  useEffect(() => {
    fetch('/data/population-trends-2015-2023.json')
      .then((res) => res.json())
      .then((data) => setPopulationData(data.regions || []))
      .catch((error) => console.error('Error loading population data:', error));
  }, []);

  // Load natural movement data
  useEffect(() => {
    fetch('/data/natural-movement-2023.json')
      .then((res) => res.json())
      .then((data) => setNaturalMovementData(data.regions || []))
      .catch((error) => console.error('Error loading natural movement data:', error));
  }, []);

  // Load FDI data
  useEffect(() => {
    fetch('/data/fdi_by_sector.json')
      .then((res) => res.json())
      .then((data) => setFdiData(data))
      .catch((error) => console.error('Error loading FDI data:', error));
  }, []);

  // Load regional FDI data
  useEffect(() => {
    fetch('/data/fdi_by_regions_2024.json')
      .then((res) => res.json())
      .then((data) => setRegionalFdiData(data))
      .catch((error) => console.error('Error loading regional FDI data:', error));
  }, []);

  const handleRegionClick = (region: RegionData) => {
    setSelectedRegion(region);
  };

  // Get R&D data for a specific region
  const getRegionRD = (regionId: string): RDData | null => {
    if (!rdData) return null;
    const macroRegionCode = regionToMacroRegion[regionId.toLowerCase()];
    if (!macroRegionCode) return null;
    return rdData.macro_regions.find(r => r.nuts_code === macroRegionCode) || null;
  };

  // Get population data for a specific region
  const getRegionPopulation = (nutsCode: string): PopulationData | null => {
    if (!populationData.length) return null;
    return populationData.find(p => p.nuts_code.toUpperCase() === nutsCode.toUpperCase()) || null;
  };

  // Get natural movement data for a specific region
  const getRegionNaturalMovement = (nutsCode: string): NaturalMovementData | null => {
    if (!naturalMovementData.length) return null;
    return naturalMovementData.find(n => n.nuts_code.toUpperCase() === nutsCode.toUpperCase()) || null;
  };

  // Get regional FDI data for a specific region
  const getRegionFDI = (nutsCode: string): number | null => {
    if (!regionalFdiData) return null;
    const region = regionalFdiData.regions.find(r => r.code.toUpperCase() === nutsCode.toUpperCase());
    return region ? region.fdi_2024 : null;
  };

  // Format currency for display
  const formatRD = (value: number | null): string => {
    if (value === null) return '..';
    return `€${(value / 1000).toFixed(1)}M`;
  };

  // Format population number
  const formatPopulation = (value: number): string => {
    return value.toLocaleString('en-US');
  };

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation Dots */}
      <NavigationDots currentSection={currentSection} onNavigate={() => {}} />

      {/* Region Legend - Only show when map section is visible */}
      <RegionLegend visible={currentSection === 'bulgaria'} />

      {/* Metrics Panel */}
      {selectedRegion && (
        <MetricsPanel region={selectedRegion} onClose={() => setSelectedRegion(null)} />
      )}

      {/* Hero Section - Europe Overview */}
      <section className="europe-section scroll-section hero-section relative">
        <div className="grid-pattern" />
        <Suspense fallback={<div className="text-lime-400">Loading 3D Scene...</div>}>
          <MainScene />
        </Suspense>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 animate-float bg-gradient-to-r from-lime-400 via-lime-300 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Perspective for Bulgaria
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-lime-400">
            Iliya & Martin
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            An interactive journey through Bulgaria's economic landscape, from European context to regional insights
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button className="btn-primary w-full sm:w-auto px-6 py-3 text-sm sm:text-base">
              Explore Now
            </button>
            <button className="btn-secondary w-full sm:w-auto px-6 py-3 text-sm sm:text-base">
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Bulgaria Section */}
      <section className="bulgaria-section scroll-section relative bg-gradient-to-b from-black to-dark-green">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <MainScene />
          </Suspense>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lime-400 mb-6 sm:mb-8 text-center">
              Discover Bulgaria
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 text-center max-w-3xl mx-auto px-2">
              Explore regional development metrics, economic indicators, and growth opportunities across Bulgaria's dynamic regions
            </p>
            
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lime-400"></div>
              </div>
            ) : (
              <div className="relative">
                <BulgarianSVGMap
                  regionData={regionData}
                  onRegionClick={handleRegionClick}
                  width={1000}
                  height={652}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Regional Details Section */}
      <section className="details-section scroll-section relative bg-gradient-to-b from-dark-green to-black">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <MainScene />
          </Suspense>
        </div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-hero text-cyan-400 mb-8 text-center">
              Regional Deep Dive
            </h2>
            <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
              Click on any region above to explore detailed economic data, industries, and development indicators
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionData.map((region) => {
                const rdRegionData = getRegionRD(region.id);
                const populationRegionData = getRegionPopulation(region.nuts_code);
                const naturalMovementRegionData = getRegionNaturalMovement(region.nuts_code);
                const regionFDI = getRegionFDI(region.nuts_code);
                const latestPopTrend = populationRegionData?.population_trend[populationRegionData.population_trend.length - 1];
                const previousPopTrend = populationRegionData?.population_trend[populationRegionData.population_trend.length - 2];
                
                return (
                  <div
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    className="glass-dark p-6 cursor-pointer hover:glow-lime transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <h3 className="text-2xl font-bold text-lime-400 mb-4">{region.name}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">GDP per Capita:</span>
                        <span className="font-mono text-white font-semibold">
                          ${region.metrics.gdp.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Population (2023):</span>
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-white font-semibold">
                            {latestPopTrend ? formatPopulation(latestPopTrend.total) : region.metrics.population.toLocaleString()}
                          </span>
                          {latestPopTrend && latestPopTrend.change_pct !== null && (
                            <span className={`text-xs font-mono ${
                              latestPopTrend.change_pct > 0 ? 'text-lime-400' : 
                              latestPopTrend.change_pct < 0 ? 'text-pink-400' : 
                              'text-gray-400'
                            }`}>
                              {latestPopTrend.change_pct > 0 ? '↑' : latestPopTrend.change_pct < 0 ? '↓' : '→'} 
                              {Math.abs(latestPopTrend.change_pct).toFixed(2)}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Development:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          region.developmentLevel === 'high' ? 'bg-lime-400/20 text-lime-400' :
                          region.developmentLevel === 'medium' ? 'bg-cyan-400/20 text-cyan-400' :
                          'bg-pink-400/20 text-pink-400'
                        }`}>
                          {region.developmentLevel.toUpperCase()}
                        </span>
                      </div>
                      {regionFDI !== null && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">FDI (2024):</span>
                          <span className="font-mono text-yellow-400 font-semibold">
                            €{(regionFDI / 1000000).toFixed(2)}B
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Population Trends Section */}
                    {populationRegionData && (
                      <div className="mt-4 pt-4 border-t border-cyan-400/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-cyan-400">📊 Population Trend (2015-2023)</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">2015:</span>
                            <span className="font-mono text-gray-400">
                              {formatPopulation(populationRegionData.population_trend[0].total)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">2023:</span>
                            <span className="font-mono text-white font-semibold">
                              {formatPopulation(latestPopTrend!.total)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Total Change:</span>
                            <span className={`font-mono font-semibold ${
                              ((latestPopTrend!.total - populationRegionData.population_trend[0].total) / populationRegionData.population_trend[0].total * 100) > 0 
                                ? 'text-lime-400' 
                                : 'text-pink-400'
                            }`}>
                              {((latestPopTrend!.total - populationRegionData.population_trend[0].total) / populationRegionData.population_trend[0].total * 100).toFixed(2)}%
                            </span>
                          </div>
                          {/* Mini sparkline visualization */}
                          <div className="h-8 flex items-end justify-between gap-0.5 mt-2">
                            {populationRegionData.population_trend.slice(-5).map((trend, idx) => {
                              const maxPop = Math.max(...populationRegionData.population_trend.map(t => t.total));
                              const minPop = Math.min(...populationRegionData.population_trend.map(t => t.total));
                              const height = ((trend.total - minPop) / (maxPop - minPop)) * 100;
                              return (
                                <div
                                  key={idx}
                                  className="flex-1 bg-cyan-400/60 hover:bg-cyan-400 transition-all rounded-t"
                                  style={{ height: `${Math.max(height, 20)}%` }}
                                  title={`${trend.year}: ${formatPopulation(trend.total)}`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Natural Movement Section */}
                    {naturalMovementRegionData && (
                      <div className="mt-4 pt-4 border-t border-purple-400/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-purple-400">👶 Demographics 2023</span>
                        </div>
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex flex-col">
                              <span className="text-gray-500">Births:</span>
                              <span className="font-mono text-lime-400 font-semibold">
                                {naturalMovementRegionData.natural_movement.live_births.total.toLocaleString()}
                                <span className="text-gray-500 ml-1">({naturalMovementRegionData.natural_movement.live_births.rate_per_1000}‰)</span>
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-500">Deaths:</span>
                              <span className="font-mono text-pink-400 font-semibold">
                                {naturalMovementRegionData.natural_movement.deaths.total.toLocaleString()}
                                <span className="text-gray-500 ml-1">({naturalMovementRegionData.natural_movement.deaths.rate_per_1000}‰)</span>
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-500">Natural Increase:</span>
                              <span className={`font-mono font-semibold ${
                                naturalMovementRegionData.natural_movement.natural_increase.total >= 0 
                                  ? 'text-lime-400' 
                                  : 'text-pink-400'
                              }`}>
                                {naturalMovementRegionData.natural_movement.natural_increase.total >= 0 ? '+' : ''}
                                {naturalMovementRegionData.natural_movement.natural_increase.total.toLocaleString()}
                                <span className="text-gray-500 ml-1">({naturalMovementRegionData.natural_movement.natural_increase.rate_per_1000}‰)</span>
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-500">Marriages:</span>
                              <span className="font-mono text-cyan-400">
                                {naturalMovementRegionData.natural_movement.marriages.total.toLocaleString()}
                                <span className="text-gray-500 ml-1">({naturalMovementRegionData.natural_movement.marriages.rate_per_1000}‰)</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs pt-2">
                            <span className="text-gray-500">Infant Mortality:</span>
                            <span className="font-mono text-orange-400">
                              {naturalMovementRegionData.natural_movement.infant_mortality.rate_per_1000_births}‰
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* R&D Expenditure Section */}
                    {rdRegionData && (
                      <div className="mt-4 pt-4 border-t border-orange-400/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-orange-400">🔬 R&D Expenditure 2024</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Total R&D:</span>
                            <span className="font-mono text-orange-400 font-semibold">
                              {formatRD(rdRegionData.total)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex flex-col">
                              <span className="text-gray-500">Business:</span>
                              <span className="font-mono text-lime-400">{formatRD(rdRegionData.business_enterprises)}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-500">Gov:</span>
                              <span className="font-mono text-cyan-400">{formatRD(rdRegionData.government)}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-500">Education:</span>
                              <span className="font-mono text-pink-400">{formatRD(rdRegionData.higher_education)}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-500">Non-Profit:</span>
                              <span className="font-mono text-purple-400">{formatRD(rdRegionData.non_profit_institutions)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex flex-wrap gap-2">
                        {region.metrics.industries.slice(0, 2).map((industry) => (
                          <span key={industry} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                            {industry}
                          </span>
                        ))}
                        {region.metrics.industries.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{region.metrics.industries.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FDI by Sector Section */}
            {fdiData && (
              <div className="mt-16">
                <FDIBySectorChart data={fdiData} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-lime-400/20 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-2xl font-bold text-lime-400 mb-4">
              Perspective for Bulgaria
            </h3>
            <Globe className="w-12 h-12 text-lime-400 mb-4" />
          </div>
          <p className="text-gray-400 mb-6">
            Created by Iliya & Martin
          </p>
          <p className="text-sm text-gray-500">
            Data sources: World Bank, Eurostat, Bulgarian National Statistical Institute
          </p>
        </div>
      </footer>
    </div>
  );
}

