import React, { useEffect, useState } from 'react';
import { 
  fetchAllData360Indicators, 
  fetchKeyHighlights, 
  getLatestValue,
  getDataSummary 
} from '../../services/worldBankData360';
import { DataPoint } from '../../types';
import { CHART_COLORS, INDICATOR_CATEGORIES } from '../../constants/indicators';
import { LineChart } from '../charts/LineChart';
import { BarChart } from '../charts/BarChart';
import SimpleStatCard from '../ui/SimpleStatCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface CategoryData {
  [key: string]: DataPoint[];
}

interface Data360State {
  people: CategoryData;
  prosperity: CategoryData;
  planet: CategoryData;
  infrastructure: CategoryData;
  digital: CategoryData;
  loading: boolean;
  error: string | null;
}

const Data360Dashboard: React.FC = () => {
  const [data, setData] = useState<Data360State>({
    people: {},
    prosperity: {},
    planet: {},
    infrastructure: {},
    digital: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        const allData = await fetchAllData360Indicators();
        
        setData({
          people: allData.people,
          prosperity: allData.prosperity,
          planet: allData.planet,
          infrastructure: allData.infrastructure,
          digital: allData.digital,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error loading Data360 indicators:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load data. Please try again later.',
        }));
      }
    };

    loadData();
  }, []);

  if (data.loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 text-lg">Loading comprehensive World Bank Data360 indicators...</p>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{data.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50">
      {/* Header - Responsive */}
      <header className="bg-gradient-to-r from-green-700 to-green-600 text-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4">
            Bulgaria Data360: Economic & Social Indicators
          </h1>
          <p className="text-sm sm:text-base lg:text-xl opacity-90">
            Analysis across People, Prosperity, Planet, Infrastructure, and Digital dimensions
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* People Section */}
        <PeopleSection data={data.people} />
        
        {/* Prosperity Section */}
        <ProsperitySection data={data.prosperity} />
        
        {/* Planet Section */}
        <PlanetSection data={data.planet} />
        
        {/* Infrastructure Section */}
        <InfrastructureSection data={data.infrastructure} />
        
        {/* Digital Section */}
        <DigitalSection data={data.digital} />
      </div>
    </div>
  );
};

/* ==================== PEOPLE SECTION ==================== */
const PeopleSection: React.FC<{ data: CategoryData }> = ({ data }) => {
  const lifeExpectancy = getLatestValue(data.LIFE_EXPECTANCY || []);
  const laborForceFemale = getLatestValue(data.LABOR_FORCE_FEMALE || []);
  const learningPoverty = getLatestValue(data.LEARNING_POVERTY || []);
  const giniIndex = getLatestValue(data.GINI_INDEX || []);

  return (
    <section className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
          <span className="text-2xl">👥</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">People</h2>
          <p className="text-gray-600">Education, Health, Labor & Demographics</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SimpleStatCard
          title="Life Expectancy"
          value={lifeExpectancy ? `${lifeExpectancy.value.toFixed(1)} years` : 'N/A'}
          subtitle={lifeExpectancy ? `as of ${lifeExpectancy.year}` : ''}
          icon="❤️"
          color="purple"
        />
        <SimpleStatCard
          title="Female Labor Force"
          value={laborForceFemale ? `${laborForceFemale.value.toFixed(1)}%` : 'N/A'}
          subtitle={laborForceFemale ? `as of ${laborForceFemale.year}` : ''}
          icon="👩‍💼"
          color="purple"
        />
        <SimpleStatCard
          title="Learning Poverty"
          value={learningPoverty ? `${learningPoverty.value.toFixed(1)}%` : 'N/A'}
          subtitle={learningPoverty ? `as of ${learningPoverty.year}` : ''}
          icon="📚"
          color="purple"
        />
        <SimpleStatCard
          title="Gini Index"
          value={giniIndex ? giniIndex.value.toFixed(1) : 'N/A'}
          subtitle={giniIndex ? `as of ${giniIndex.year}` : ''}
          icon="⚖️"
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.LIFE_EXPECTANCY && data.LIFE_EXPECTANCY.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Life Expectancy Trend
            </h3>
            <LineChart
              data={data.LIFE_EXPECTANCY}
              
              yAxisLabel="Years"
            />
          </div>
        )}
        
        {data.LABOR_FORCE_FEMALE && data.LABOR_FORCE_FEMALE.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Female Labor Force Participation
            </h3>
            <LineChart
              data={data.LABOR_FORCE_FEMALE}
              
              yAxisLabel="% of female population 15+"
            />
          </div>
        )}
        
        {data.POPULATION_TOTAL && data.POPULATION_TOTAL.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Total Population
            </h3>
            <LineChart
              data={data.POPULATION_TOTAL}
              
              yAxisLabel="Population"
            />
          </div>
        )}
        
        {data.PHYSICIANS_DENSITY && data.PHYSICIANS_DENSITY.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Physicians Density
            </h3>
            <LineChart
              data={data.PHYSICIANS_DENSITY}
              
              yAxisLabel="Per 1,000 people"
            />
          </div>
        )}
      </div>
    </section>
  );
};

