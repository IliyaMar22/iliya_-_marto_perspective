// Country codes
export const COUNTRY_CODES = {
  BULGARIA: 'BGR',
  ROMANIA: 'ROU',
  POLAND: 'POL',
  GREECE: 'GRC',
  EU: 'EU',
} as const;

// World Bank Indicators - Core Economics
export const WORLD_BANK_INDICATORS = {
  GDP: 'NY.GDP.MKTP.CD', // GDP (current US$)
  GDP_PER_CAPITA: 'NY.GDP.PCAP.CD', // GDP per capita (current US$)
  GDP_GROWTH: 'NY.GDP.MKTP.KD.ZG', // GDP growth (annual %)
  FDI_NET_INFLOWS: 'BX.KLT.DINV.WD.GD.ZS', // Foreign direct investment, net inflows (% of GDP)
  INFLATION: 'FP.CPI.TOTL.ZG', // Inflation, consumer prices (annual %)
  UNEMPLOYMENT: 'SL.UEM.TOTL.ZS', // Unemployment, total (% of total labor force)
  EMPLOYMENT: 'SL.EMP.TOTL.SP.ZS.IN', // Employment to population ratio, 15+, total (%)
  TRADE_BALANCE: 'NE.TRD.GNFS.ZS', // Trade (% of GDP)
  GOVERNMENT_DEBT: 'GC.DOD.TOTL.GD.ZS', // Central government debt, total (% of GDP)
  EASE_OF_BUSINESS: 'IC.BUS.EASE.XQ', // Ease of doing business index
} as const;

// World Bank Data360 Indicators - PEOPLE Category
export const DATA360_PEOPLE_INDICATORS = {
  // Education
  LEARNING_POVERTY: 'HD.HCI.LNRN', // Learning poverty rate (%)
  SCHOOL_ENROLLMENT_PRIMARY: 'SE.PRM.NENR', // School enrollment, primary (% net)
  SCHOOL_ENROLLMENT_SECONDARY: 'SE.SEC.NENR', // School enrollment, secondary (% net)
  SCHOOL_ENROLLMENT_TERTIARY: 'SE.TER.ENRR', // School enrollment, tertiary (% gross)
  LITERACY_RATE: 'SE.ADT.LITR.ZS', // Literacy rate, adult total (% of people ages 15 and above)
  
  // Health
  LIFE_EXPECTANCY: 'SP.DYN.LE00.IN', // Life expectancy at birth, total (years)
  INFANT_MORTALITY: 'SP.DYN.IMRT.IN', // Mortality rate, infant (per 1,000 live births)
  MATERNAL_MORTALITY: 'SH.STA.MMRT', // Maternal mortality ratio (per 100,000 live births)
  HOSPITAL_BEDS: 'SH.MED.BEDS.ZS', // Hospital beds (per 1,000 people)
  PHYSICIANS_DENSITY: 'SH.MED.PHYS.ZS', // Physicians (per 1,000 people)
  HEALTH_EXPENDITURE: 'SH.XPD.CHEX.GD.ZS', // Current health expenditure (% of GDP)
  
  // Labor & Demographics
  LABOR_FORCE_PARTICIPATION: 'SL.TLF.CACT.ZS', // Labor force participation rate, total (% of total population ages 15+)
  LABOR_FORCE_FEMALE: 'SL.TLF.CACT.FE.ZS', // Labor force participation rate, female (% of female population ages 15+)
  POPULATION_TOTAL: 'SP.POP.TOTL', // Population, total
  POPULATION_GROWTH: 'SP.POP.GROW', // Population growth (annual %)
  URBAN_POPULATION: 'SP.URB.TOTL.IN.ZS', // Urban population (% of total population)
  AGE_DEPENDENCY_RATIO: 'SP.POP.DPND', // Age dependency ratio (% of working-age population)
  
  // Social Protection
  POVERTY_HEADCOUNT_190: 'SI.POV.DDAY', // Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)
  GINI_INDEX: 'SI.POV.GINI', // Gini index (World Bank estimate)
} as const;

