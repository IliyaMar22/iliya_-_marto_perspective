import React from 'react';
import { StatCard } from '../ui/StatCard';
import { TrendingUp, Users, DollarSign, Building2, Globe, Award } from 'lucide-react';
import { KEY_STATS } from '../../constants/indicators';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-black text-white py-20 px-4 overflow-hidden">
      {/* Background pattern */}
      <div className="grid-pattern" />

      <div className="container mx-auto relative z-10 px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-impact mb-3 sm:mb-4 text-balance px-2">
            Bulgaria: Europe's Rising Investment Star
          </h1>
          <p className="text-subtitle max-w-3xl mx-auto mt-4 sm:mt-6 px-2">
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