/* ==================== PROSPERITY SECTION ==================== */
const ProsperitySection: React.FC<{ data: CategoryData }> = ({ data }) => {
  const gdpGrowth = getLatestValue(data.GDP_GROWTH_ANNUAL || []);
  const accountOwnership = getLatestValue(data.ACCOUNT_OWNERSHIP || []);
  const exports = getLatestValue(data.EXPORTS_GOODS_SERVICES || []);
  const rdExpenditure = getLatestValue(data.RESEARCH_DEVELOPMENT || []);

  return (
    <section className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
          <span className="text-2xl">💰</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Prosperity</h2>
          <p className="text-gray-600">Economic Performance, Trade & Innovation</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SimpleStatCard
          title="GDP Growth"
          value={gdpGrowth ? `${gdpGrowth.value.toFixed(2)}%` : 'N/A'}
          subtitle={gdpGrowth ? `as of ${gdpGrowth.year}` : ''}
          icon="📈"
          color="prosperity"
        />
        <SimpleStatCard
          title="Financial Account Ownership"
          value={accountOwnership ? `${accountOwnership.value.toFixed(1)}%` : 'N/A'}
          subtitle={accountOwnership ? `as of ${accountOwnership.year}` : ''}
          icon="🏦"
          color="prosperity"
        />
        <SimpleStatCard
          title="Exports (% of GDP)"
          value={exports ? `${exports.value.toFixed(1)}%` : 'N/A'}
          subtitle={exports ? `as of ${exports.year}` : ''}
          icon="🚢"
          color="prosperity"
        />
        <SimpleStatCard
          title="R&D Expenditure"
          value={rdExpenditure ? `${rdExpenditure.value.toFixed(2)}%` : 'N/A'}
          subtitle={rdExpenditure ? `of GDP, ${rdExpenditure.year}` : ''}
          icon="🔬"
          color="prosperity"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.GNI_PER_CAPITA && data.GNI_PER_CAPITA.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              GNI Per Capita
            </h3>
            <LineChart
              data={data.GNI_PER_CAPITA}
              
              yAxisLabel="Current US$"
            />
          </div>
        )}
        
        {data.EXPORTS_GOODS_SERVICES && data.IMPORTS_GOODS_SERVICES && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Trade Balance (Exports vs Imports)
            </h3>
            <LineChart
              data={data.EXPORTS_GOODS_SERVICES}
              
              yAxisLabel="% of GDP"
            />
          </div>
        )}
        
        {data.FDI_INFLOWS_BOP && data.FDI_INFLOWS_BOP.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Foreign Direct Investment Inflows
            </h3>
            <BarChart
              data={data.FDI_INFLOWS_BOP.slice(-10)}
              
              yAxisLabel="Current US$ (millions)"
            />
          </div>
        )}
        
        {data.HIGH_TECH_EXPORTS && data.HIGH_TECH_EXPORTS.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              High-Technology Exports
            </h3>
            <LineChart
              data={data.HIGH_TECH_EXPORTS}
              
              yAxisLabel="Current US$"
            />
          </div>
        )}
      </div>
    </section>
  );
};