// World Bank Data360 Indicators - PROSPERITY Category
export const DATA360_PROSPERITY_INDICATORS = {
  // Economic Performance
  GDP_GROWTH_ANNUAL: 'NY.GDP.MKTP.KD.ZG', // GDP growth (annual %)
  GDP_PER_CAPITA_GROWTH: 'NY.GDP.PCAP.KD.ZG', // GDP per capita growth (annual %)
  GNI_PER_CAPITA: 'NY.GNP.PCAP.CD', // GNI per capita, Atlas method (current US$)
  GNI_PPP: 'NY.GNP.PCAP.PP.CD', // GNI per capita, PPP (current international $)
  
  // Trade & Investment
  TRADE_PERCENT_GDP: 'NE.TRD.GNFS.ZS', // Trade (% of GDP)
  EXPORTS_GOODS_SERVICES: 'NE.EXP.GNFS.ZS', // Exports of goods and services (% of GDP)
  IMPORTS_GOODS_SERVICES: 'NE.IMP.GNFS.ZS', // Imports of goods and services (% of GDP)
  FDI_INFLOWS: 'BX.KLT.DINV.CD.WD', // Foreign direct investment, net inflows (BoP, current US$)
  FDI_OUTFLOWS: 'BM.KLT.DINV.CD.WD', // Foreign direct investment, net outflows (BoP, current US$)
  
  // Financial Inclusion
  ACCOUNT_OWNERSHIP: 'FX.OWN.TOTL.ZS', // Account ownership at a financial institution or with a mobile-money-service provider (% of population ages 15+)
  DOMESTIC_CREDIT_PRIVATE: 'FS.AST.PRVT.GD.ZS', // Domestic credit to private sector (% of GDP)
  MARKET_CAPITALIZATION: 'CM.MKT.LCAP.GD.ZS', // Market capitalization of listed domestic companies (% of GDP)
  
  // Inequality & Poverty
  POVERTY_HEADCOUNT_365: 'SI.POV.UMIC', // Poverty headcount ratio at $3.65 a day (2017 PPP) (% of population)
  INCOME_SHARE_LOWEST_20: 'SI.DST.FRST.20', // Income share held by lowest 20%
  INCOME_SHARE_HIGHEST_20: 'SI.DST.05TH.20', // Income share held by highest 20%
  
  // Innovation & Competitiveness
  RESEARCH_DEVELOPMENT: 'GB.XPD.RSDV.GD.ZS', // Research and development expenditure (% of GDP)
  HIGH_TECH_EXPORTS: 'TX.VAL.TECH.CD', // High-technology exports (current US$)
  PATENT_APPLICATIONS: 'IP.PAT.RESD', // Patent applications, residents
} as const;

// World Bank Data360 Indicators - PLANET Category
export const DATA360_PLANET_INDICATORS = {
  // Emissions & Climate
  CO2_EMISSIONS: 'EN.ATM.CO2E.PC', // CO2 emissions (metric tons per capita)
  GHG_EMISSIONS: 'EN.ATM.GHGT.KT.CE', // Total greenhouse gas emissions (kt of CO2 equivalent)
  METHANE_EMISSIONS: 'EN.ATM.METH.KT.CE', // Methane emissions (kt of CO2 equivalent)
  NITROUS_OXIDE_EMISSIONS: 'EN.ATM.NOXE.KT.CE', // Nitrous oxide emissions (thousand metric tons of CO2 equivalent)
  
  // Energy
  RENEWABLE_ENERGY: 'EG.FEC.RNEW.ZS', // Renewable energy consumption (% of total final energy consumption)
  FOSSIL_FUEL_CONSUMPTION: 'EG.USE.COMM.FO.ZS', // Fossil fuel energy consumption (% of total)
  ENERGY_USE_PER_CAPITA: 'EG.USE.PCAP.KG.OE', // Energy use (kg of oil equivalent per capita)
  ELECTRICITY_PRODUCTION_RENEWABLE: 'EG.ELC.RNEW.ZS', // Electricity production from renewable sources, excluding hydroelectric (% of total)
  
  // Natural Resources & Environment
  FOREST_AREA: 'AG.LND.FRST.ZS', // Forest area (% of land area)
  AGRICULTURAL_LAND: 'AG.LND.AGRI.ZS', // Agricultural land (% of land area)
  WATER_STRESS: 'ER.H2O.FWTL.ZS', // Level of water stress: freshwater withdrawal as a proportion of available freshwater resources
  PM25_AIR_POLLUTION: 'EN.ATM.PM25.MC.M3', // PM2.5 air pollution, mean annual exposure (micrograms per cubic meter)
  
  // Biodiversity
  PROTECTED_AREAS: 'ER.PTD.TOTL.ZS', // Terrestrial and marine protected areas (% of total territorial area)
  THREATENED_SPECIES: 'EN.MAM.THRD.NO', // Mammal species, threatened
} as const;

