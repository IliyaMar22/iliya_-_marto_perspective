import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { AreaChart } from '../charts/AreaChart';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorDisplay } from '../ui/ErrorDisplay';
import { formatPercentage } from '../../utils/formatters';
import { DollarSign, MapPin, Building2, TrendingUp } from 'lucide-react';

export const InvestmentClimate: React.FC = () => {
  const { fdiData, loading, error } = useDashboardStore();

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error && !fdiData) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <ErrorDisplay message={error} />
        </div>
      </section>
    );
  }

  const fdiInflows = fdiData?.inflows || [];
  const latestFDI = fdiInflows.length > 0 ? fdiInflows[fdiInflows.length - 1].value : null;

  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Climate
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Bulgaria offers a highly attractive investment environment with competitive tax rates, strategic location, and strong EU integration.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <DollarSign className="w-8 h-8 text-bulgaria-green mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">10% Corporate Tax</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Flat corporate tax rate - one of the lowest in the European Union
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <MapPin className="w-8 h-8 text-bulgaria-green mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Strategic Location</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gateway to 500M+ EU consumers and access to Eastern markets
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <Building2 className="w-8 h-8 text-bulgaria-green mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">EU Member Since 2007</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full access to EU single market and funding programs
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <TrendingUp className="w-8 h-8 text-bulgaria-green mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Growing FDI</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {latestFDI !== null ? `FDI: ${formatPercentage(latestFDI)} of GDP` : 'Strong foreign investment inflows'}
            </p>
          </div>
        </div>

        {/* FDI Chart */}
        {fdiInflows.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Foreign Direct Investment Inflows (% of GDP)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Bulgaria continues to attract significant foreign direct investment across multiple sectors.
            </p>
            <AreaChart
              data={fdiInflows}
              height={400}
              yAxisLabel="FDI (% of GDP)"
              formatYAxis={(value) => `${value}%`}
            />
          </div>
        )}

        {/* Investment Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-bulgaria-green/10 to-bulgaria-green/5 rounded-lg p-6 border border-bulgaria-green/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Key Investment Advantages
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-bulgaria-green mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">10% flat corporate tax rate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bulgaria-green mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Competitive labor costs (40% lower than Western EU)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bulgaria-green mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">EU single market access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bulgaria-green mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Strategic location at crossroads of Europe and Asia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bulgaria-green mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Stable political and economic environment</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Growing Sectors
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                <span className="text-gray-700 dark:text-gray-300"><strong>IT & Software:</strong> Rapidly expanding tech sector</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                <span className="text-gray-700 dark:text-gray-300"><strong>Manufacturing:</strong> Advanced production facilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                <span className="text-gray-700 dark:text-gray-300"><strong>Renewable Energy:</strong> Green transition investments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                <span className="text-gray-700 dark:text-gray-300"><strong>Real Estate:</strong> Growing property market</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                <span className="text-gray-700 dark:text-gray-300"><strong>Tourism:</strong> Expanding hospitality sector</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};