/* ==================== PLANET SECTION ==================== */
const PlanetSection: React.FC<{ data: CategoryData }> = ({ data }) => {
  const co2Emissions = getLatestValue(data.CO2_EMISSIONS || []);
  const renewableEnergy = getLatestValue(data.RENEWABLE_ENERGY || []);
  const waterStress = getLatestValue(data.WATER_STRESS || []);
  const forestArea = getLatestValue(data.FOREST_AREA || []);

  return (
    <section className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
          <span className="text-2xl">🌍</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Planet</h2>
          <p className="text-gray-600">Environment, Energy & Climate</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SimpleStatCard
          title="CO2 Emissions"
          value={co2Emissions ? `${co2Emissions.value.toFixed(2)}` : 'N/A'}
          subtitle={co2Emissions ? `metric tons per capita, ${co2Emissions.year}` : ''}
          icon="🏭"
          color="planet"
        />
        <SimpleStatCard
          title="Renewable Energy"
          value={renewableEnergy ? `${renewableEnergy.value.toFixed(1)}%` : 'N/A'}
          subtitle={renewableEnergy ? `of total, ${renewableEnergy.year}` : ''}
          icon="♻️"
          color="planet"
        />
        <SimpleStatCard
          title="Water Stress"
          value={waterStress ? `${waterStress.value.toFixed(1)}%` : 'N/A'}
          subtitle={waterStress ? `as of ${waterStress.year}` : ''}
          icon="💧"
          color="planet"
        />
        <SimpleStatCard
          title="Forest Area"
          value={forestArea ? `${forestArea.value.toFixed(1)}%` : 'N/A'}
          subtitle={forestArea ? `of land area, ${forestArea.year}` : ''}
          icon="🌲"
          color="planet"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.GHG_EMISSIONS && data.GHG_EMISSIONS.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Total Greenhouse Gas Emissions
            </h3>
            <LineChart
              data={data.GHG_EMISSIONS}
              
              yAxisLabel="kt of CO2 equivalent"
            />
          </div>
        )}
        
        {data.RENEWABLE_ENERGY && data.RENEWABLE_ENERGY.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Renewable Energy Consumption
            </h3>
            <LineChart
              data={data.RENEWABLE_ENERGY}
              
              yAxisLabel="% of total final energy"
            />
          </div>
        )}
        
        {data.FOREST_AREA && data.FOREST_AREA.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Forest Area Coverage
            </h3>
            <LineChart
              data={data.FOREST_AREA}
              
              yAxisLabel="% of land area"
            />
          </div>
        )}
        
        {data.PM25_AIR_POLLUTION && data.PM25_AIR_POLLUTION.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              PM2.5 Air Pollution
            </h3>
            <LineChart
              data={data.PM25_AIR_POLLUTION}
              
              yAxisLabel="μg/m³"
            />
          </div>
        )}
      </div>
    </section>
  );
};

/* ==================== INFRASTRUCTURE SECTION ==================== */
const InfrastructureSection: React.FC<{ data: CategoryData }> = ({ data }) => {
  const accessElectricity = getLatestValue(data.ACCESS_ELECTRICITY || []);
  const urbanPopulation = getLatestValue(data.URBAN_POPULATION_PERCENT || []);
  const accessWater = getLatestValue(data.ACCESS_CLEAN_WATER || []);
  const roadsPaved = getLatestValue(data.ROADS_PAVED || []);

  return (
    <section className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
          <span className="text-2xl">🏗️</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Infrastructure</h2>
          <p className="text-gray-600">Transport, Energy, Water & Urban Development</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SimpleStatCard
          title="Access to Electricity"
          value={accessElectricity ? `${accessElectricity.value.toFixed(1)}%` : 'N/A'}
          subtitle={accessElectricity ? `as of ${accessElectricity.year}` : ''}
          icon="⚡"
          color="infrastructure"
        />
        <SimpleStatCard
          title="Urban Population"
          value={urbanPopulation ? `${urbanPopulation.value.toFixed(1)}%` : 'N/A'}
          subtitle={urbanPopulation ? `as of ${urbanPopulation.year}` : ''}
          icon="🏙️"
          color="infrastructure"
        />
        <SimpleStatCard
          title="Access to Clean Water"
          value={accessWater ? `${accessWater.value.toFixed(1)}%` : 'N/A'}
          subtitle={accessWater ? `as of ${accessWater.year}` : ''}
          icon="🚰"
          color="infrastructure"
        />
        <SimpleStatCard
          title="Paved Roads"
          value={roadsPaved ? `${roadsPaved.value.toFixed(1)}%` : 'N/A'}
          subtitle={roadsPaved ? `of total roads, ${roadsPaved.year}` : ''}
          icon="🛣️"
          color="infrastructure"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.ELECTRIC_POWER_CONSUMPTION && data.ELECTRIC_POWER_CONSUMPTION.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Electric Power Consumption
            </h3>
            <LineChart
              data={data.ELECTRIC_POWER_CONSUMPTION}
              
              yAxisLabel="kWh per capita"
            />
          </div>
        )}
        
        {data.AIR_TRANSPORT_PASSENGERS && data.AIR_TRANSPORT_PASSENGERS.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Air Transport Passengers
            </h3>
            <LineChart
              data={data.AIR_TRANSPORT_PASSENGERS}
              
              yAxisLabel="Passengers carried"
            />
          </div>
        )}
        
        {data.URBAN_POPULATION_GROWTH && data.URBAN_POPULATION_GROWTH.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Urban Population Growth
            </h3>
            <BarChart
              data={data.URBAN_POPULATION_GROWTH.slice(-15)}
              
              yAxisLabel="Annual % growth"
            />
          </div>
        )}
        
        {data.ACCESS_SANITATION && data.ACCESS_SANITATION.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Access to Sanitation
            </h3>
            <LineChart
              data={data.ACCESS_SANITATION}
              
              yAxisLabel="% of population"
            />
          </div>
        )}
      </div>
    </section>
  );
};