// World Bank Data360 Indicators - INFRASTRUCTURE Category
export const DATA360_INFRASTRUCTURE_INDICATORS = {
  // Transport
  ROADS_PAVED: 'IS.ROD.PAVE.ZS', // Roads, paved (% of total roads)
  RAIL_LINES: 'IS.RRS.TOTL.KM', // Rail lines (total route-km)
  AIR_TRANSPORT_PASSENGERS: 'IS.AIR.PSGR', // Air transport, passengers carried
  CONTAINER_PORT_TRAFFIC: 'IS.SHP.GOOD.TU', // Container port traffic (TEU: 20 foot equivalent units)
  
  // Energy & Utilities
  ACCESS_ELECTRICITY: 'EG.ELC.ACCS.ZS', // Access to electricity (% of population)
  ELECTRIC_POWER_CONSUMPTION: 'EG.USE.ELEC.KH.PC', // Electric power consumption (kWh per capita)
  ELECTRICITY_TRANSMISSION_LOSSES: 'EG.ELC.LOSS.ZS', // Electric power transmission and distribution losses (% of output)
  
  // Water & Sanitation
  ACCESS_CLEAN_WATER: 'SH.H2O.SMDW.ZS', // People using safely managed drinking water services (% of population)
  ACCESS_SANITATION: 'SH.STA.SMSS.ZS', // People using safely managed sanitation services (% of population)
  
  // Urban Development
  URBAN_POPULATION_PERCENT: 'SP.URB.TOTL.IN.ZS', // Urban population (% of total population)
  URBAN_POPULATION_GROWTH: 'SP.URB.GROW', // Urban population growth (annual %)
  PPI_INVESTMENT: 'IE.PPI.TELE.CD', // Investment in telecoms with private participation (current US$)
} as const;

// World Bank Data360 Indicators - DIGITAL Category
export const DATA360_DIGITAL_INDICATORS = {
  // Internet & Connectivity
  INTERNET_USERS: 'IT.NET.USER.ZS', // Individuals using the Internet (% of population)
  MOBILE_SUBSCRIPTIONS: 'IT.CEL.SETS.P2', // Mobile cellular subscriptions (per 100 people)
  FIXED_BROADBAND: 'IT.NET.BBND.P2', // Fixed broadband subscriptions (per 100 people)
  SECURE_INTERNET_SERVERS: 'IT.NET.SECR.P6', // Secure Internet servers (per 1 million people)
  
  // ICT Development
  ICT_GOODS_EXPORTS: 'TX.VAL.ICTG.ZS.UN', // ICT goods exports (% of total goods exports)
  ICT_GOODS_IMPORTS: 'TM.VAL.ICTG.ZS.UN', // ICT goods imports (% total goods imports)
  ICT_SERVICE_EXPORTS: 'BX.GSR.CCIS.ZS', // ICT service exports (% of service exports, BoP)
  
  // Innovation & Technology
  RESEARCH_RESEARCHERS: 'SP.POP.SCIE.RD.P6', // Researchers in R&D (per million people)
  SCIENTIFIC_ARTICLES: 'IP.JRN.ARTC.SC', // Scientific and technical journal articles
  TRADEMARK_APPLICATIONS: 'IP.TMK.TOTL', // Trademark applications, total
} as const;

// Eurostat Indicators
export const EUROSTAT_INDICATORS = {
  GDP: 'nama_10_gdp', // GDP and main components
  UNEMPLOYMENT: 'une_rt_a', // Unemployment rate
  FDI_FLOWS: 'bop_fdi6_flow', // FDI flows
  GOVERNMENT_DEBT: 'gov_10dd_edpt1', // Government debt
  LABOR_COSTS: 'lc_lci_r2_a', // Labor cost index
  TRADE: 'ext_lt_intratrd', // International trade
} as const;

// Time ranges
export const TIME_RANGES = {
  ALL: { start: 2000, end: new Date().getFullYear() },
  LAST_10: { start: new Date().getFullYear() - 10, end: new Date().getFullYear() },
  LAST_5: { start: new Date().getFullYear() - 5, end: new Date().getFullYear() },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  WORLD_BANK: 'https://api.worldbank.org/v2',
  EUROSTAT: 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data',
  IMF: 'https://www.imf.org/external/datamapper/api',
} as const;

// Key statistics (fallback data if APIs fail)
export const KEY_STATS = {
  GDP_GROWTH_2024: 3.2,
  UNEMPLOYMENT_RATE: 3.9,
  CORPORATE_TAX: 10,
  EU_MEMBER_SINCE: 2007,
  EMPLOYMENT_RATE: 70.4,
  DEBT_TO_GDP: 23.1,
  INFLATION_2024: 2.5,
} as const;

// Combined All Indicators for Easy Access
export const ALL_DATA360_INDICATORS = {
  ...DATA360_PEOPLE_INDICATORS,
  ...DATA360_PROSPERITY_INDICATORS,
  ...DATA360_PLANET_INDICATORS,
  ...DATA360_INFRASTRUCTURE_INDICATORS,
  ...DATA360_DIGITAL_INDICATORS,
} as const;

