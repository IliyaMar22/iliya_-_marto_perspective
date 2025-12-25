import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Layout } from './components/Layout';
import { PageLoader } from './components/ui/LoadingSpinner';
import { Hero } from './components/sections/Hero';
import { EconomicGrowth } from './components/sections/EconomicGrowth';
import { LaborMarket } from './components/sections/LaborMarket';
import { FiscalStability } from './components/sections/FiscalStability';
import { InvestmentClimate } from './components/sections/InvestmentClimate';
import Data360Dashboard from './components/sections/Data360Dashboard';
import PDFDataDashboard from './components/sections/PDFDataDashboard';
import EconomicPoliciesDashboard from './components/sections/EconomicPoliciesDashboard';
import InvestmentAnalysisDashboard from './components/sections/InvestmentAnalysisDashboard';
import LabourDataDashboard from './components/sections/LabourDataDashboard';
import EconomicConvergenceDashboard from './components/sections/EconomicConvergenceDashboard';
import PerspectiveView from './components/PerspectiveView';
import BurgerMenu from './components/BurgerMenu';
import { useDashboardStore } from './store/dashboardStore';

function App() {
  const { loading, fetchData } = useDashboardStore();
  const [view, setView] = useState<'overview' | 'data360' | 'perspective' | 'interactive' | 'policies' | 'analysis' | 'labour' | 'convergence'>('interactive');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <ErrorBoundary>
      {/* Burger Menu Navigation */}
      <BurgerMenu currentView={view} onViewChange={(newView) => setView(newView as any)} />

      {/* Content - No Layout wrapper for interactive view */}
      {view === 'interactive' ? (
        <PerspectiveView />
      ) : (
        <Layout>
          {view === 'overview' ? (
            <>
              <Hero />
              <EconomicGrowth />
              <FiscalStability />
              <LaborMarket />
              <InvestmentClimate />
            </>
          ) : view === 'data360' ? (
            <Data360Dashboard />
          ) : view === 'perspective' ? (
            <PDFDataDashboard />
          ) : view === 'policies' ? (
            <div className="container mx-auto px-4 py-8">
              <EconomicPoliciesDashboard />
            </div>
          ) : view === 'analysis' ? (
            <InvestmentAnalysisDashboard />
          ) : view === 'labour' ? (
            <LabourDataDashboard />
          ) : view === 'convergence' ? (
            <EconomicConvergenceDashboard />
          ) : null}
        </Layout>
      )}
    </ErrorBoundary>
  );
}

export default App;
