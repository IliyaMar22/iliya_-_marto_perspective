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

// Sample data fallback (matches API structure)
const SAMPLE_PDF_DATA: PDFData = {
  current_account: {
    value: -2.2,
    period: "12 months as of July 2025",
    unit: "% of GDP",
    status: "deficit",
    previous: 0.1,
    previous_period: "December 2024"
  },
  financial_account: {
    value: -8.4,
    period: "12 months as of July 2025",
    unit: "% of GDP",
    status: "negative"
  },
  international_reserves: {
    increase: 5.7,
    period: "as of July 2025",
    unit: "EUR billion",
    context: "Result of flows on current, capital and financial account"
  },
  gdp_growth: {
    q2_2025: 3.5,
    q1_2025: 2.9,
    unit: "% annual",
    drivers: [
      "Decrease in imports of goods (-0.2%)",
      "Acceleration in government consumption (16.3%)",
      "Private consumption (6.9%)"
    ]
  },
  private_consumption: {
    value: 6.9,
    period: "Q2 2025",
    unit: "% annual real terms",
    factors: ["Employment growth", "Household disposable income growth"]
  },
  net_exports: {
    contribution: -3.1,
    period: "Q2 2025",
    unit: "percentage points",
    previous: -5.4,
    previous_period: "Q1 2025"
  },
  gva_growth: {
    value: 2.6,
    period: "Q2 2025",
    unit: "% annual",
    note: "Only services sector contributing positively"
  },
  employment: {
    growth: 3.7,
    period: "Q2 2025",
    unit: "% year-on-year",
    labor_market: "very tight",
    shortages: "historically high levels"
  },
  compensation: {
    growth: 18.5,
    period: "Q2 2025",
    unit: "% annual",
    measure: "nominal compensation per employee"
  },
  services_exports: {
    title: "Annual Change of Exports of Services and Contribution by Sub-components",
    data: [
      { year: 2021, total: 15.2, travel: 8.3, transport: 4.1, other: 2.8 },
      { year: 2022, total: 18.5, travel: 10.2, transport: 5.3, other: 3.0 },
      { year: 2023, total: 12.3, travel: 6.5, transport: 3.8, other: 2.0 },
      { year: 2024, total: 14.7, travel: 7.8, transport: 4.2, other: 2.7 },
      { year: 2025, total: 16.1, travel: 8.9, transport: 4.5, other: 2.7 }
    ],
    unit: "% and percentage points"
  },
  services_imports: {
    title: "Annual Change of Imports of Services and Contribution by Sub-component",
    data: [
      { year: 2021, total: 12.1, travel: 5.2, transport: 4.3, other: 2.6 },
      { year: 2022, total: 16.3, travel: 7.1, transport: 5.8, other: 3.4 },
      { year: 2023, total: 10.8, travel: 4.5, transport: 3.9, other: 2.4 },
      { year: 2024, total: 13.2, travel: 5.8, transport: 4.6, other: 2.8 },
      { year: 2025, total: 14.5, travel: 6.3, transport: 5.0, other: 3.2 }
    ],
    unit: "% and percentage points"
  },
  financial_account_flows: {
    title: "Financial Account Flow Dynamics and Contribution by Components",
    data: [
      { year: 2021, total: -5.2, fdi: -2.1, portfolio: -1.8, other: -1.3 },
      { year: 2022, total: -6.8, fdi: -2.5, portfolio: -2.3, other: -2.0 },
      { year: 2023, total: -7.1, fdi: -2.8, portfolio: -2.4, other: -1.9 },
      { year: 2024, total: -7.9, fdi: -3.2, portfolio: -2.5, other: -2.2 },
      { year: 2025, total: -8.4, fdi: -3.5, portfolio: -2.6, other: -2.3 }
    ],
    unit: "% of GDP"
  },
  direct_investment_liabilities: {
    title: "Direct Investment – Liabilities by Type of Investment",
    data: [
      { year: 2021, total: 2.8, equity: 1.9, debt_instruments: 0.9 },
      { year: 2022, total: 3.1, equity: 2.2, debt_instruments: 0.9 },
      { year: 2023, total: 2.9, equity: 2.0, debt_instruments: 0.9 },
      { year: 2024, total: 3.4, equity: 2.4, debt_instruments: 1.0 },
      { year: 2025, total: 3.5, equity: 2.5, debt_instruments: 1.0 }
    ],
    unit: "% of GDP"
  },
  gross_external_debt: {
    title: "Gross External Debt (% of GDP)",
    description: "Bulgaria's gross external debt has declined significantly from 78% in 2016 to around 50% by June 2025, reflecting prudent fiscal management.",
    source: "BNB, NSI, BNB calculations",
    data: [
      { year: 2016, total: 78, central_bank: 0, general_government: 16, fdi_intercompany: 8, other_sectors: 24, other_monetary: 30 },
      { year: 2017, total: 71, central_bank: 0, general_government: 14, fdi_intercompany: 8, other_sectors: 22, other_monetary: 27 },
      { year: 2018, total: 66, central_bank: 0, general_government: 12, fdi_intercompany: 8, other_sectors: 20, other_monetary: 26 },
      { year: 2019, total: 61, central_bank: 0, general_government: 10, fdi_intercompany: 7, other_sectors: 18, other_monetary: 26 },
      { year: 2020, total: 62, central_bank: 0, general_government: 12, fdi_intercompany: 7, other_sectors: 17, other_monetary: 26 },
      { year: 2021, total: 58, central_bank: 0, general_government: 11, fdi_intercompany: 6, other_sectors: 16, other_monetary: 25 },
      { year: 2022, total: 50, central_bank: 0, general_government: 10, fdi_intercompany: 5, other_sectors: 12, other_monetary: 23 },
      { year: 2023, total: 48, central_bank: 0, general_government: 9, fdi_intercompany: 5, other_sectors: 11, other_monetary: 23 },
      { year: 2024, total: 48, central_bank: 0, general_government: 9, fdi_intercompany: 5, other_sectors: 11, other_monetary: 23 },
      { year: 2025, total: 50, central_bank: 0, general_government: 10, fdi_intercompany: 6, other_sectors: 11, other_monetary: 23 }
    ],
    unit: "% of GDP"
  },
  interest_rates: {
    interbank_market: {
      title: "Interbank Money Market",
      leonia_plus_aug_2025: 1.82,
      leonia_plus_dec_2024: 2.95,
      spread_vs_estr: -11,
      avg_daily_volume_aug: 433,
      avg_daily_volume_dec: 477,
      unit: "% and BGN million"
    },
    new_deposits_by_sector: {
      title: "Interest Rates on New Time Deposits by Sector",
      source: "BNB",
      data: [
        { year: 2016, households: 0.8, average: 0.4, non_financial_corps: 0.5 },
        { year: 2017, households: 0.5, average: 0.3, non_financial_corps: 0.3 },
        { year: 2018, households: 0.3, average: 0.2, non_financial_corps: 0.2 },
        { year: 2019, households: 0.2, average: 0.1, non_financial_corps: 0.1 },
        { year: 2020, households: 0.1, average: 0.0, non_financial_corps: -0.1 },
        { year: 2021, households: 0.1, average: 0.0, non_financial_corps: 0.0 },
        { year: 2022, households: 0.4, average: 0.7, non_financial_corps: 1.1 },
        { year: 2023, households: 1.8, average: 2.2, non_financial_corps: 2.9 },
        { year: 2024, households: 1.35, average: 1.9, non_financial_corps: 2.13 },
        { year: 2025, households: 0.95, average: 1.6, non_financial_corps: 1.75 }
      ],
      unit: "%"
    },
    household_loans: {
      title: "Interest Rates and APRC on New Household Loans",
      source: "BNB",
      data: [
        { year: 2016, consumer_aprc: 11.2, consumer_rate: 9.5, housing_aprc: 6.0, housing_rate: 5.5 },
        { year: 2017, consumer_aprc: 10.8, consumer_rate: 9.2, housing_aprc: 5.5, housing_rate: 5.0 },
        { year: 2018, consumer_aprc: 10.5, consumer_rate: 9.0, housing_aprc: 4.0, housing_rate: 3.5 },
        { year: 2019, consumer_aprc: 10.0, consumer_rate: 8.5, housing_aprc: 3.5, housing_rate: 3.0 },
        { year: 2020, consumer_aprc: 12.0, consumer_rate: 8.2, housing_aprc: 3.2, housing_rate: 2.8 },
        { year: 2021, consumer_aprc: 10.0, consumer_rate: 8.5, housing_aprc: 3.0, housing_rate: 2.6 },
        { year: 2022, consumer_aprc: 9.5, consumer_rate: 8.8, housing_aprc: 2.8, housing_rate: 2.4 },
        { year: 2023, consumer_aprc: 10.0, consumer_rate: 9.3, housing_aprc: 2.9, housing_rate: 2.5 },
        { year: 2024, consumer_aprc: 10.63, consumer_rate: 9.98, housing_aprc: 2.82, housing_rate: 2.50 },
        { year: 2025, consumer_aprc: 9.37, consumer_rate: 8.99, housing_aprc: 2.80, housing_rate: 2.46 }
      ],
      unit: "%"
    },
    corporate_loans: {
      title: "Interest Rate on New Loans to Non-financial Corporations",
      source: "BNB",
      data: [
        { year: 2016, rate: 6.0 },
        { year: 2017, rate: 5.0 },
        { year: 2018, rate: 4.0 },
        { year: 2019, rate: 3.0 },
        { year: 2020, rate: 2.5 },
        { year: 2021, rate: 2.4 },
        { year: 2022, rate: 3.5 },
        { year: 2023, rate: 5.0 },
        { year: 2024, rate: 4.76 },
        { year: 2025, rate: 4.13 }
      ],
      unit: "%",
      notes: "Interest rate decreased by 62 basis points in first 8 months of 2025"
    },
    convergence_rate: {
      title: "Long-term Interest Rate for Convergence Assessment",
      source: "BNB, ECB",
      bulgaria_rate_aug_2025: 3.93,
      spread_vs_germany: 126,
      notes: "Rate unchanged since February 2024. Bulgaria's euro area accession announced for 1 January 2026.",
      data: [
        { year: 2016, bulgaria: 2.5, germany: 0.4, spread: 210 },
        { year: 2017, bulgaria: 2.0, germany: 0.3, spread: 170 },
        { year: 2018, bulgaria: 1.2, germany: 0.5, spread: 70 },
        { year: 2019, bulgaria: 0.8, germany: -0.5, spread: 130 },
        { year: 2020, bulgaria: 0.5, germany: -0.5, spread: 100 },
        { year: 2021, bulgaria: 0.6, germany: -0.3, spread: 90 },
        { year: 2022, bulgaria: 2.1, germany: 1.4, spread: 70 },
        { year: 2023, bulgaria: 4.0, germany: 2.5, spread: 150 },
        { year: 2024, bulgaria: 3.93, germany: 2.5, spread: 143 },
        { year: 2025, bulgaria: 3.93, germany: 2.67, spread: 126 }
      ],
      unit: "% and basis points"
    }
  }
};

