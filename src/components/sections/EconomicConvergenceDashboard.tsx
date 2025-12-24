import React, { useState } from 'react';
import {
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  ReferenceLine,
} from 'recharts';
import { motion } from 'framer-motion';

// ============================================
// DATA DEFINITIONS
// ============================================

const gdpGrowthData = [
  { year: 2005, bulgaria: 6.4, romania: 4.2, eu: 2.0 },
  { year: 2010, bulgaria: 0.4, romania: -0.8, eu: 2.2 },
  { year: 2015, bulgaria: 3.6, romania: 4.0, eu: 2.0 },
  { year: 2020, bulgaria: -3.0, romania: -3.7, eu: -5.7 },
  { year: 2024, bulgaria: 3.4, romania: 0.9, eu: 1.1 },
  { year: '2025e', bulgaria: 3.0, romania: 1.9, eu: 1.5 },
];

const convergenceData = [
  { year: 2005, bulgaria: 25, romania: 30, eu: 100 },
  { year: 2010, bulgaria: 35, romania: 40, eu: 100 },
  { year: 2015, bulgaria: 45, romania: 50, eu: 100 },
  { year: 2020, bulgaria: 55, romania: 65, eu: 100 },
  { year: 2024, bulgaria: 65, romania: 75, eu: 100 },
  { year: '2050p', bulgaria: 100, romania: 95, eu: 100 },
];

const fdiTrendsData = [
  { year: 2005, fdiInflows: 13.2, equityCapital: 13.0 },
  { year: 2010, fdiInflows: 3.2, equityCapital: 2.5 },
  { year: 2015, fdiInflows: 4.3, equityCapital: 4.1 },
  { year: 2020, fdiInflows: 4.2, equityCapital: 3.8 },
  { year: 2024, fdiInflows: 3.1, equityCapital: 2.5 },
];

const tradeFlowsData = [
  { year: 2005, exports: 11.2, imports: 17.8, balance: -6.6 },
  { year: 2010, exports: 19.8, imports: 25.2, balance: -5.4 },
  { year: 2015, exports: 24.9, imports: 28.8, balance: -3.9 },
  { year: 2020, exports: 34.2, imports: 39.8, balance: -5.6 },
  { year: 2024, exports: 46.6, imports: 53.8, balance: -7.2 },
];

const fdiCompositionData = [
  { name: 'EU', value: 85, color: '#3B82F6' },
  { name: 'Third Countries', value: 15, color: '#F97316' },
];

const fdiOriginsData = [
  { country: 'Belgium', amount: 583.5, flag: '🇧🇪' },
  { country: 'Austria', amount: 426.7, flag: '🇦🇹' },
  { country: 'Greece', amount: 295.1, flag: '🇬🇷' },
  { country: 'Italy', amount: 245.9, flag: '🇮🇹' },
  { country: 'Netherlands', amount: 200.0, flag: '🇳🇱' },
];

const gdpCompositionData = [
  { name: 'Household Consumption', value: 62.5, color: '#3B82F6' },
  { name: 'Government Consumption', value: 18.2, color: '#10B981' },
  { name: 'Gross Fixed Capital', value: 22.1, color: '#8B5CF6' },
  { name: 'Net Exports', value: -2.8, color: '#EF4444' },
];

const giniData = [
  { country: 'Bulgaria', value: 37.2, flag: '🇧🇬' },
  { country: 'Romania', value: 34.8, flag: '🇷🇴' },
  { country: 'Lithuania', value: 35.4, flag: '🇱🇹' },
  { country: 'Latvia', value: 34.3, flag: '🇱🇻' },
  { country: 'EU Average', value: 29.6, flag: '🇪🇺' },
];

const productivityData = [
  { metric: 'Bulgaria', value: 25.5 },
  { metric: 'EU Average', value: 48.2 },
];

const naturalResourcesData = [
  { resource: 'Lignite', amount: '4.8bn tons', region: 'Maritsa Iztok', potential: 95 },
  { resource: 'Copper', amount: '650m tons', region: 'Asarel-Medet', potential: 85 },
  { resource: 'Gold', amount: 'Significant', region: 'Chelopech', potential: 75 },
  { resource: 'Graphite', amount: 'Emerging', region: 'Various', potential: 60 },
  { resource: 'Lithium', amount: 'Untapped', region: 'Exploration', potential: 40 },
];

