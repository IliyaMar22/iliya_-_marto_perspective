import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { AreaChart } from '../charts/AreaChart';
import { LineChart } from '../charts/LineChart';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorDisplay } from '../ui/ErrorDisplay';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

export const EconomicGrowth: React.FC = () => {
  const { gdpData, loading, error } = useDashboardStore();

  // Debug logging
  React.useEffect(() => {
    console.log('EconomicGrowth component - Data state:', {
      loading,
      hasGdpData: !!gdpData,
      gdpGrowthLength: gdpData?.growthRate?.length || 0,
      gdpLength: gdpData?.gdp?.length || 0,
      error,
    });
  }, [gdpData, loading, error]);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-black">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error && !gdpData) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-black">
        <div className="container mx-auto">
          <ErrorDisplay message={error} />
        </div>
      </section>
    );
  }

  const gdpGrowthData = gdpData?.growthRate || [];
  const gdpDataPoints = gdpData?.gdp || [];
  const gdpPerCapitaData = gdpData?.gdpPerCapita || [];

  // Calculate key metrics
  const latestGrowth = gdpGrowthData.length > 0 ? gdpGrowthData[gdpGrowthData.length - 1].value : null;
  const latestGDP = gdpDataPoints.length > 0 ? gdpDataPoints[gdpDataPoints.length - 1].value : null;
  const firstGDP = gdpDataPoints.length > 0 ? gdpDataPoints[0].value : null;
  const growthSince2000 = firstGDP && latestGDP ? ((latestGDP - firstGDP) / firstGDP) * 100 : null;

  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-hero text-lime-400 mb-3 sm:mb-4">
            Economic Growth Story
          </h2>
          <p className="text-subtitle max-w-3xl mx-auto px-2">
            Bulgaria has demonstrated remarkable economic resilience and growth, consistently outperforming regional averages and converging with EU standards.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="glass-dark p-4 sm:p-6 border border-lime-400/20">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-lime-400" />
              <h3 className="text-sm font-medium text-gray-400 uppercase">Current Growth</h3>
            </div>
            <p className="text-3xl font-bold text-lime-400">
              {latestGrowth !== null ? formatPercentage(latestGrowth) : 'N/A'}
            </p>
            <p className="text-sm text-gray-400 mt-2">Annual GDP growth rate</p>
          </div>

          <div className="glass-dark p-6 border border-lime-400/20">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-lime-400" />
              <h3 className="text-sm font-medium text-gray-400 uppercase">GDP (2024)</h3>
            </div>
            <p className="text-3xl font-bold text-lime-400">
              {latestGDP !== null ? formatCurrency(latestGDP) : 'N/A'}
            </p>
            <p className="text-sm text-gray-400 mt-2">Current market prices</p>
          </div>

          <div className="glass-dark p-6 border border-lime-400/20">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-lime-400" />
              <h3 className="text-sm font-medium text-gray-400 uppercase">Growth Since 2000</h3>
            </div>
            <p className="text-3xl font-bold text-lime-400">
              {growthSince2000 !== null ? formatPercentage(growthSince2000) : 'N/A'}
            </p>
            <p className="text-sm text-gray-400 mt-2">Cumulative expansion</p>
          </div>
        </div>

        {/* GDP Growth Chart */}
        {gdpGrowthData.length > 0 ? (
          <div className="glass-dark p-6 mb-8 border border-lime-400/20">
            <h3 className="text-2xl font-bold text-lime-400 mb-4">
              GDP Growth Rate (Annual %)
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Bulgaria's GDP growth has been consistently positive, showing resilience through global economic challenges.
            </p>
            <LineChart
              data={gdpGrowthData}
              height={400}
              yAxisLabel="Growth Rate (%)"
              formatYAxis={(value) => `${value}%`}
            />
          </div>
        ) : (
          <div className="glass-dark border border-orange-400/30 rounded-lg p-6 mb-8">
            <p className="text-orange-400">
              ⚠️ No GDP Growth data available. {error ? `Error: ${error}` : 'Loading data...'}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Data points: {gdpGrowthData.length} | Check browser console for details.
            </p>
          </div>
        )}

        {/* GDP Trend Chart */}
        {gdpDataPoints.length > 0 ? (
          <div className="glass-dark p-6 mb-8 border border-lime-400/20">
            <h3 className="text-2xl font-bold text-lime-400 mb-4">
              GDP Evolution (2000-2024)
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Bulgaria's GDP has grown significantly since EU accession, demonstrating strong economic fundamentals.
            </p>
            <AreaChart
              data={gdpDataPoints}
              height={400}
              yAxisLabel="GDP (EUR)"
              formatYAxis={(value) => formatCurrency(value, 'EUR')}
            />
          </div>
        ) : (
          <div className="glass-dark border border-orange-400/30 rounded-lg p-6 mb-8">
            <p className="text-orange-400">
              ⚠️ No GDP data available. Data points: {gdpDataPoints.length}
            </p>
          </div>
        )}

        {/* GDP Per Capita */}
        {gdpPerCapitaData.length > 0 ? (
          <div className="glass-dark p-6 border border-lime-400/20">
            <h3 className="text-2xl font-bold text-lime-400 mb-4">
              GDP Per Capita
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Steady improvement in living standards and purchasing power.
            </p>
            <LineChart
              data={gdpPerCapitaData}
              height={400}
              yAxisLabel="GDP Per Capita (EUR)"
              formatYAxis={(value) => formatCurrency(value, 'EUR')}
            />
          </div>
        ) : (
          <div className="glass-dark border border-orange-400/30 rounded-lg p-6">
            <p className="text-orange-400">
              ⚠️ No GDP Per Capita data available. Data points: {gdpPerCapitaData.length}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

