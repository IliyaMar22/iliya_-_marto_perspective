import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
} from 'recharts';

// ============================================
// LABOUR FORCE SURVEY DATA - Q3 2025
// ============================================

// Key Labour Market Indicators
const KEY_INDICATORS = {
  unemploymentRate: { value: 3.4, change: -0.2, unit: '%' },
  employmentRate15_64: { value: 71.4, change: -0.3, unit: '%' },
  activityRate15_64: { value: 73.9, change: -0.5, unit: '%' },
  totalEmployed: { value: 2956, change: -8.8, unit: 'k' },
  totalUnemployed: { value: 104.5, change: -5.8, unit: 'k' },
  longTermUnemployment: { value: 1.4, change: -0.5, unit: '%' },
};

// Unemployment by Gender
const UNEMPLOYMENT_BY_GENDER = [
  { gender: 'Men', count: 59.5, percentage: 57.0, rate: 3.7, color: '#3B82F6' },
  { gender: 'Women', count: 45.0, percentage: 43.0, rate: 3.1, color: '#EC4899' },
];

// Unemployment by Education Level
const UNEMPLOYMENT_BY_EDUCATION = [
  { level: 'Tertiary Education', percentage: 19.4, rate: 1.7, color: '#22C55E' },
  { level: 'Upper Secondary', percentage: 56.4, rate: 3.7, color: '#3B82F6' },
  { level: 'Lower Secondary or Less', percentage: 24.2, rate: 9.6, color: '#F97316' },
];

// Employment by Age Group Comparison (Q3 2024 vs Q3 2025)
const EMPLOYMENT_BY_AGE = [
  { age: '15-24', q3_2024: 17.9, q3_2025: 17.0, change: -0.9 },
  { age: '15-29', q3_2024: 36.6, q3_2025: 34.4, change: -2.2 },
  { age: '20-64', q3_2024: 77.6, q3_2025: 77.5, change: -0.1 },
  { age: '55-64', q3_2024: 70.1, q3_2025: 71.9, change: 1.8 },
];

// Main Labour Market Indicators Comparison
const LABOUR_MARKET_COMPARISON = [
  { indicator: 'Activity Rate (15-64)', q3_2024: 74.4, q3_2025: 73.9, change: -0.5 },
  { indicator: 'Employment Rate (15-64)', q3_2024: 71.7, q3_2025: 71.4, change: -0.3 },
  { indicator: 'Unemployment Rate', q3_2024: 3.6, q3_2025: 3.4, change: -0.2 },
  { indicator: 'Long-term Unemployment', q3_2024: 1.9, q3_2025: 1.4, change: -0.5 },
];

// Employees by Economic Activity (thousands) - September 2025
const EMPLOYEES_BY_SECTOR = [
  { sector: 'Manufacturing', employees: 436968, avgWage: 2220, color: '#3B82F6' },
  { sector: 'Wholesale & Retail Trade', employees: 389975, avgWage: 2226, color: '#22C55E' },
  { sector: 'Human Health & Social Work', employees: 209357, avgWage: 2590, color: '#EC4899' },
  { sector: 'Education', employees: 173914, avgWage: 2937, color: '#F97316' },
  { sector: 'Transportation & Storage', employees: 143420, avgWage: 2229, color: '#8B5CF6' },
  { sector: 'Construction', employees: 138948, avgWage: 2105, color: '#EAB308' },
  { sector: 'Information & Communication', employees: 129554, avgWage: 5693, color: '#06B6D4' },
  { sector: 'Public Administration', employees: 114281, avgWage: 2785, color: '#14B8A6' },
  { sector: 'Accommodation & Food', employees: 110412, avgWage: 1636, color: '#F43F5E' },
  { sector: 'Professional & Scientific', employees: 87198, avgWage: 3458, color: '#A855F7' },
];

// Average Monthly Wages by Sector (BGN) - September 2025
const WAGES_BY_SECTOR = [
  { sector: 'IT & Communication', wage: 5693, icon: '💻' },
  { sector: 'Financial & Insurance', wage: 3725, icon: '🏦' },
  { sector: 'Electricity & Gas', wage: 3604, icon: '⚡' },
  { sector: 'Professional & Scientific', wage: 3458, icon: '🔬' },
  { sector: 'Mining & Quarrying', wage: 3112, icon: '⛏️' },
  { sector: 'Education', wage: 2937, icon: '🎓' },
  { sector: 'Public Administration', wage: 2785, icon: '🏛️' },
  { sector: 'Human Health', wage: 2590, icon: '🏥' },
  { sector: 'Real Estate', wage: 2406, icon: '🏠' },
  { sector: 'Arts & Entertainment', wage: 2294, icon: '🎭' },
  { sector: 'Manufacturing', wage: 2220, icon: '🏭' },
  { sector: 'Construction', wage: 2105, icon: '🏗️' },
  { sector: 'Agriculture', wage: 1810, icon: '🌾' },
  { sector: 'Accommodation & Food', wage: 1636, icon: '🍽️' },
];