// ============================================
// HELPER COMPONENTS
// ============================================

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: string;
  delay?: number;
}> = ({ title, value, subtitle, icon, trend, trendValue, color, delay = 0 }) => {
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-blue-700',
    green: 'from-emerald-500 to-emerald-700',
    purple: 'from-purple-500 to-purple-700',
    orange: 'from-orange-500 to-orange-700',
    red: 'from-red-500 to-red-700',
    teal: 'from-teal-500 to-teal-700',
    indigo: 'from-indigo-500 to-indigo-700',
    gold: 'from-amber-500 to-amber-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -5 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color]} p-6 text-white shadow-xl`}
    >
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-black/10 blur-xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-4xl">{icon}</span>
          {trend && (
            <div className={`flex items-center rounded-full px-2 py-1 text-xs font-bold ${
              trend === 'up' ? 'bg-green-400/30' : trend === 'down' ? 'bg-red-400/30' : 'bg-gray-400/30'
            }`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </div>
          )}
        </div>
        <h3 className="mt-4 text-sm font-medium opacity-90">{title}</h3>
        <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
        {subtitle && <p className="mt-1 text-xs opacity-75">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

const SlideHeader: React.FC<{ slideNumber: number; title: string; subtitle?: string }> = ({
  slideNumber, title, subtitle,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mb-8"
  >
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-xl font-bold text-white shadow-lg">
        {slideNumber}
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
    </div>
  </motion.div>
);

const ChartContainer: React.FC<{ children: React.ReactNode; title?: string; className?: string }> = ({
  children, title, className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={`rounded-2xl bg-white/80 backdrop-blur-lg p-6 shadow-xl border border-gray-200/50 ${className}`}
  >
    {title && <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>}
    {children}
  </motion.div>
);

const ProgressBar: React.FC<{ value: number; max: number; label: string; color: string }> = ({
  value, max, label, color,
}) => {
  const percentage = (value / max) * 100;
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500', green: 'bg-emerald-500', purple: 'bg-purple-500',
    orange: 'bg-orange-500', red: 'bg-red-500', gold: 'bg-amber-500',
  };

  return (
    <div className="mb-4">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-bold text-gray-900">{value}%</span>
        </div>
      )}
      <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className={`h-full rounded-full ${colorClasses[color]}`}
        />
      </div>
    </div>
  );
};

const InsightBox: React.FC<{ icon: string; title: string; content: string; type?: 'success' | 'warning' | 'info' }> = ({
  icon, title, content, type = 'info',
}) => {
  const typeStyles = {
    success: 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200',
    warning: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200',
    info: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`rounded-xl border-2 p-4 ${typeStyles[type]}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-700 mt-1">{content}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const EconomicConvergenceDashboard: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    'Executive Summary', 'GDP Growth', 'EU Convergence', 'GDP Composition', 'Income Inequality',
    'FDI Origins', 'FDI Trends', 'Natural Resources', 'Productivity Gap', 'Trade Balance', 'Investment Thesis',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 text-white"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-2xl">🇧🇬</span>
                <span className="font-medium">Bulgaria Investment Analysis</span>
              </div>
            </div>
            <h1 className="mb-6 text-4xl md:text-6xl font-black tracking-tight">
              Economic Convergence &
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Investment Opportunities
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-300 leading-relaxed">
              Comprehensive analysis of Bulgaria's economic trajectory, convergence path toward EU average,
              and strategic investment opportunities across key sectors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { label: 'GDP Growth (2024)', value: '3.4%', icon: '📈', sublabel: 'vs EU 1.1%' },
              { label: 'EU Convergence', value: '65%', icon: '🎯', sublabel: 'of EU average' },
              { label: 'FDI Inflows', value: '€3.1B', icon: '💰', sublabel: '2.8% of GDP' },
              { label: 'Target Year', value: '2050', icon: '🚀', sublabel: 'Full convergence' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                className="rounded-2xl bg-white/5 p-4 md:p-6 backdrop-blur-sm border border-white/10 text-center"
              >
                <span className="text-3xl">{stat.icon}</span>
                <p className="mt-2 text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-xs text-emerald-400 mt-1">{stat.sublabel}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Navigation Pills */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 gap-2 no-scrollbar">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => {
                  document.getElementById(`slide-${idx}`)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveSlide(idx);
                }}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeSlide === idx
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {idx + 1}. {slide}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12 space-y-24">
        {/* SLIDE 0: Executive Summary */}
        <section id="slide-0" className="scroll-mt-24">
          <SlideHeader slideNumber={1} title="Executive Summary" subtitle="Investment Thesis Overview" />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <MetricCard title="Average GDP Growth (2005-2024)" value="3.0%" subtitle="vs EU 1.3%" icon="📊" trend="up" trendValue="2.3x EU" color="blue" delay={0} />
            <MetricCard title="GDP per Capita (PPP)" value="65%" subtitle="of EU average (2024)" icon="💹" trend="up" trendValue="+40pp since 2005" color="green" delay={0.1} />
            <MetricCard title="FDI Annual Average" value="3-4%" subtitle="of GDP (recent years)" icon="🏦" trend="neutral" trendValue="Stable" color="purple" delay={0.2} />
            <MetricCard title="Convergence Target" value="2050" subtitle="Baseline | 15yr with reforms" icon="🎯" trend="up" trendValue="4%+ growth" color="orange" delay={0.3} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-900 p-8 text-white shadow-2xl"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="rounded-xl bg-white/10 p-3"><span className="text-4xl">📋</span></div>
              <div>
                <h3 className="text-2xl font-bold">Investment Thesis</h3>
                <p className="text-gray-300">Key findings and strategic recommendations</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <h4 className="font-semibold text-emerald-400 mb-2">✅ Growth Drivers</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Real GDP growth averaging 3.0% annually (2005-2024)</li>
                    <li>• Domestic demand and EU funds absorption</li>
                    <li>• Employment growth driving consumption</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <h4 className="font-semibold text-blue-400 mb-2">🎯 Investment Themes</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Infrastructure modernization</li>
                    <li>• Renewable energy transition</li>
                    <li>• Export diversification to Asia/Middle East</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <h4 className="font-semibold text-amber-400 mb-2">⚠️ Key Challenges</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Widening productivity gap (47% below EU)</li>
                    <li>• High income inequality (Gini: 37.2)</li>
                    <li>• Persistent trade deficit (€7.2bn in 2024)</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <h4 className="font-semibold text-red-400 mb-2">🚨 Risk Factors</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Geopolitical tensions (regional instability)</li>
                    <li>• Fiscal pressures from social spending</li>
                    <li>• Labor cost inflation outpacing productivity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-4 border border-emerald-500/30">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💡</span>
                <div>
                  <h4 className="font-bold text-emerald-400">Bottom Line</h4>
                  <p className="text-sm text-gray-300">
                    Under baseline scenarios, full EU income convergence by 2050. Ambitious reforms could accelerate to 15 years,
                    implying 4%+ annual growth. Prioritize infrastructure, renewables, and FDI diversification.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SLIDE 1: GDP Growth Comparison */}
        <section id="slide-1" className="scroll-mt-24">
          <SlideHeader slideNumber={2} title="GDP Growth Comparison" subtitle="Bulgaria vs Romania vs EU Average (2005-2025)" />
          
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <InsightBox icon="🇧🇬" title="Bulgaria Outperforms" content="Average 3.0% annual growth (2005-2024), with 3.4% in 2024 vs EU's 1.1%" type="success" />
            <InsightBox icon="📈" title="2025 Forecast" content="Projected 3.0% growth (1.5pp above EU's 1.5%), driven by domestic demand" type="info" />
            <InsightBox icon="💪" title="Resilience" content="Investment resilience amid global shocks signals attractive risk-return profile" type="success" />
          </div>

          <ChartContainer title="Annual GDP Growth Rate (%)">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={gdpGrowthData}>
                <defs>
                  <linearGradient id="bulgariaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} domain={[-8, 10]} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
                <Legend />
                <ReferenceLine y={0} stroke="#9CA3AF" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="bulgaria" fill="url(#bulgariaGradient)" stroke="transparent" />
                <Line type="monotone" dataKey="bulgaria" name="Bulgaria" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="romania" name="Romania" stroke="#F97316" strokeWidth={3} dot={{ fill: '#F97316', strokeWidth: 2, r: 6 }} />
                <Line type="monotone" dataKey="eu" name="EU Average" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-6 text-sm text-gray-500 text-center">Source: Eurostat National Accounts, IMF World Economic Outlook (October 2025)</div>
        </section>

        {/* SLIDE 2: EU Convergence */}
        <section id="slide-2" className="scroll-mt-24">
          <SlideHeader slideNumber={3} title="Convergence Toward EU Average" subtitle="PPP-Adjusted Income Trajectory (2005-2050)" />

          <div className="grid lg:grid-cols-2 gap-8">
            <ChartContainer title="PPP GDP per Capita (% of EU Average)">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={convergenceData}>
                  <defs>
                    <linearGradient id="bgConverge" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} domain={[0, 120]} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
                  <Legend />
                  <Area type="monotone" dataKey="bulgaria" name="Bulgaria (% of EU)" stroke="#3B82F6" fill="url(#bgConverge)" strokeWidth={3} />
                  <Line type="monotone" dataKey="romania" name="Romania (% of EU)" stroke="#F97316" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="eu" name="EU Average (Index=100)" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-4">📊 Convergence Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/10"><span>2005 Starting Point</span><span className="font-bold text-xl">~25%</span></div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/10"><span>2024 Current Level</span><span className="font-bold text-xl text-emerald-400">65%</span></div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/10"><span>Bulgaria GDP/capita (PPP)</span><span className="font-bold text-xl">$42,477</span></div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/10"><span>EU Average GDP/capita</span><span className="font-bold text-xl">$65,140</span></div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="rounded-2xl bg-white p-6 shadow-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Convergence Scenarios</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                    <div className="flex justify-between items-center mb-2"><span className="font-semibold text-gray-700">Baseline (3% growth)</span><span className="text-blue-600 font-bold">2050</span></div>
                    <ProgressBar value={65} max={100} label="Current Progress" color="blue" />
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                    <div className="flex justify-between items-center mb-2"><span className="font-semibold text-gray-700">With Reforms (4%+ growth)</span><span className="text-emerald-600 font-bold">~2039</span></div>
                    <ProgressBar value={65} max={100} label="15-Year Acceleration" color="green" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SLIDE 3: GDP Composition */}
        <section id="slide-3" className="scroll-mt-24">
          <SlideHeader slideNumber={4} title="Composition of Bulgaria's GDP" subtitle="Expenditure Approach Breakdown (2024)" />

          <div className="grid lg:grid-cols-2 gap-8">
            <ChartContainer title="GDP Components (% of GDP)">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie data={gdpCompositionData.filter((d) => d.value > 0)} cx="50%" cy="50%" innerRadius={80} outerRadius={140} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {gdpCompositionData.filter((d) => d.value > 0).map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="space-y-4">
              {gdpCompositionData.map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: idx * 0.1 }} viewport={{ once: true }} className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-md border border-gray-100">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="flex-1"><span className="font-medium text-gray-800">{item.name}</span></div>
                  <span className={`text-xl font-bold ${item.value < 0 ? 'text-red-600' : 'text-gray-900'}`}>{item.value}%</span>
                </motion.div>
              ))}
              <InsightBox icon="⚠️" title="Trade Deficit Impact" content="Persistent deficit driven by energy imports underscores need for diversification; positive investment signals recovery via EU-funded infrastructure." type="warning" />
            </div>
          </div>
        </section>

        {/* SLIDE 4: Income Inequality */}
        <section id="slide-4" className="scroll-mt-24">
          <SlideHeader slideNumber={5} title="Income Inequality in Europe" subtitle="Gini Coefficient Comparison (2023)" />

          <div className="grid lg:grid-cols-2 gap-8">
            <ChartContainer title="Gini Index by Country">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={giniData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 45]} tick={{ fill: '#6B7280' }} />
                  <YAxis dataKey="country" type="category" tick={{ fill: '#6B7280' }} width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#EF4444" radius={[0, 8, 8, 0]}>
                    {giniData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.country === 'Bulgaria' ? '#EF4444' : entry.country === 'EU Average' ? '#10B981' : '#F97316'} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 p-6 text-white shadow-xl">
                <div className="text-center">
                  <span className="text-6xl">⚖️</span>
                  <h3 className="mt-4 text-4xl font-black">37.2</h3>
                  <p className="text-lg opacity-90">Bulgaria's Gini (2023)</p>
                  <p className="mt-2 text-sm opacity-75">Highest in the EU</p>
                </div>
              </motion.div>
              <InsightBox icon="🏘️" title="Regional Disparities" content="Rural-urban disparities exacerbate inequality risks. Targeted social investments could mitigate, enhancing labor market stability for FDI." type="warning" />
              <InsightBox icon="💼" title="Investment Implication" content="High inequality creates opportunity for impact investing in underserved regions while accessing lower labor costs." type="info" />
            </div>
          </div>
        </section>

        {/* SLIDE 5: FDI Origins */}
        <section id="slide-5" className="scroll-mt-24">
          <SlideHeader slideNumber={6} title="FDI Structure by Origin" subtitle="Top Investment Sources (2023-2024)" />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <MetricCard title="Total FDI Inflows (2023)" value="€3.1B" subtitle="2.8% of GDP" icon="💰" color="blue" />
            <MetricCard title="EU Share" value="85%" subtitle="Dominated by Western EU" icon="🇪🇺" color="purple" />
            <MetricCard title="Third Countries" value="15%" subtitle="China, Turkey key players" icon="🌍" color="orange" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ChartContainer title="Top 5 FDI Origins (€ millions)">
              <div className="space-y-4">
                {fdiOriginsData.map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: idx * 0.1 }} viewport={{ once: true }} className="flex items-center gap-4">
                    <span className="text-3xl">{item.flag}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1"><span className="font-semibold text-gray-800">{item.country}</span><span className="font-bold text-gray-900">€{item.amount}m</span></div>
                      <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${(item.amount / 600) * 100}%` }} transition={{ duration: 0.8, delay: idx * 0.1 }} viewport={{ once: true }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ChartContainer>

            <ChartContainer title="FDI Composition by Source (2024)">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={fdiCompositionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {fdiCompositionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 border border-amber-200">
                <h4 className="font-semibold text-amber-800 flex items-center gap-2"><span>🎯</span> Diversification Target</h4>
                <p className="text-sm text-amber-700 mt-1">Current: 85/15 EU/Third → Target: 70/30 by 2030<br />Priority markets: China, Turkey, Middle East</p>
              </div>
            </ChartContainer>
          </div>
        </section>

        {/* SLIDE 6: FDI Trends */}
        <section id="slide-6" className="scroll-mt-24">
          <SlideHeader slideNumber={7} title="FDI Trends Over Time" subtitle="Inflows and Equity Capital (2005-2024)" />

          <ChartContainer title="FDI Inflows (% of GDP)">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={fdiTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} domain={[0, 16]} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
                <Legend />
                <Line type="monotone" dataKey="fdiInflows" name="FDI Inflows (% GDP)" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }} />
                <Line type="monotone" dataKey="equityCapital" name="Equity Capital" stroke="#F97316" strokeWidth={3} dot={{ fill: '#F97316', strokeWidth: 2, r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <InsightBox icon="📉" title="Post-Crisis Collapse" content="FDI collapsed from 10%+ pre-2008 to avg 2.5% (2005-2024)" type="warning" />
            <InsightBox icon="📊" title="2024 Breakdown" content="Equity 40%, Reinvested earnings 35%, Debt instruments 25%" type="info" />
            <InsightBox icon="🎯" title="Target" content="Increase from 3% to 5% of GDP via diversification strategy" type="success" />
          </div>
        </section>

        {/* SLIDE 7: Natural Resources */}
        <section id="slide-7" className="scroll-mt-24">
          <SlideHeader slideNumber={8} title="Natural Resource Reserves" subtitle="Strategic Mineral Concentrations" />

          <div className="grid lg:grid-cols-2 gap-8">
            <ChartContainer title="Resource Potential Assessment">
              <div className="space-y-5">
                {naturalResourcesData.map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.1 }} viewport={{ once: true }}>
                    <div className="flex justify-between mb-2">
                      <div><span className="font-semibold text-gray-800">{item.resource}</span><span className="ml-2 text-sm text-gray-500">({item.region})</span></div>
                      <span className="text-sm font-medium text-gray-600">{item.amount}</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-200 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.potential}%` }} transition={{ duration: 0.8, delay: idx * 0.1 }} viewport={{ once: true }} className={`h-full rounded-full ${item.potential >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' : item.potential >= 60 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </ChartContainer>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><span>🌍</span> EU Green Transition Opportunity</h3>
                <p className="text-emerald-100 text-sm leading-relaxed">Bulgaria's untapped Critical Raw Materials (CRM) potential—particularly lithium—positions the country strategically for the EU's green transition. Exploration investments could yield up to <span className="font-bold text-white">10% GDP boost by 2030</span>.</p>
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4 shadow-md border border-gray-200"><span className="text-3xl">⚡</span><h4 className="font-semibold text-gray-900 mt-2">Lignite</h4><p className="text-2xl font-bold text-gray-900">4.8B</p><p className="text-xs text-gray-500">tons (Maritsa Iztok 70%)</p></div>
                <div className="rounded-xl bg-white p-4 shadow-md border border-gray-200"><span className="text-3xl">🔶</span><h4 className="font-semibold text-gray-900 mt-2">Copper</h4><p className="text-2xl font-bold text-gray-900">650M</p><p className="text-xs text-gray-500">tons (Asarel-Medet)</p></div>
              </div>
              <InsightBox icon="🗺️" title="Geographic Concentration" content="Southeast: Copper/Gold (60%), Southwest: Coal (30%). Strategic clustering enables efficient extraction." type="info" />
            </div>
          </div>
        </section>

        {/* SLIDE 8: Productivity Gap */}
        <section id="slide-8" className="scroll-mt-24">
          <SlideHeader slideNumber={9} title="The Productivity Gap" subtitle="Widening Disconnect with EU Average" />

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm opacity-90">Productivity Gap to EU</p><p className="text-5xl font-black mt-2">47%</p><p className="text-sm opacity-75 mt-1">Below EU Average</p></div>
                  <div className="text-8xl opacity-50">📉</div>
                </div>
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-5 shadow-md border border-gray-200 text-center"><p className="text-sm text-gray-600">Bulgaria Hourly Output</p><p className="text-3xl font-bold text-blue-600 mt-2">€25.5</p><p className="text-xs text-gray-500">/hour (2024)</p></div>
                <div className="rounded-xl bg-white p-5 shadow-md border border-gray-200 text-center"><p className="text-sm text-gray-600">EU Average</p><p className="text-3xl font-bold text-emerald-600 mt-2">€48.2</p><p className="text-xs text-gray-500">/hour (2024)</p></div>
              </div>
            </div>

            <ChartContainer title="Productivity Comparison">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" tick={{ fill: '#6B7280' }} />
                  <YAxis domain={[0, 60]} tick={{ fill: '#6B7280' }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]}>
                    {productivityData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.metric === 'Bulgaria' ? '#3B82F6' : '#10B981'} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                <InsightBox icon="📈" title="Labor Cost Pressure" content="Labor costs rose 5.2% YoY, outpacing productivity growth (1.7% real GVA/hour)" type="warning" />
                <InsightBox icon="💡" title="Gap Closure Potential" content="Skills, digital, infrastructure reforms could add 1.5ppt to annual growth" type="success" />
              </div>
            </ChartContainer>
          </div>
        </section>

        {/* SLIDE 9: Trade Balance */}
        <section id="slide-9" className="scroll-mt-24">
          <SlideHeader slideNumber={10} title="Trade Balance Evolution" subtitle="Imports, Exports, and Deficit (2005-2024)" />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <MetricCard title="Exports (2024)" value="€46.6B" subtitle="Growth trajectory continues" icon="📤" trend="up" trendValue="+36% vs 2020" color="green" />
            <MetricCard title="Imports (2024)" value="€53.8B" subtitle="Energy imports drive growth" icon="📥" trend="up" trendValue="+35% vs 2020" color="red" />
            <MetricCard title="Trade Deficit" value="-€7.2B" subtitle="-1.5% of GDP" icon="⚖️" trend="down" trendValue="Widening" color="orange" />
          </div>

          <ChartContainer title="Trade Flows (€ billions)">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={tradeFlowsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} domain={[-10, 60]} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
                <Legend />
                <Bar dataKey="exports" name="Exports (€bn)" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="imports" name="Imports (€bn)" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="balance" name="Balance (€bn)" fill="#F97316" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="mt-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-6 border border-amber-200">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🎯</span>
              <div><h4 className="font-bold text-amber-900 text-lg">Strategic Imperative: Trade Surplus by 2030</h4><p className="text-amber-800 mt-2">Increasingly negative trend driven by energy imports requires aggressive diversification. Target markets: Asia, Middle East. Focus sectors: Renewables, high-value manufacturing.</p></div>
            </div>
          </div>
        </section>

        {/* SLIDE 10: Investment Thesis */}
        <section id="slide-10" className="scroll-mt-24">
          <SlideHeader slideNumber={11} title="Investment Thesis & Recommendations" subtitle="Strategic Opportunities for Investors" />

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 text-white shadow-2xl mb-8">
            <div className="text-center mb-8">
              <span className="text-6xl">🏆</span>
              <h3 className="text-3xl font-black mt-4">Bulgaria: A Compelling Investment Case</h3>
              <p className="text-gray-300 mt-2 max-w-2xl mx-auto">Strong fundamentals, EU membership, and strategic positioning create attractive risk-adjusted returns</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/10">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-xl font-bold text-emerald-400">Growth Thesis</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  <li>• 3.0% avg GDP growth (2.3x EU)</li>
                  <li>• Full convergence by 2050 (baseline)</li>
                  <li>• 4%+ growth with reforms</li>
                  <li>• EU funds absorption catalyst</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/10">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-xl font-bold text-blue-400">Target Sectors</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  <li>• Infrastructure modernization</li>
                  <li>• Renewable energy & CRM</li>
                  <li>• Export-oriented manufacturing</li>
                  <li>• Tech & digital services</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/10">
                <div className="text-4xl mb-4">⚠️</div>
                <h4 className="text-xl font-bold text-amber-400">Risk Mitigation</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  <li>• Diversify FDI to 70/30 EU/Third</li>
                  <li>• Focus on productivity reforms</li>
                  <li>• Address inequality for stability</li>
                  <li>• Monitor geopolitical exposure</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <ChartContainer title="FDI Target Composition">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Current (2024)</p>
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center"><span className="text-lg font-bold text-gray-900">85/15</span></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">EU / Third</p>
                </div>
                <div className="text-4xl">→</div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Target (2030)</p>
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center"><span className="text-lg font-bold text-gray-900">70/30</span></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">EU / Third</p>
                </div>
              </div>
            </ChartContainer>

            <ChartContainer title="GDP Growth Targets">
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex justify-between items-center mb-2"><span className="font-semibold">2025 Consensus</span><span className="text-2xl font-bold text-blue-600">2.5%</span></div>
                  <ProgressBar value={50} max={100} label="" color="blue" />
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex justify-between items-center mb-2"><span className="font-semibold">Target with Reforms</span><span className="text-2xl font-bold text-emerald-600">4.0%</span></div>
                  <ProgressBar value={80} max={100} label="" color="green" />
                </div>
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                  <div className="flex justify-between items-center mb-2"><span className="font-semibold">2026 Forecast</span><span className="text-2xl font-bold text-purple-600">3.1%</span></div>
                  <ProgressBar value={62} max={100} label="" color="purple" />
                </div>
              </div>
            </ChartContainer>
          </div>

          {/* Final Call to Action */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mt-12 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white shadow-2xl text-center">
            <span className="text-6xl">💎</span>
            <h3 className="text-3xl font-black mt-4">The Bottom Line</h3>
            <p className="text-emerald-100 mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
              Bulgaria offers a unique convergence play within the EU framework. With 65% of EU average income 
              and a trajectory toward full convergence, the risk-reward profile favors long-term investors 
              focused on infrastructure, renewables, and export diversification. Political will for reforms 
              could compress the convergence timeline from 25 years to 15, generating superior returns.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm"><span className="font-bold">Target IRR: 12-15%</span></div>
              <div className="rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm"><span className="font-bold">Investment Horizon: 5-10 years</span></div>
              <div className="rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm"><span className="font-bold">Risk Rating: Moderate</span></div>
            </div>
          </motion.div>

          {/* Sources */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p className="font-semibold mb-2">Data Sources:</p>
            <p>Eurostat • IMF World Economic Outlook • World Bank • UNCTAD • Bulgarian National Bank</p>
            <p className="mt-2 text-xs">Analysis prepared for Bulgaria Investment Dashboard • Updated December 2025</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EconomicConvergenceDashboard;