/* ==================== DIGITAL SECTION ==================== */
const DigitalSection: React.FC<{ data: CategoryData }> = ({ data }) => {
  const internetUsers = getLatestValue(data.INTERNET_USERS || []);
  const mobileSubscriptions = getLatestValue(data.MOBILE_SUBSCRIPTIONS || []);
  const fixedBroadband = getLatestValue(data.FIXED_BROADBAND || []);
  const ictExports = getLatestValue(data.ICT_SERVICE_EXPORTS || []);

  return (
    <section className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <span className="text-2xl">💻</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Digital</h2>
          <p className="text-gray-600">Internet, ICT & Digital Innovation</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SimpleStatCard
          title="Internet Users"
          value={internetUsers ? `${internetUsers.value.toFixed(1)}%` : 'N/A'}
          subtitle={internetUsers ? `of population, ${internetUsers.year}` : ''}
          icon="🌐"
          color="digital"
        />
        <SimpleStatCard
          title="Mobile Subscriptions"
          value={mobileSubscriptions ? `${mobileSubscriptions.value.toFixed(1)}` : 'N/A'}
          subtitle={mobileSubscriptions ? `per 100 people, ${mobileSubscriptions.year}` : ''}
          icon="📱"
          color="digital"
        />
        <SimpleStatCard
          title="Fixed Broadband"
          value={fixedBroadband ? `${fixedBroadband.value.toFixed(1)}` : 'N/A'}
          subtitle={fixedBroadband ? `per 100 people, ${fixedBroadband.year}` : ''}
          icon="📡"
          color="digital"
        />
        <SimpleStatCard
          title="ICT Service Exports"
          value={ictExports ? `${ictExports.value.toFixed(1)}%` : 'N/A'}
          subtitle={ictExports ? `of service exports, ${ictExports.year}` : ''}
          icon="🚀"
          color="digital"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.INTERNET_USERS && data.INTERNET_USERS.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Internet Users Growth
            </h3>
            <LineChart
              data={data.INTERNET_USERS}
              
              yAxisLabel="% of population"
            />
          </div>
        )}
        
        {data.MOBILE_SUBSCRIPTIONS && data.MOBILE_SUBSCRIPTIONS.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Mobile Cellular Subscriptions
            </h3>
            <LineChart
              data={data.MOBILE_SUBSCRIPTIONS}
              
              yAxisLabel="Per 100 people"
            />
          </div>
        )}
        
        {data.FIXED_BROADBAND && data.FIXED_BROADBAND.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Fixed Broadband Penetration
            </h3>
            <LineChart
              data={data.FIXED_BROADBAND}
              
              yAxisLabel="Per 100 people"
            />
          </div>
        )}
        
        {data.SCIENTIFIC_ARTICLES && data.SCIENTIFIC_ARTICLES.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Scientific & Technical Publications
            </h3>
            <BarChart
              data={data.SCIENTIFIC_ARTICLES.slice(-10)}
              
              yAxisLabel="Number of articles"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Data360Dashboard;

