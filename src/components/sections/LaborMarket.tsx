import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { LineChart } from '../charts/LineChart';
import { BarChart } from '../charts/BarChart';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorDisplay } from '../ui/ErrorDisplay';
import { formatPercentage } from '../../utils/formatters';
import { Users, Briefcase, TrendingDown } from 'lucide-react';

export const LaborMarket: React.FC = () => {
  const { laborData, loading, error } = useDashboardStore();

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

  if (error && !laborData) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-black">
        <div className="container mx-auto">
          <ErrorDisplay message={error} />
        </div>
      </section>
    );
  }

  const unemploymentData = laborData?.unemployment || [];
  const employmentData = laborData?.employment || [];

  const latestUnemployment = unemploymentData.length > 0 
    ? unemploymentData[unemploymentData.length - 1].value 
    : null;
  const latestEmployment = employmentData.length > 0 
    ? employmentData[employmentData.length - 1].value 
    : null;

  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-hero text-lime-400 mb-4">
            Labor Market Excellence
          </h2>
          <p className="text-subtitle max-w-3xl mx-auto">
            Bulgaria boasts one of the strongest labor markets in the EU, with low unemployment, high employment rates, and a growing skilled workforce.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="glass-dark rounded-lg shadow-md p-6 border border-lime-400/20">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-6 h-6 text-lime-400" />
              <h3 className="text-sm font-medium text-gray-400 uppercase">Unemployment Rate</h3>
            </div>
            <p className="text-4xl font-bold text-lime-400">
              {latestUnemployment !== null ? formatPercentage(latestUnemployment) : '3.9%'}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              One of the lowest in the European Union
            </p>
            <p className="text-xs text-lime-400 mt-2">
              ✓ Below EU average of 6.2%
            </p>
          </div>

          <div className="glass-dark rounded-lg shadow-md p-6 border border-cyan-400/20">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-6 h-6 text-cyan-400" />
              <h3 className="text-sm font-medium text-gray-400 uppercase">Employment Rate</h3>
            </div>
            <p className="text-4xl font-bold text-cyan-400">
              {latestEmployment !== null ? formatPercentage(latestEmployment) : '70.4%'}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Strong labor force participation
            </p>
            <p className="text-xs text-cyan-400 mt-2">
              ✓ Above EU average of 68.2%
            </p>
          </div>
        </div>

        {/* Unemployment Trend */}
        {unemploymentData.length > 0 && (
          <div className="glass-dark p-6 mb-8 border border-lime-400/20">
            <h3 className="text-2xl font-bold text-lime-400 mb-4">
              Unemployment Rate Trend
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Bulgaria has achieved remarkable success in reducing unemployment, maintaining one of the lowest rates in Europe.
            </p>
            <LineChart
              data={unemploymentData}
              height={400}
              yAxisLabel="Unemployment Rate (%)"
              formatYAxis={(value) => `${value}%`}
            />
          </div>
        )}

        {/* Employment Rate */}
        {employmentData.length > 0 && (
          <div className="glass-dark p-6 border border-lime-400/20">
            <h3 className="text-2xl font-bold text-lime-400 mb-4">
              Employment Rate
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              High employment rate reflects a robust and dynamic labor market.
            </p>
            <BarChart
              data={employmentData}
              height={400}
              yAxisLabel="Employment Rate (%)"
              formatYAxis={(value) => `${value}%`}
            />
          </div>
        )}

        {/* Key Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark p-6 border border-lime-400/20">
            <Users className="w-8 h-8 text-lime-400 mb-3" />
            <h4 className="font-bold text-lime-400 mb-2">Skilled Workforce</h4>
            <p className="text-sm text-gray-400">
              Highly educated workforce with strong technical and language skills, particularly in IT and engineering.
            </p>
          </div>
          <div className="glass-dark p-6 border border-lime-400/20">
            <Briefcase className="w-8 h-8 text-lime-400 mb-3" />
            <h4 className="font-bold text-lime-400 mb-2">Competitive Costs</h4>
            <p className="text-sm text-gray-400">
              Labor costs are approximately 40% lower than Western EU countries while maintaining high productivity.
            </p>
          </div>
          <div className="glass-dark p-6 border border-lime-400/20">
            <TrendingDown className="w-8 h-8 text-lime-400 mb-3" />
            <h4 className="font-bold text-lime-400 mb-2">Stable Market</h4>
            <p className="text-sm text-gray-400">
              Low unemployment provides stability for businesses and reduces recruitment challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

