import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '../charts/LineChart';
import { BarChart } from '../charts/BarChart';
import SimpleStatCard from '../ui/SimpleStatCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { CHART_COLORS } from '../../constants/indicators';

interface PDFData {
  current_account: any;
  financial_account: any;
  gdp_growth: any;
  employment: any;
  private_consumption: any;
  international_reserves: any;
  compensation: any;
  gva_growth: any;
  net_exports: any;
  services_exports: any;
  services_imports: any;
  financial_account_flows: any;
  direct_investment_liabilities: any;
  gross_external_debt: any;
  interest_rates: any;
}

const PDFDataDashboard: React.FC = () => {
  const [data, setData] = useState<PDFData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPDFData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8001/pdf/all');
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching PDF data:', err);
        setError('Failed to load PDF data. Make sure the API is running on port 8001.');
      } finally {
        setLoading(false);
      }
    };

    fetchPDFData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-400 text-lg">Loading Perspective for Bulgaria data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-center">
          <p className="text-orange-400 text-xl font-semibold mb-2">Error</p>
          <p className="text-gray-400">{error}</p>
          <p className="text-sm text-gray-500 mt-4">
            Start the PDF API: <code>cd backend && python api_pdf.py</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black">
      {/* Header - Responsive */}
      <header className="bg-gradient-to-r from-lime-400 to-green-600 text-dark-green py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4">
            Perspective for Bulgaria: Economic Indicators
          </h1>
          <p className="text-sm sm:text-base lg:text-xl opacity-90">
            Recent economic performance and balance of payments (July 2025)
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-12 lg:space-y-16">
        {/* Key Economic Indicators */}
        <section className="space-y-8">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xl sm:text-2xl">📊</span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-lime-400">Key Economic Indicators</h2>
              <p className="text-sm sm:text-base text-gray-400">Latest data from Perspective for Bulgaria</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <SimpleStatCard
              title="Current Account Balance"
              value={`${data.current_account.value}%`}
              subtitle={`of GDP (${data.current_account.period})`}
              icon="💰"
              color="blue"
            />
            <SimpleStatCard
              title="GDP Growth (Q2 2025)"
              value={`${data.gdp_growth.q2_2025}%`}
              subtitle={`accelerated from ${data.gdp_growth.q1_2025}% in Q1`}
              icon="📈"
              color="prosperity"
            />
            <SimpleStatCard
              title="Employment Growth"
              value={`+${data.employment.growth}%`}
              subtitle={`year-on-year, Q2 2025`}
              icon="👥"
              color="purple"
            />
            <SimpleStatCard
              title="International Reserves"
              value={`+€${data.international_reserves.increase}B`}
              subtitle={`increase as of July 2025`}
              icon="🏦"
              color="green"
            />
          </div>

          {/* More Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <SimpleStatCard
              title="Private Consumption"
              value={`+${data.private_consumption.value}%`}
              subtitle={`annual real terms, Q2 2025`}
              icon="🛍️"
              color="prosperity"
            />
            <SimpleStatCard
              title="Compensation Growth"
              value={`+${data.compensation.growth}%`}
              subtitle={`nominal per employee, Q2 2025`}
              icon="💵"
              color="blue"
            />
            <SimpleStatCard
              title="Financial Account"
              value={`${data.financial_account.value}%`}
              subtitle={`of GDP (12m as of July 2025)`}
              icon="💼"
              color="digital"
            />
            <SimpleStatCard
              title="GVA Growth"
              value={`+${data.gva_growth.value}%`}
              subtitle={`annual, Q2 2025`}
              icon="🏭"
              color="infrastructure"
            />
          </div>
        </section>

        {/* Services Trade Section */}
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-2xl">🌐</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-lime-400">Services Trade</h2>
              <p className="text-gray-600">Exports and Imports Analysis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Services Exports */}
            <div className="glass-dark rounded-xl shadow-lg p-6 border border-lime-400/20">
              <h3 className="text-xl font-semibold mb-4 text-lime-400">
                Annual Change of Exports of Services
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Contribution by Sub-components (%, percentage points)
              </p>
              <div className="h-64 sm:h-72 lg:h-80">
                <ServicesExportsChart data={data.services_exports.data} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span>Travel</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span>Transport</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                  <span>Other</span>
                </div>
              </div>
            </div>

            {/* Services Imports */}
            <div className="glass-dark rounded-xl shadow-lg p-6 border border-lime-400/20">
              <h3 className="text-xl font-semibold mb-4 text-lime-400">
                Annual Change of Imports of Services
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Contribution by Sub-component (%, percentage points)
              </p>
              <div className="h-64 sm:h-72 lg:h-80">
                <ServicesImportsChart data={data.services_imports.data} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  <span>Travel</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-500 rounded mr-2"></div>
                  <span>Transport</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded mr-2"></div>
                  <span>Other</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Account Section */}
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-2xl">💼</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-lime-400">Financial Account & Investment</h2>
              <p className="text-gray-600">Flow dynamics and direct investment analysis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Financial Account Flows */}
            <div className="glass-dark rounded-xl shadow-lg p-6 border border-lime-400/20">
              <h3 className="text-xl font-semibold mb-4 text-lime-400">
                Financial Account Flow Dynamics
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Contribution by Components (% of GDP)
              </p>
              <div className="h-64 sm:h-72 lg:h-80">
                <FinancialAccountChart data={data.financial_account_flows.data} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                  <span>FDI</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
                  <span>Portfolio</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded mr-2"></div>
                  <span>Other</span>
                </div>
              </div>
            </div>

            {/* Direct Investment */}
            <div className="glass-dark rounded-xl shadow-lg p-6 border border-lime-400/20">
              <h3 className="text-xl font-semibold mb-4 text-lime-400">
                Direct Investment – Liabilities by Type
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                % of GDP
              </p>
              <div className="h-64 sm:h-72 lg:h-80">
                <DirectInvestmentChart data={data.direct_investment_liabilities.data} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-indigo-600 rounded mr-2"></div>
                  <span>Equity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-600 rounded mr-2"></div>
                  <span>Debt Instruments</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* External Debt Section */}
        {data.gross_external_debt && (
          <section className="space-y-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl">📉</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Gross External Debt</h2>
                <p className="text-sm sm:text-base text-gray-600">Declining external debt shows fiscal prudence</p>
              </div>
            </div>

            {/* External Debt Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <SimpleStatCard
                title="External Debt 2016"
                value="78%"
                subtitle="of GDP - Starting point"
                icon="📊"
                color="purple"
              />
              <SimpleStatCard
                title="External Debt 2025"
                value="50%"
                subtitle="of GDP - Current level"
                icon="📉"
                color="prosperity"
              />
              <SimpleStatCard
                title="Reduction"
                value="-28pp"
                subtitle="Decline since 2016"
                icon="✅"
                color="green"
              />
              <SimpleStatCard
                title="Government Share"
                value="10%"
                subtitle="of GDP - June 2025"
                icon="🏛️"
                color="blue"
              />
            </div>

            {/* External Debt Chart */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 text-gray-800">
                Gross External Debt Trend (% of GDP)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Breakdown: Central Bank, General Government, FDI Intercompany, Other Sectors, Other Monetary Institutions
              </p>
              <div className="h-64 sm:h-72 lg:h-80">
                <BarChart
                  data={data.gross_external_debt.data.map((d: any) => ({ year: d.year, value: d.total }))}
                  yAxisLabel="% of GDP"
                />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Source: BNB, NSI, BNB calculations. Note: Nominal GDP for the last four quarters, including Q2 2025, is used.
              </p>
            </div>
          </section>
        )}

        {/* Interest Rates Section */}
        {data.interest_rates && (
          <section className="space-y-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl">💹</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Interest Rates</h2>
                <p className="text-sm sm:text-base text-gray-600">Banking sector rates, deposits, loans, and government bonds</p>
              </div>
            </div>

            {/* Interest Rates Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <SimpleStatCard
                title="LEONIA Plus"
                value="1.82%"
                subtitle="Aug 2025 (from 2.95% Dec)"
                icon="🏦"
                color="blue"
              />
              <SimpleStatCard
                title="Household Deposits"
                value="0.95%"
                subtitle="New time deposits Aug 2025"
                icon="👤"
                color="purple"
              />
              <SimpleStatCard
                title="Housing Loan Rate"
                value="2.46%"
                subtitle="Interest rate Aug 2025"
                icon="🏠"
                color="prosperity"
              />
              <SimpleStatCard
                title="Convergence Rate"
                value="3.93%"
                subtitle="Long-term rate (stable)"
                icon="🇪🇺"
                color="green"
              />
            </div>

            {/* Interest Rates Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* New Deposits by Sector */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-gray-800">
                  Interest Rates on New Time Deposits by Sector
                </h3>
                <p className="text-sm text-gray-600 mb-4">(per cent)</p>
                <div className="h-64 sm:h-72 lg:h-80">
                  <LineChart
                    data={data.interest_rates.new_deposits_by_sector?.data?.map((d: any) => ({ year: d.year, value: d.households })) || []}
                    yAxisLabel="%"
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded mr-1"></div>Households</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-blue-900 rounded mr-1"></div>Average</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-amber-500 rounded mr-1"></div>Non-fin. Corps</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Source: BNB</p>
              </div>

              {/* Household Loans */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-gray-800">
                  Interest Rates on New Household Loans
                </h3>
                <p className="text-sm text-gray-600 mb-4">(per cent)</p>
                <div className="h-64 sm:h-72 lg:h-80">
                  <LineChart
                    data={data.interest_rates.household_loans?.data?.map((d: any) => ({ year: d.year, value: d.housing_rate })) || []}
                    yAxisLabel="%"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center"><div className="w-3 h-3 bg-green-600 rounded mr-1"></div>Housing loans</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-red-600 rounded mr-1"></div>Consumer APRC</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Source: BNB</p>
              </div>

              {/* Corporate Loans */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-gray-800">
                  Interest Rate on New Corporate Loans
                </h3>
                <p className="text-sm text-gray-600 mb-4">(per cent)</p>
                <div className="h-64 sm:h-72 lg:h-80">
                  <LineChart
                    data={data.interest_rates.corporate_loans?.data?.map((d: any) => ({ year: d.year, value: d.rate })) || []}
                    yAxisLabel="%"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Interest rate decreased by 62 basis points in first 8 months of 2025. Source: BNB
                </p>
              </div>

              {/* Government Bond Yield */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-gray-800">
                  Long-term Interest Rate for Convergence
                </h3>
                <p className="text-sm text-gray-600 mb-4">(per cent and basis points)</p>
                <div className="h-64 sm:h-72 lg:h-80">
                  <LineChart
                    data={data.interest_rates.convergence_rate?.data?.map((d: any) => ({ year: d.year, value: d.bulgaria })) || []}
                    yAxisLabel="%"
                  />
                </div>
                <div className="mt-4 space-y-1 text-xs text-gray-600">
                  <p><strong>Bulgaria:</strong> 3.93% (unchanged since Feb 2024)</p>
                  <p><strong>Spread vs Germany:</strong> 126 basis points</p>
                  <p className="text-green-600 font-semibold">✓ Euro area accession: 1 January 2026</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sources: BNB, ECB</p>
              </div>
            </div>

            {/* Interest Rates Analysis Summary */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">📊 Interest Rates Analysis Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <h5 className="font-semibold text-amber-700">Interbank Market</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• LEONIA Plus: 1.82% (Aug 2025)</li>
                    <li>• ECB rate cuts passed on quickly</li>
                    <li>• Spread vs €STR: -11 bp</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold text-amber-700">Deposit Rates</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Household deposits: 0.95%</li>
                    <li>• Corporate deposits: 1.75%</li>
                    <li>• USD deposits fell most (-80bp)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold text-amber-700">Loan Rates</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Housing loans: 2.46% (stable)</li>
                    <li>• Consumer loans: 8.99% (↓)</li>
                    <li>• Corporate loans: 4.13% (-62bp)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Key Takeaways */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Key Takeaways</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-700 flex items-center">
                <span className="text-2xl mr-2">✅</span>
                Strong Economic Growth
              </h4>
              <ul className="space-y-2 text-gray-700 ml-8 text-sm">
                <li>• GDP growth accelerated to <strong>3.5%</strong> in Q2 2025</li>
                <li>• Private consumption up <strong>6.9%</strong></li>
                <li>• Employment growth of <strong>3.7%</strong></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-700 flex items-center">
                <span className="text-2xl mr-2">💼</span>
                Robust Labor Market
              </h4>
              <ul className="space-y-2 text-gray-700 ml-8 text-sm">
                <li>• Very tight labor conditions</li>
                <li>• Compensation growth of <strong>18.5%</strong></li>
                <li>• Labor shortages at historic highs</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-700 flex items-center">
                <span className="text-2xl mr-2">🌐</span>
                Strong Services Sector
              </h4>
              <ul className="space-y-2 text-gray-700 ml-8 text-sm">
                <li>• Services exports growing steadily</li>
                <li>• GVA up <strong>2.6%</strong> annually</li>
                <li>• Only services sector contributing positively</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-amber-700 flex items-center">
                <span className="text-2xl mr-2">💰</span>
                Financial Stability
              </h4>
              <ul className="space-y-2 text-gray-700 ml-8 text-sm">
                <li>• Reserves increased by <strong>€5.7 billion</strong></li>
                <li>• Net recipient of funds from rest of world</li>
                <li>• Current account deficit at 2.2% of GDP</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-red-700 flex items-center">
                <span className="text-2xl mr-2">📉</span>
                Declining External Debt
              </h4>
              <ul className="space-y-2 text-gray-700 ml-8 text-sm">
                <li>• External debt fell from <strong>78%</strong> to <strong>50%</strong> of GDP</li>
                <li>• Prudent fiscal management</li>
                <li>• Government share at <strong>10%</strong> of GDP</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-indigo-700 flex items-center">
                <span className="text-2xl mr-2">🏛️</span>
                Favorable Interest Rates
              </h4>
              <ul className="space-y-2 text-gray-700 ml-8 text-sm">
                <li>• Housing loans at <strong>2.46%</strong> (stable)</li>
                <li>• Corporate loans down <strong>62bp</strong></li>
                <li>• Euro accession: <strong>1 Jan 2026</strong></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Custom chart components for the specific data
const ServicesExportsChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <LineChart
        data={data.map(d => ({ year: d.year, value: d.total }))}
        
        yAxisLabel="% change"
      />
    </div>
  );
};

const ServicesImportsChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <LineChart
        data={data.map(d => ({ year: d.year, value: d.total }))}
        
        yAxisLabel="% change"
      />
    </div>
  );
};

const FinancialAccountChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <BarChart
        data={data.map(d => ({ year: d.year, value: d.total }))}
        
        yAxisLabel="% of GDP"
      />
    </div>
  );
};

const DirectInvestmentChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <BarChart
        data={data.map(d => ({ year: d.year, value: d.total }))}
        
        yAxisLabel="% of GDP"
      />
    </div>
  );
};

export default PDFDataDashboard;