// Monthly Wage Trends (July - September 2025)
const WAGE_TRENDS = [
  { month: 'July 2025', total: 2570, it: 5449, manufacturing: 2200, agriculture: 1778 },
  { month: 'August 2025', total: 2497, it: 5394, manufacturing: 2167, agriculture: 1702 },
  { month: 'September 2025', total: 2580, it: 5693, manufacturing: 2220, agriculture: 1810 },
];

// Total Employees Trend (July - September 2025)
const EMPLOYEES_TREND = [
  { month: 'July 2025', total: 2390952 },
  { month: 'August 2025', total: 2374438 },
  { month: 'September 2025', total: 2355499 },
];

// Gender breakdown for employment
const EMPLOYMENT_BY_GENDER = [
  { 
    category: 'Employed (15-64)', 
    male: 1494.5, 
    female: 1331.1,
    maleRate: 74.6,
    femaleRate: 68.1 
  },
  { 
    category: 'Unemployed', 
    male: 59.5, 
    female: 45.0,
    maleRate: 3.7,
    femaleRate: 3.1 
  },
];

const COLORS = ['#22C55E', '#3B82F6', '#F97316', '#EC4899', '#8B5CF6', '#EAB308', '#06B6D4', '#14B8A6', '#F43F5E', '#A855F7'];

const LabourDataDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'employment' | 'wages' | 'sectors'>('overview');

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <span className="text-5xl mr-3">👷</span>
          <h1 className="text-4xl font-extrabold text-gray-800">Labour Market Data</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Main Labour Force Survey Results - Third Quarter 2025
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Source: National Statistical Institute of Bulgaria
        </p>
      </div>

      {/* Key Indicators Flash Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-3">📊</span> Key Labour Market Indicators (Q3 2025)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">📉</div>
            <div className="text-3xl font-bold text-green-700">{KEY_INDICATORS.unemploymentRate.value}%</div>
            <div className="text-sm font-medium text-gray-600">Unemployment Rate</div>
            <div className="text-xs text-green-600 font-semibold mt-1">
              {KEY_INDICATORS.unemploymentRate.change} pp vs Q3 2024
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">💼</div>
            <div className="text-3xl font-bold text-blue-700">{KEY_INDICATORS.employmentRate15_64.value}%</div>
            <div className="text-sm font-medium text-gray-600">Employment Rate (15-64)</div>
            <div className="text-xs text-red-500 font-semibold mt-1">
              {KEY_INDICATORS.employmentRate15_64.change} pp vs Q3 2024
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-3xl font-bold text-purple-700">{KEY_INDICATORS.activityRate15_64.value}%</div>
            <div className="text-sm font-medium text-gray-600">Activity Rate (15-64)</div>
            <div className="text-xs text-red-500 font-semibold mt-1">
              {KEY_INDICATORS.activityRate15_64.change} pp vs Q3 2024
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-teal-100 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-3xl font-bold text-teal-700">{KEY_INDICATORS.totalEmployed.value}K</div>
            <div className="text-sm font-medium text-gray-600">Total Employed</div>
            <div className="text-xs text-red-500 font-semibold mt-1">
              {KEY_INDICATORS.totalEmployed.change}K vs Q3 2024
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-3xl font-bold text-orange-700">{KEY_INDICATORS.totalUnemployed.value}K</div>
            <div className="text-sm font-medium text-gray-600">Total Unemployed</div>
            <div className="text-xs text-green-600 font-semibold mt-1">
              {KEY_INDICATORS.totalUnemployed.change}K vs Q3 2024
            </div>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-3xl font-bold text-rose-700">{KEY_INDICATORS.longTermUnemployment.value}%</div>
            <div className="text-sm font-medium text-gray-600">Long-term Unemp.</div>
            <div className="text-xs text-green-600 font-semibold mt-1">
              {KEY_INDICATORS.longTermUnemployment.change} pp vs Q3 2024
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { id: 'overview', name: 'Overview', icon: '📋' },
          { id: 'employment', name: 'Employment & Unemployment', icon: '👷' },
          { id: 'wages', name: 'Wages & Salaries', icon: '💰' },
          { id: 'sectors', name: 'By Economic Sector', icon: '🏭' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Summary Text */}
          <section className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-3">📝</span> Labour Market Summary - Q3 2025
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-100 mb-3">Key Findings</h3>
                <ul className="space-y-2 text-green-50">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Unemployment rate fell to <strong>3.4%</strong>, down 0.2 pp from Q3 2024</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Employment rate (15-64) at <strong>71.4%</strong>, down 0.3 pp year-on-year</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Activity rate (15-64) at <strong>73.9%</strong>, down 0.5 pp from Q3 2024</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Total unemployed: <strong>104,500</strong> persons (57% men, 43% women)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-100 mb-3">Wage Highlights</h3>
                <ul className="space-y-2 text-green-50">
                  <li className="flex items-start">
                    <span className="mr-2">💰</span>
                    <span>Average monthly wage: <strong>BGN 2,580</strong> (Sept 2025)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💻</span>
                    <span>Highest wages in IT sector: <strong>BGN 5,693</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🏭</span>
                    <span>Manufacturing employs <strong>437,000+</strong> workers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📊</span>
                    <span>Total employees: <strong>2.36 million</strong> (Sept 2025)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Labour Market Comparison Chart */}
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📊</span> Labour Market Indicators: Q3 2024 vs Q3 2025
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LABOUR_MARKET_COMPARISON} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 80]} />
                  <YAxis type="category" dataKey="indicator" width={180} />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="q3_2024" fill="#94A3B8" name="Q3 2024" />
                  <Bar dataKey="q3_2025" fill="#22C55E" name="Q3 2025" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Total Employees Trend */}
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👥</span> Total Employees Trend (July - September 2025)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={EMPLOYEES_TREND}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[2340000, 2400000]} tickFormatter={(v) => `${(v/1000000).toFixed(2)}M`} />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 6 }} name="Total Employees" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Total employees decreased from 2.39M in July to 2.36M in September 2025
            </p>
          </section>
        </div>
      )}

      {/* Employment & Unemployment Tab */}
      {activeTab === 'employment' && (
        <div className="space-y-8">
          {/* Unemployment by Gender */}
          <div className="grid md:grid-cols-2 gap-6">
            <section className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">👫</span> Unemployment by Gender
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={UNEMPLOYMENT_BY_GENDER}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="count"
                      nameKey="gender"
                      label={({ gender, percentage }) => `${gender}: ${percentage}%`}
                    >
                      {UNEMPLOYMENT_BY_GENDER.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}K persons`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {UNEMPLOYMENT_BY_GENDER.map((item) => (
                  <div key={item.gender} className="text-center p-3 rounded-lg" style={{ backgroundColor: `${item.color}15` }}>
                    <div className="font-bold text-2xl" style={{ color: item.color }}>{item.rate}%</div>
                    <div className="text-sm text-gray-600">{item.gender} unemployment rate</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Unemployment by Education */}
            <section className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🎓</span> Unemployment by Education Level
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={UNEMPLOYMENT_BY_EDUCATION}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#22C55E" name="Unemployment Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {UNEMPLOYMENT_BY_EDUCATION.map((item) => (
                  <div key={item.level} className="flex justify-between items-center p-2 rounded-lg" style={{ backgroundColor: `${item.color}15` }}>
                    <span className="text-sm text-gray-700">{item.level}</span>
                    <div className="text-right">
                      <span className="font-bold" style={{ color: item.color }}>{item.rate}%</span>
                      <span className="text-xs text-gray-500 ml-2">({item.percentage}% of unemployed)</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Employment Rate by Age Group */}
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📈</span> Employment Rate by Age Group: Q3 2024 vs Q3 2025
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EMPLOYMENT_BY_AGE}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="q3_2024" fill="#94A3B8" name="Q3 2024" />
                  <Bar dataKey="q3_2025" fill="#22C55E" name="Q3 2025" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {EMPLOYMENT_BY_AGE.map((item) => (
                <div key={item.age} className={`text-center p-3 rounded-lg ${item.change >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="font-bold text-lg text-gray-800">{item.age}</div>
                  <div className={`text-sm font-semibold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change} pp
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Unemployment Statistics */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📋</span> Detailed Unemployment Statistics (Q3 2025)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-4 shadow">
                <h4 className="font-semibold text-gray-700 mb-3">Total Unemployed</h4>
                <div className="text-3xl font-bold text-blue-600">104,500</div>
                <div className="text-sm text-gray-500">persons</div>
                <div className="mt-3 text-xs text-green-600">↓ 5,800 vs Q3 2024</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <h4 className="font-semibold text-gray-700 mb-3">By Gender</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-600">Men:</span>
                    <span className="font-bold">59,500 (57%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pink-600">Women:</span>
                    <span className="font-bold">45,000 (43%)</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <h4 className="font-semibold text-gray-700 mb-3">Discouraged Persons</h4>
                <div className="text-3xl font-bold text-orange-600">17,100</div>
                <div className="text-sm text-gray-500">persons</div>
                <div className="mt-3 text-xs text-green-600">↓ 2,700 vs Q3 2024</div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Wages & Salaries Tab */}
      {activeTab === 'wages' && (
        <div className="space-y-8">
          {/* Average Wage Summary */}
          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-5xl font-bold">BGN 2,580</div>
                <div className="text-emerald-100 mt-2">Average Monthly Wage (Sept 2025)</div>
              </div>
              <div>
                <div className="text-5xl font-bold">BGN 5,693</div>
                <div className="text-emerald-100 mt-2">Highest (IT & Communication)</div>
              </div>
              <div>
                <div className="text-5xl font-bold">BGN 1,636</div>
                <div className="text-emerald-100 mt-2">Lowest (Accommodation & Food)</div>
              </div>
            </div>
          </section>

          {/* Wage Trends */}
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📈</span> Average Monthly Wages Trend (July - September 2025)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={WAGE_TRENDS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[1500, 6000]} />
                  <Tooltip formatter={(value: number) => `BGN ${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#22C55E" strokeWidth={3} name="Average Total" />
                  <Line type="monotone" dataKey="it" stroke="#3B82F6" strokeWidth={2} name="IT Sector" />
                  <Line type="monotone" dataKey="manufacturing" stroke="#F97316" strokeWidth={2} name="Manufacturing" />
                  <Line type="monotone" dataKey="agriculture" stroke="#84CC16" strokeWidth={2} name="Agriculture" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Wages by Sector Ranking */}
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">💰</span> Average Monthly Wages by Sector (September 2025)
            </h3>
            <div className="space-y-3">
              {WAGES_BY_SECTOR.map((item, idx) => {
                const maxWage = WAGES_BY_SECTOR[0].wage;
                const percentage = (item.wage / maxWage) * 100;
                return (
                  <div key={item.sector} className="flex items-center">
                    <div className="w-8 text-2xl">{item.icon}</div>
                    <div className="w-48 text-sm font-medium text-gray-700">{item.sector}</div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: COLORS[idx % COLORS.length]
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
                          BGN {item.wage.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-semibold text-gray-600">
                      #{idx + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* By Economic Sector Tab */}
      {activeTab === 'sectors' && (
        <div className="space-y-8">
          {/* Top 10 Sectors by Employment */}
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🏭</span> Top 10 Sectors by Number of Employees (September 2025)
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EMPLOYEES_BY_SECTOR} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(v) => formatNumber(v)} />
                  <YAxis type="category" dataKey="sector" width={200} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Bar dataKey="employees" name="Employees">
                    {EMPLOYEES_BY_SECTOR.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Employees vs Wages Comparison */}
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">⚖️</span> Employees vs Average Wages by Sector
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={EMPLOYEES_BY_SECTOR}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={100} />
                  <YAxis yAxisId="left" tickFormatter={(v) => formatNumber(v)} />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value: number, name: string) => 
                      name === 'employees' ? formatNumber(value) : `BGN ${value}`
                    } 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="employees" fill="#3B82F6" name="Employees" />
                  <Line yAxisId="right" type="monotone" dataKey="avgWage" stroke="#22C55E" strokeWidth={3} name="Avg Wage (BGN)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Note: IT & Communication has highest wages (BGN 5,693) but lower employee count compared to Manufacturing
            </p>
          </section>

          {/* Sector Details Table */}
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📋</span> Detailed Sector Statistics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sector</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Employees</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Avg Wage (BGN)</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {EMPLOYEES_BY_SECTOR.map((row, idx) => {
                    const totalEmployees = EMPLOYEES_BY_SECTOR.reduce((sum, s) => sum + s.employees, 0);
                    const percentage = ((row.employees / totalEmployees) * 100).toFixed(1);
                    return (
                      <tr key={row.sector} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: row.color }} />
                            {row.sector}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium">{formatNumber(row.employees)}</td>
                        <td className="px-4 py-3 text-sm text-right font-bold text-green-600">BGN {row.avgWage.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-500">{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-12">
        <p>Source: National Statistical Institute of Bulgaria</p>
        <p>Main Labour Force Survey Results - Third Quarter 2025</p>
        <p>Employees and Average Wages and Salaries - Third Quarter 2025</p>
      </div>
    </div>
  );
};

export default LabourDataDashboard;

