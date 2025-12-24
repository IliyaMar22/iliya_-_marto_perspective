import React from 'react';
import { RefreshCw, Clock } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { formatDate } from '../utils/formatters';
import { PDFExportButton } from './ui/PDFExportButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { lastUpdate, refreshData, loading } = useDashboardStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-bulgaria-green to-bulgaria-red rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-lg">BG</span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate">
                  Bulgaria Investment Dashboard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Data-driven investment insights
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {lastUpdate && (
                <div className="hidden md:flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="whitespace-nowrap">Updated: {formatDate(lastUpdate)}</span>
                </div>
              )}
              <div className="hidden sm:block">
                <PDFExportButton />
              </div>
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-bulgaria-green text-white rounded-lg hover:bg-bulgaria-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-base touch-manipulation"
                aria-label="Refresh data"
              >
                <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
          {/* Mobile: Show update time and PDF button below */}
          {lastUpdate && (
            <div className="md:hidden flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Updated: {formatDate(lastUpdate)}</span>
              </div>
              <PDFExportButton />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">About</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive data-driven showcase of Bulgaria's economic growth and investment opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Data Sources</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• World Bank API</li>
                <li>• Eurostat API</li>
                <li>• Bulgarian National Statistical Institute</li>
                <li>• IMF Data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Disclaimer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This dashboard is for informational purposes only. Data is sourced from official statistical agencies and may be subject to revision.
              </p>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p>© {new Date().getFullYear()} Bulgaria Investment Dashboard | Built with React & TypeScript</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

