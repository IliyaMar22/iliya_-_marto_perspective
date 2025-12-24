import React from 'react';

interface SimpleStatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: string;
  color?: 'purple' | 'prosperity' | 'planet' | 'infrastructure' | 'digital' | 'green' | 'blue';
}

const SimpleStatCard: React.FC<SimpleStatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = 'green',
}) => {
  const colorClasses = {
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    prosperity: 'bg-green-50 border-green-200 text-green-700',
    planet: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    infrastructure: 'bg-orange-50 border-orange-200 text-orange-700',
    digital: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
  };

  const iconBgColors = {
    purple: 'bg-purple-100',
    prosperity: 'bg-green-100',
    planet: 'bg-cyan-100',
    infrastructure: 'bg-orange-100',
    digital: 'bg-blue-100',
    green: 'bg-green-100',
    blue: 'bg-blue-100',
  };

  return (
    <div className={`rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border-2 transition-all hover:shadow-lg ${colorClasses[color]}`}>
      {icon && (
        <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full ${iconBgColors[color]} flex items-center justify-center mb-2 sm:mb-3 lg:mb-4`}>
          <span className="text-lg sm:text-xl lg:text-2xl">{icon}</span>
        </div>
      )}
      
      <h3 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1 sm:mb-2">
        {title}
      </h3>
      
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
        {value}
      </p>
      
      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SimpleStatCard;

