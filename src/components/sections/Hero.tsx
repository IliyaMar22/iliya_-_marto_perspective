import React from 'react';
import { StatCard } from '../ui/StatCard';
import { TrendingUp, Users, DollarSign, Building2, Globe, Award } from 'lucide-react';
import { KEY_STATS } from '../../constants/indicators';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-bulgaria-green via-bulgaria-green/90 to-bulgaria-red/20 text-white py-20 px-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto relative z-10 px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 text-balance px-2">
            Bulgaria: Europe's Rising Investment Star
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mt-4 sm:mt-6 px-2">
            Discover why Bulgaria offers exceptional opportunities for investors with data-driven insights into economic growth, stability, and potential.
          </p>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <StatCard
            title="GDP Growth Rate"
            value={`${KEY_STATS.GDP_GROWTH_2024}%`}
            icon={<TrendingUp className="w-6 h-6" />}
            description="2024 estimate"
            trend="up"
            change={KEY_STATS.GDP_GROWTH_2024}
            changeLabel="vs EU average"
          />
          
          <StatCard
            title="Unemployment Rate"
            value={`${KEY_STATS.UNEMPLOYMENT_RATE}%`}
            icon={<Users className="w-6 h-6" />}
            description="One of the lowest in EU"
            trend="down"
            change={-1.2}
            changeLabel="vs EU average"
          />
          
          <StatCard
            title="Corporate Tax Rate"
            value={`${KEY_STATS.CORPORATE_TAX}%`}
            icon={<DollarSign className="w-6 h-6" />}
            description="Flat rate - among lowest in EU"
            trend="neutral"
          />
          
          <StatCard
            title="EU Member Since"
            value={String(KEY_STATS.EU_MEMBER_SINCE)}
            icon={<Globe className="w-6 h-6" />}
            description="Full access to 500M+ consumers"
            trend="neutral"
          />
          
          <StatCard
            title="Employment Rate"
            value={`${KEY_STATS.EMPLOYMENT_RATE}%`}
            icon={<Building2 className="w-6 h-6" />}
            description="Strong labor market"
            trend="up"
            change={2.1}
            changeLabel="vs 2020"
          />
          
          <StatCard
            title="Government Debt"
            value={`${KEY_STATS.DEBT_TO_GDP}%`}
            icon={<Award className="w-6 h-6" />}
            description="Lowest in EU"
            trend="down"
            change={-5.2}
            changeLabel="vs EU average"
          />
        </div>
      </div>
    </section>
  );
};