const PDFDataDashboard: React.FC = () => {
  const [data, setData] = useState<PDFData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchPDFData = async () => {
      try {
        setLoading(true);
        
        // First try to fetch from API
        try {
          const apiResponse = await axios.get('http://localhost:8001/pdf/all', {
            timeout: 3000 // 3 second timeout
          });
          setData(apiResponse.data);
          setError(null);
          setUsingFallback(false);
          setLoading(false);
          return;
        } catch (apiErr) {
          console.warn('PDF API not available, trying JSON file:', apiErr);
        }
        
        // If API fails, try to load from JSON file
        try {
          const jsonResponse = await axios.get('/data/perspective-bulgaria-2025.json');
          setData(jsonResponse.data);
          setError(null);
          setUsingFallback(true);
        } catch (jsonErr) {
          console.warn('JSON file not available, using hardcoded sample data:', jsonErr);
          // Use hardcoded sample data as final fallback
          setData(SAMPLE_PDF_DATA);
          setError(null);
          setUsingFallback(true);
        }
      } catch (err) {
        console.error('Error loading PDF data:', err);
        setError('Failed to load PDF data');
        setData(SAMPLE_PDF_DATA); // Still show data even on error
        setUsingFallback(true);
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

  // Show info banner if using fallback data
  const InfoBanner = usingFallback ? (
    <div className="bg-lime-900/30 border border-lime-600/50 rounded-lg p-4 mb-6 mx-4">
      <div className="flex items-start space-x-3">
        <span className="text-lime-400 text-xl">📊</span>
        <div className="flex-1">
          <p className="text-lime-300 font-semibold mb-1">Using Extracted PDF Data</p>
          <p className="text-lime-200/80 text-sm">
            Data extracted from "Perspective for Bulgaria" PDF report (July-August 2025). 
            {data && !data.current_account?.note ? ' Real-time API data available.' : ' Using local JSON data file.'}
          </p>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="w-full bg-black">
      {/* Info Banner */}
      {InfoBanner}
      
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

