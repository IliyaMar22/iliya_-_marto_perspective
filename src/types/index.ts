// Core data types
export interface DataPoint {
  year: number;
  value: number;
  formatted?: string;
}

export interface TimeSeriesData {
  label: string;
  data: DataPoint[];
  color?: string;
}

export interface ComparisonData {
  bulgaria: DataPoint[];
  euAverage: DataPoint[];
  romania?: DataPoint[];
  poland?: DataPoint[];
  greece?: DataPoint[];
}

// World Bank API types
export interface WorldBankIndicator {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export interface WorldBankResponse {
  [0]: {
    page: number;
    pages: number;
    per_page: number;
    total: number;
  };
  [1]: WorldBankIndicator[];
}

// Eurostat API types
export interface EurostatResponse {
  version: string;
  label: string;
  source: string;
  updated: string;
  class: string;
  value: {
    [key: string]: number;
  };
  size: number[];
  id: string[];
  dimension: {
    [key: string]: {
      label: string;
      category: {
        index: {
          [key: string]: number;
        };
        label: {
          [key: string]: string;
        };
      };
    };
  };
  status: {
    [key: string]: string;
  };
}

// Indicator types
export interface GDPData {
  gdp: DataPoint[];
  gdpPerCapita: DataPoint[];
  growthRate: DataPoint[];
}

export interface LaborMarketData {
  unemployment: DataPoint[];
  employment: DataPoint[];
  averageWage: DataPoint[];
}

export interface FiscalData {
  debtToGDP: DataPoint[];
  deficit: DataPoint[];
}

export interface TradeData {
  exports: DataPoint[];
  imports: DataPoint[];
  balance: DataPoint[];
}

export interface FDIData {
  inflows: DataPoint[];
  stock: DataPoint[];
  bySector?: {
    sector: string;
    value: number;
  }[];
}

// Dashboard state
export interface DashboardState {
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  gdpData: GDPData | null;
  laborData: LaborMarketData | null;
  fiscalData: FiscalData | null;
  tradeData: TradeData | null;
  fdiData: FDIData | null;
  inflationData: DataPoint[] | null;
}

// Stat card props
export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
}

// Chart props
export interface ChartProps {
  data: TimeSeriesData[] | DataPoint[];
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
}

// Data source config
export interface DataSource {
  name: string;
  fetchFunction: () => Promise<any>;
  cacheKey: string;
  cacheDuration: number; // in minutes
  fallbackData?: any;
}