// Indicator Categories for UI Organization
export const INDICATOR_CATEGORIES = {
  PEOPLE: 'People',
  PROSPERITY: 'Prosperity',
  PLANET: 'Planet',
  INFRASTRUCTURE: 'Infrastructure',
  DIGITAL: 'Digital',
} as const;

// Indicator Metadata for Display
export const INDICATOR_METADATA = {
  // People
  LEARNING_POVERTY: { name: 'Learning Poverty', unit: '%', category: 'People', description: 'Share of children at end-of-primary age below minimum reading proficiency' },
  LIFE_EXPECTANCY: { name: 'Life Expectancy', unit: 'years', category: 'People', description: 'Life expectancy at birth, total' },
  LABOR_FORCE_FEMALE: { name: 'Female Labor Force Participation', unit: '%', category: 'People', description: 'Labor force participation rate, female (% of female population ages 15+)' },
  GINI_INDEX: { name: 'Gini Index', unit: '0-100', category: 'People', description: 'Income inequality index (0 = perfect equality, 100 = perfect inequality)' },
  
  // Prosperity
  GDP_GROWTH_ANNUAL: { name: 'GDP Growth', unit: '% p.a.', category: 'Prosperity', description: 'Annual GDP growth rate' },
  POVERTY_HEADCOUNT_365: { name: 'Poverty Rate ($3.65/day)', unit: '%', category: 'Prosperity', description: 'Poverty headcount ratio at $3.65 a day (2017 PPP)' },
  ACCOUNT_OWNERSHIP: { name: 'Financial Account Ownership', unit: '%', category: 'Prosperity', description: 'Account ownership at financial institution or mobile-money provider' },
  FDI_INFLOWS: { name: 'FDI Inflows', unit: 'USD', category: 'Prosperity', description: 'Foreign direct investment, net inflows' },
  
  // Planet
  CO2_EMISSIONS: { name: 'CO2 Emissions', unit: 'metric tons per capita', category: 'Planet', description: 'CO2 emissions per capita' },
  GHG_EMISSIONS: { name: 'Total GHG Emissions', unit: 'kt CO2e', category: 'Planet', description: 'Total greenhouse gas emissions' },
  RENEWABLE_ENERGY: { name: 'Renewable Energy', unit: '%', category: 'Planet', description: 'Renewable energy consumption (% of total final energy)' },
  WATER_STRESS: { name: 'Water Stress Level', unit: '%', category: 'Planet', description: 'Freshwater withdrawal as proportion of available resources' },
  
  // Infrastructure
  ACCESS_ELECTRICITY: { name: 'Access to Electricity', unit: '%', category: 'Infrastructure', description: 'Access to electricity (% of population)' },
  URBAN_POPULATION_PERCENT: { name: 'Urban Population', unit: '%', category: 'Infrastructure', description: 'Urban population (% of total)' },
  ACCESS_CLEAN_WATER: { name: 'Access to Clean Water', unit: '%', category: 'Infrastructure', description: 'People using safely managed drinking water services' },
  ROADS_PAVED: { name: 'Paved Roads', unit: '%', category: 'Infrastructure', description: 'Roads, paved (% of total roads)' },
  
  // Digital
  INTERNET_USERS: { name: 'Internet Users', unit: '%', category: 'Digital', description: 'Individuals using the Internet (% of population)' },
  MOBILE_SUBSCRIPTIONS: { name: 'Mobile Subscriptions', unit: 'per 100 people', category: 'Digital', description: 'Mobile cellular subscriptions per 100 people' },
  FIXED_BROADBAND: { name: 'Fixed Broadband', unit: 'per 100 people', category: 'Digital', description: 'Fixed broadband subscriptions per 100 people' },
  ICT_SERVICE_EXPORTS: { name: 'ICT Service Exports', unit: '% of service exports', category: 'Digital', description: 'ICT service exports as % of total service exports' },
} as const;

// Color palette
export const CHART_COLORS = {
  primary: '#00966E', // Bulgarian green
  secondary: '#D62612', // Bulgarian red
  accent: '#0066CC', // Blue
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  bulgaria: '#00966E',
  eu: '#0066CC',
  romania: '#FFD700',
  poland: '#DC143C',
  greece: '#0D5EAF',
  // Category colors for Data360
  people: '#8B5CF6', // Purple
  prosperity: '#10B981', // Green
  planet: '#06B6D4', // Cyan
  infrastructure: '#F59E0B', // Orange
  digital: '#3B82F6', // Blue
} as const;

// Sectors
export const SECTORS = [
  'Information Technology',
  'Manufacturing',
  'Services',
  'Agriculture',
  'Energy',
  'Tourism',
  'Real Estate',
  'Financial Services',
] as const;



