import React from 'react';
import { StatCardProps } from '../../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  description,
  trend,
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </h3>
        {icon && (
          <div className="text-bulgaria-green flex-shrink-0">
            {React.isValidElement(icon) 
              ? React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5 sm:w-6 sm:h-6" })
              : icon
            }
          </div>
        )}
      </div>
      
      <div className="mt-3 sm:mt-4">
        <div className="flex items-baseline">
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {typeof value === 'number' 
              ? (value >= 1900 && value <= 2100 
                  ? String(value) // Years should not have comma separators
                  : value.toLocaleString()) 
              : value}
          </p>
        </div>
        
        {change !== undefined && (
          <div className={`mt-2 flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
            {changeLabel && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                {changeLabel}
              </span>
            )}
          </div>
        )}
        
        {description && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

