import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { BarChart } from '../charts/BarChart';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorDisplay } from '../ui/ErrorDisplay';
import { formatPercentage } from '../../utils/formatters';
import { Shield, TrendingDown, Award } from 'lucide-react';

export const FiscalStability: React.FC = () => {
  const { fiscalData, loading, error } = useDashboardStore();

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

  if (error && !fiscalData) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-black">
        <div className="container mx-auto">
          <ErrorDisplay message={error} />
        </div>
      </section>
    );
  }

  const debtData = fiscalData?.debtToGDP || [];
  const latestDebt = debtData.length > 0 ? debtData[debtData.length - 1].value : null;

  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-hero text-lime-400 mb-4">
            Fiscal Stability
          </h2>
          <p className="text-subtitle max-w-3xl mx-auto">
            Bulgaria maintains one of the strongest fiscal positions in the European Union, with the lowest government debt-to-GDP ratio.
          </p>
        </div>

        {/* Key Metric */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="glass-dark rounded-lg shadow-lg p-8 border-2 border-lime-400/30">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Shield className="w-12 h-12 text-lime-400" />
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-400 uppercase mb-2">
                  Government Debt to GDP
                </h3>
                <p className="text-5xl font-bold text-lime-400">
                  {latestDebt !== null ? formatPercentage(latestDebt) : '23.1%'}
                </p>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-semibold text-lime-400">
                Lowest in the European Union
              </p>
              <p className="text-sm text-gray-400 mt-2">
                EU average: ~90% | Bulgaria: {latestDebt !== null ? formatPercentage(latestDebt) : '23.1%'}
              </p>
            </div>
          </div>
        </div>

        {/* Debt Trend Chart */}
        {debtData.length > 0 && (
          <div className="glass-dark p-6 mb-8 border border-lime-400/20">
            <h3 className="text-2xl font-bold text-lime-400 mb-4">
              Government Debt-to-GDP Ratio
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Bulgaria's prudent fiscal management has kept debt levels exceptionally low, providing significant room for counter-cyclical policies.
            </p>
            <BarChart
              data={debtData}
              height={400}
              yAxisLabel="Debt to GDP (%)"
              formatYAxis={(value) => `${value}%`}
            />
          </div>
        )}

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="glass-dark p-6 border border-lime-400/20">
            <Award className="w-8 h-8 text-lime-400 mb-3" />
            <h4 className="font-bold text-lime-400 mb-2">Fiscal Discipline</h4>
            <p className="text-sm text-gray-400">
              Consistent fiscal prudence has maintained debt levels well below EU thresholds, ensuring long-term stability.
            </p>
          </div>
          <div className="glass-dark p-6 border border-lime-400/20">
            <TrendingDown className="w-8 h-8 text-lime-400 mb-3" />
            <h4 className="font-bold text-lime-400 mb-2">Low Risk Profile</h4>
            <p className="text-sm text-gray-400">
              Minimal debt burden reduces sovereign risk and provides flexibility for investment in infrastructure and growth.
            </p>
          </div>
          <div className="glass-dark p-6 border border-lime-400/20">
            <Shield className="w-8 h-8 text-lime-400 mb-3" />
            <h4 className="font-bold text-lime-400 mb-2">Eurozone Candidate</h4>
            <p className="text-sm text-gray-400">
              Strong fiscal position supports Bulgaria's path toward Eurozone accession, providing additional stability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

