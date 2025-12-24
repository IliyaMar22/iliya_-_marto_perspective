import { Suspense, useState, useEffect } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useScrollSection } from '../hooks/useScrollSection';
import { useMapData } from '../hooks/useMapData';
import MainScene from './scenes/MainScene';
import ScrollProgress from './ui/ScrollProgress';
import NavigationDots from './ui/NavigationDots';
import RegionLegend from './ui/RegionLegend';
import MetricsPanel from './ui/MetricsPanel';
import BulgarianSVGMap from './map/BulgarianSVGMap';
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

export default function PerspectiveView() {
  useSmoothScroll();
  const currentSection = useScrollSection();
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [rdData, setRdData] = useState<RDExpenditureData | null>(null);
  
  const { geoData, regionData, loading } = useMapData('bulgaria');

  // Load R&D data
  useEffect(() => {
    fetch('/data/rd-expenditure-2024.json')
      .then((res) => res.json())
      .then((data) => setRdData(data))
      .catch((error) => console.error('Error loading R&D data:', error));
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

  // Format currency for display
  const formatRD = (value: number | null): string => {
    if (value === null) return '..';
    return `€${(value / 1000).toFixed(1)}M`;
  };

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation Dots */}
      <NavigationDots currentSection={currentSection} onNavigate={() => {}} />

      {/* Region Legend */}
      <RegionLegend />

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
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-impact mb-6 animate-float">
            Perspective for Bulgaria
          </h1>
          <p className="text-subtitle mb-8">
            Iliya & Martin
          </p>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            An interactive journey through Bulgaria's economic landscape, from European context to regional insights
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn-primary">
              Explore Now
            </button>
            <button className="btn-secondary">
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
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-hero text-lime-400 mb-8 text-center">
              Discover Bulgaria
            </h2>
            <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
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
                        <span className="text-gray-400">Population:</span>
                        <span className="font-mono text-white font-semibold">
                          {region.metrics.population.toLocaleString()}
                        </span>
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
                    </div>
                    
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-lime-400/20 py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-lime-400 mb-4">
            Perspective for Bulgaria
          </h3>
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

