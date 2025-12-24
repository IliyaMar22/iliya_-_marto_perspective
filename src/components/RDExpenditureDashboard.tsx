import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

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
  note: string;
  unit: string;
  total: {
    region: string;
    total: number;
    business_enterprises: number;
    government: number;
    higher_education: number;
    non_profit_institutions: number;
  };
  macro_regions: RDData[];
}

const COLORS = ['#D2FF00', '#82E6FF', '#FFB082', '#FF6B9D', '#9D82FF'];

const RDExpenditureDashboard = () => {
  const [data, setData] = useState<RDExpenditureData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/rd-expenditure-2024.json')
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading R&D data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-lime-400 text-2xl">Loading R&D Data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-red-400 text-2xl">Error loading R&D data</div>
      </div>
    );
  }

  // Prepare data for sector pie chart (total by sector)
  const sectorData = [
    {
      name: 'Business Enterprises',
      value: data.total.business_enterprises,
      percentage: ((data.total.business_enterprises / data.total.total) * 100).toFixed(1),
    },
    {
      name: 'Government',
      value: data.total.government,
      percentage: ((data.total.government / data.total.total) * 100).toFixed(1),
    },
    {
      name: 'Higher Education',
      value: data.total.higher_education,
      percentage: ((data.total.higher_education / data.total.total) * 100).toFixed(1),
    },
    {
      name: 'Non-Profit',
      value: data.total.non_profit_institutions,
      percentage: ((data.total.non_profit_institutions / data.total.total) * 100).toFixed(1),
    },
  ];

  // Prepare data for regional comparison
  const regionalData = data.macro_regions.map((region) => ({
    name: region.region_en.split(' ').slice(0, 2).join(' '), // Shorten names
    total: region.total / 1000, // Convert to millions
    business: region.business_enterprises ? region.business_enterprises / 1000 : 0,
    government: region.government ? region.government / 1000 : 0,
    education: region.higher_education ? region.higher_education / 1000 : 0,
    nonprofit: region.non_profit_institutions ? region.non_profit_institutions / 1000 : 0,
  }));

  // Format currency
  const formatCurrency = (value: number) => {
    return `€${(value / 1000).toFixed(1)}M`;
  };

  const formatThousand = (value: number) => {
    return `€${value.toLocaleString()}K`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-lime-400 mb-4">
            R&D Expenditure in Bulgaria
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Total Intramural R&D Expenditure (GERD) - {data.year}
          </p>
          <p className="text-sm text-gray-400">{data.source}</p>
          <p className="text-xs text-yellow-400 mt-2">{data.note}</p>
        </div>

        {/* Total Summary Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-lime-400/20 to-cyan-400/20 border-2 border-lime-400 rounded-xl p-6 mb-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-lime-400 mb-4 text-center">
            Total R&D Expenditure: {formatCurrency(data.total.total)}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-gray-400 text-sm">Business</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(data.total.business_enterprises)}
              </div>
              <div className="text-lime-400 text-sm">
                {((data.total.business_enterprises / data.total.total) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm">Government</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(data.total.government)}
              </div>
              <div className="text-cyan-400 text-sm">
                {((data.total.government / data.total.total) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm">Higher Education</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(data.total.higher_education)}
              </div>
              <div className="text-orange-400 text-sm">
                {((data.total.higher_education / data.total.total) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm">Non-Profit</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(data.total.non_profit_institutions)}
              </div>
              <div className="text-pink-400 text-sm">
                {((data.total.non_profit_institutions / data.total.total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sector Distribution Pie Chart */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black/60 backdrop-blur-lg border border-lime-400/30 rounded-xl p-6 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-lime-400 mb-4 text-center">
              Expenditure by Sector
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => formatThousand(value)}
                  contentStyle={{
                    backgroundColor: '#000',
                    border: '1px solid #D2FF00',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Regional Comparison Bar Chart */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black/60 backdrop-blur-lg border border-cyan-400/30 rounded-xl p-6 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
              Total R&D by Region
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={regionalData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  type="number"
                  stroke="#888"
                  tickFormatter={(value) => `€${value}M`}
                />
                <YAxis type="category" dataKey="name" stroke="#888" width={100} />
                <Tooltip
                  formatter={(value: any) => `€${value.toFixed(1)}M`}
                  contentStyle={{
                    backgroundColor: '#000',
                    border: '1px solid #82E6FF',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="total" fill="#82E6FF" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Sector Breakdown by Region - Stacked Bar Chart */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-black/60 backdrop-blur-lg border border-orange-400/30 rounded-xl p-6 shadow-xl mb-8"
        >
          <h3 className="text-2xl font-bold text-orange-400 mb-4 text-center">
            Sector Breakdown by Region
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#888" tickFormatter={(value) => `€${value}M`} />
              <Tooltip
                formatter={(value: any) => `€${value.toFixed(1)}M`}
                contentStyle={{
                  backgroundColor: '#000',
                  border: '1px solid #FFB082',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="business" stackId="a" fill="#D2FF00" name="Business" />
              <Bar dataKey="government" stackId="a" fill="#82E6FF" name="Government" />
              <Bar dataKey="education" stackId="a" fill="#FFB082" name="Education" />
              <Bar dataKey="nonprofit" stackId="a" fill="#FF6B9D" name="Non-Profit" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Area Chart - Sector Trends */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-black/60 backdrop-blur-lg border border-pink-400/30 rounded-xl p-6 shadow-xl mb-8"
        >
          <h3 className="text-2xl font-bold text-pink-400 mb-4 text-center">
            Sector Distribution Across Regions
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#888" tickFormatter={(value) => `€${value}M`} />
              <Tooltip
                formatter={(value: any) => `€${value.toFixed(1)}M`}
                contentStyle={{
                  backgroundColor: '#000',
                  border: '1px solid #FF6B9D',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="business"
                stackId="1"
                stroke="#D2FF00"
                fill="#D2FF00"
                name="Business"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="government"
                stackId="1"
                stroke="#82E6FF"
                fill="#82E6FF"
                name="Government"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="education"
                stackId="1"
                stroke="#FFB082"
                fill="#FFB082"
                name="Education"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="nonprofit"
                stackId="1"
                stroke="#FF6B9D"
                fill="#FF6B9D"
                name="Non-Profit"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Detailed Data Table */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-black/60 backdrop-blur-lg border border-lime-400/30 rounded-xl p-6 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-lime-400 mb-4 text-center">
            Detailed Regional Data
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-lime-400">
                  <th className="text-left p-3 text-lime-400">Region</th>
                  <th className="text-right p-3 text-lime-400">Total</th>
                  <th className="text-right p-3 text-cyan-400">Business</th>
                  <th className="text-right p-3 text-orange-400">Government</th>
                  <th className="text-right p-3 text-pink-400">Education</th>
                  <th className="text-right p-3 text-purple-400">Non-Profit</th>
                </tr>
              </thead>
              <tbody>
                {data.macro_regions.map((region, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-lime-400/10 transition-colors"
                  >
                    <td className="p-3 font-semibold">{region.region_en}</td>
                    <td className="text-right p-3 text-white font-bold">
                      {formatThousand(region.total)}
                    </td>
                    <td className="text-right p-3 text-cyan-400">
                      {region.business_enterprises
                        ? formatThousand(region.business_enterprises)
                        : '..'}
                    </td>
                    <td className="text-right p-3 text-orange-400">
                      {region.government ? formatThousand(region.government) : '..'}
                    </td>
                    <td className="text-right p-3 text-pink-400">
                      {region.higher_education ? formatThousand(region.higher_education) : '..'}
                    </td>
                    <td className="text-right p-3 text-purple-400">
                      {region.non_profit_institutions
                        ? formatThousand(region.non_profit_institutions)
                        : '..'}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-lime-400 bg-lime-400/10">
                  <td className="p-3 font-bold text-lime-400">TOTAL</td>
                  <td className="text-right p-3 text-white font-bold">
                    {formatThousand(data.total.total)}
                  </td>
                  <td className="text-right p-3 text-cyan-400 font-bold">
                    {formatThousand(data.total.business_enterprises)}
                  </td>
                  <td className="text-right p-3 text-orange-400 font-bold">
                    {formatThousand(data.total.government)}
                  </td>
                  <td className="text-right p-3 text-pink-400 font-bold">
                    {formatThousand(data.total.higher_education)}
                  </td>
                  <td className="text-right p-3 text-purple-400 font-bold">
                    {formatThousand(data.total.non_profit_institutions)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            ".." indicates confidential data | All values in thousand EUR
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RDExpenditureDashboard;

