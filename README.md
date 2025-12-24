# 🇧🇬 Perspective for Bulgaria - Interactive Economic Dashboard

An interactive, data-driven web application showcasing Bulgaria's economic landscape through an immersive map-based journey from Europe to regional insights. Built with React, Three.js, and modern web technologies, featuring Lando Norris-inspired design aesthetics.

**Live Repository**: https://github.com/IliyaMar22/iliya_-_marto_perspective

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Data Sources](#data-sources)
- [Key Components](#key-components)
- [Navigation](#navigation)
- [Regional Data](#regional-data)
- [Design System](#design-system)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Credits](#credits)

---

## 🎯 Overview

**Perspective for Bulgaria** is an interactive economic dashboard that provides a comprehensive view of Bulgaria's economic development, regional metrics, and investment opportunities. The application features:

- **Interactive Bulgarian Map** with all 28 NUTS 3 regions
- **Regional Economic Data** from the National Statistical Institute (NSI)
- **R&D Expenditure Visualization** by region and sector
- **3D Animated Scenes** with Europe → Bulgaria → Regional zoom transitions
- **Multiple Dashboard Views** for various economic indicators
- **Smooth Animations** using GSAP and Framer Motion
- **Lando Norris-Inspired Design** with lime accent colors and premium UI

---

## ✨ Features

### 🗺️ Interactive Landing Page
- **Full SVG Bulgarian Map** with accurate regional boundaries
- **Color-coded regions** by development level (High/Medium/Low)
- **Hover effects** with smooth animations
- **Click-to-explore** detailed regional metrics
- **28 Regional Cards** with comprehensive economic data

### 📊 Regional Metrics Display
- **GDP per Capita** and total GDP
- **GVA Breakdown** by sector (Agriculture, Industry, Services)
- **Population** and demographic data
- **Key Industries** for each region
- **Development Indicators**

### 🔬 R&D Expenditure Data
- **Total R&D spending** by region
- **Sector breakdown**:
  - Business Enterprises
  - Government
  - Higher Education
  - Non-profit Institutions
- **Visual charts**: Pie, Bar, Stacked Bar, Area, Line charts

### 🎨 Multiple Dashboard Views
1. **Home** - Interactive map landing page
2. **Economic Overview** - GDP, fiscal stability, labor market
3. **Data360** - Comprehensive data dashboard
4. **Perspective** - PDF presentation viewer
5. **Economic Policies** - Policy analysis
6. **Investment Analysis** - Investment climate metrics
7. **Labour Data** - Labor market statistics
8. **EU Convergence** - EU integration progress

### 🎭 3D Visual Effects
- **WebGL Particle Background** with Three.js
- **Animated Camera Transitions** between scenes
- **Smooth Scroll Experience** with Lenis
- **GSAP Timeline Animations**

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.2.0** - UI library
- **TypeScript 4.9.5** - Type-safe JavaScript

### 3D Graphics & Animation
- **Three.js 0.160.0** - WebGL 3D rendering
- **@react-three/fiber 8.15.0** - React renderer for Three.js
- **@react-three/drei 9.96.0** - Three.js helpers
- **GSAP 3.12.5** - Professional animation library
- **Framer Motion 11.0.0** - React component animations

### Data Visualization
- **D3.js 7.8.5** - Geographic projections and data viz
- **Recharts 2.10.3** - React charting library
- **topojson-client 3.1.0** - TopoJSON data management

### UI & Styling
- **Tailwind CSS 3.3.6** - Utility-first CSS
- **@studio-freight/lenis 1.0.42** - Smooth scroll
- **Radix UI** - Accessible UI components
- **lucide-react 0.294.0** - Icon library

### State Management & Data
- **Zustand 4.4.7** - State management
- **Axios 1.6.2** - HTTP client

---

## 📦 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git** for cloning the repository
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB for node_modules and build files
- **Internet Connection**: Required for initial dependency installation

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/IliyaMar22/iliya_-_marto_perspective.git
cd iliya_-_marto_perspective
```

### 2. Install Dependencies

```bash
npm install
```

or using yarn:

```bash
yarn install
```

This will install all required packages (~200MB of dependencies).

### 3. (Optional) Add Presentation Files

If you have the presentation files, place them in the `public/` folder:
- `public/Sustainable-Growth-and-Competitiveness.pdf`
- `public/Sustainable-Growth-and-Competitiveness.pptx`

**Note**: These files are not tracked in git due to their size (25MB+), but are needed for the "Perspective" page to display the PDF inline.

---

## 🚀 Running the Application

### Development Mode

Start the development server on **port 3078**:

```bash
npm start
```

or

```bash
yarn start
```

The application will automatically open in your browser at:
```
http://localhost:3078
```

### Windows Users

If you're on Windows, use:

```bash
npm run start:windows
```

### Production Build

Create an optimized production build:

```bash
npm run build
```

This creates a `build/` folder with production-ready files.

### Serve Production Build Locally

```bash
npm install -g serve
serve -s build -l 3078
```

---

## 📁 Project Structure

```
iliya_-_marto_perspective/
├── public/
│   ├── data/                           # Data files
│   │   ├── bulgaria.geojson           # Bulgaria geographic data
│   │   ├── bulgaria-metrics.json      # Example metrics
│   │   ├── nsi-regions-2023.json      # NSI regional data (28 regions)
│   │   └── rd-expenditure-2024.json   # R&D expenditure data
│   ├── index.html                      # HTML entry point
│   └── manifest.json                   # PWA manifest
│
├── src/
│   ├── components/
│   │   ├── BurgerMenu.tsx             # Navigation menu
│   │   ├── Layout.tsx                  # Main layout wrapper
│   │   ├── PerspectiveView.tsx        # Landing page component
│   │   ├── RDExpenditureDashboard.tsx # R&D dashboard
│   │   │
│   │   ├── map/                        # Map components
│   │   │   ├── BulgarianSVGMap.tsx    # SVG map with 28 regions
│   │   │   ├── InteractiveMap.tsx     # D3.js map component
│   │   │   ├── DataLayer.tsx          # Metrics overlay
│   │   │   └── RegionHighlight.tsx    # Hover/click effects
│   │   │
│   │   ├── scenes/                     # Three.js scenes
│   │   │   ├── MainScene.tsx          # Scene orchestrator
│   │   │   ├── EuropeScene.tsx        # Europe view
│   │   │   ├── BulgariaScene.tsx      # Bulgaria zoom
│   │   │   └── RegionalDetailsScene.tsx
│   │   │
│   │   ├── sections/                   # Dashboard sections
│   │   │   ├── Hero.tsx
│   │   │   ├── EconomicGrowth.tsx
│   │   │   ├── Data360Dashboard.tsx
│   │   │   ├── PDFDataDashboard.tsx
│   │   │   ├── EconomicPoliciesDashboard.tsx
│   │   │   ├── InvestmentAnalysisDashboard.tsx
│   │   │   ├── LabourDataDashboard.tsx
│   │   │   └── EconomicConvergenceDashboard.tsx
│   │   │
│   │   ├── three/                      # Three.js components
│   │   │   └── ParticleField.tsx      # WebGL particles
│   │   │
│   │   ├── ui/                         # UI components
│   │   │   ├── MetricsPanel.tsx       # Regional metrics display
│   │   │   ├── ScrollProgress.tsx     # Scroll indicator
│   │   │   ├── NavigationDots.tsx     # Section navigation
│   │   │   ├── RegionLegend.tsx       # Color legend
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   └── charts/                     # Chart components
│   │       ├── LineChart.tsx
│   │       ├── BarChart.tsx
│   │       └── AreaChart.tsx
│   │
│   ├── hooks/                          # Custom React hooks
│   │   ├── useMapData.ts              # GeoJSON data management
│   │   ├── useRegionMetrics.ts        # Economic data fetching
│   │   ├── useScrollSection.ts        # Scroll tracking
│   │   └── useSmoothScroll.ts         # Lenis smooth scroll
│   │
│   ├── services/                       # API services
│   │   ├── dataService.ts             # Data fetching service
│   │   ├── worldBank.ts               # World Bank API
│   │   ├── eurostat.ts                # Eurostat API
│   │   └── worldBankData360.ts
│   │
│   ├── utils/                          # Utility functions
│   │   ├── bulgarianMapPaths.ts       # SVG paths for 28 regions
│   │   ├── formatters.ts              # Data formatters
│   │   ├── dataTransformers.ts
│   │   └── cache.ts                   # Caching utilities
│   │
│   ├── styles/
│   │   └── lando-norris.css           # Custom design system
│   │
│   ├── constants/
│   │   └── indicators.ts              # Economic indicators
│   │
│   ├── types/
│   │   └── index.ts                   # TypeScript types
│   │
│   ├── store/
│   │   └── dashboardStore.ts          # Zustand store
│   │
│   ├── App.tsx                         # Main App component
│   ├── index.tsx                       # React entry point
│   └── index.css                       # Global styles
│
├── .gitignore                          # Git ignore rules
├── package.json                        # Dependencies
├── tailwind.config.js                  # Tailwind configuration
├── tsconfig.json                       # TypeScript config
└── README.md                           # This file
```

---

## 📊 Data Sources

### National Statistical Institute (NSI) of Bulgaria
- **Regional GDP data** (28 NUTS 3 regions)
- **GVA breakdown** by sector
- **Population statistics**
- **Development indicators**
- **R&D expenditure** by region and sector

**Data Files**:
- `public/data/nsi-regions-2023.json` - Regional economic data
- `public/data/rd-expenditure-2024.json` - R&D spending data

### Other Sources
- **World Bank API** - Global economic indicators
- **Eurostat API** - European statistics
- **IMF Data** - International financial metrics

---

## 🗺️ Regional Data

The application includes data for all **28 Bulgarian NUTS 3 regions**:

### Northwestern Bulgaria (Северозападен район)
1. Vidin
2. Montana
3. Vratsa
4. Pleven
5. Lovech

### North-Central Bulgaria (Северен централен район)
6. Veliko Tarnovo
7. Gabrovo
8. Ruse
9. Razgrad
10. Silistra

### Northeastern Bulgaria (Североизточен район)
11. Varna
12. Dobrich
13. Shumen
14. Targovishte

### Southeastern Bulgaria (Югоизточен район)
15. Burgas
16. Sliven
17. Yambol
18. Stara Zagora

### South-Central Bulgaria (Южен централен район)
19. Plovdiv
20. Pazardzhik
21. Smolyan
22. Kardzhali
23. Haskovo

### Southwestern Bulgaria (Югозападен район)
24. Sofia (capital)
25. Sofia (province)
26. Blagoevgrad
27. Kyustendil
28. Pernik

Each region includes:
- GDP per capita
- Total GDP
- GVA breakdown (Agriculture, Industry, Services)
- Population
- Key industries
- Development level (High/Medium/Low)
- R&D expenditure data

---

## 🧭 Navigation

### Burger Menu
Click the **lime-colored burger button** in the top-left corner to access:

1. 🏠 **Home** - Interactive map landing page
2. 📊 **Economic Overview** - Economic indicators
3. 🌐 **Data360** - Comprehensive data dashboard
4. 📄 **Perspective** - PDF presentation viewer
5. 📋 **Economic Policies** - Policy analysis
6. 🎯 **Investment Analysis** - Investment insights
7. 👷 **Labour Data** - Labor market statistics
8. 🚀 **EU Convergence** - EU integration metrics

### Map Interaction
- **Hover** over regions to see names
- **Click** regions to view detailed metrics
- **Scroll** to navigate through sections
- **Color coding**:
  - 🟢 Lime: High development (GDP > 25k)
  - 🔵 Cyan: Medium development (GDP 15-25k)
  - 🔴 Pink: Low development (GDP < 15k)

---

## 🎨 Design System

### Color Palette (Lando Norris Inspired)
```css
--color-lime: #D2FF00       /* Primary accent */
--color-dark-green: #0A1F0A /* Background */
--color-white: #FFFFFF      /* Text */
--color-gray: #808080       /* Secondary text */
--color-cyan: #82E6FF       /* Medium development */
--color-pink: #FF6B9D       /* Low development */
--color-orange: #FFB082     /* R&D data */
```

### Typography
- **Font Family**: Inter, -apple-system, sans-serif
- **Impact Text**: 3rem to 8rem, bold, -0.02em letter-spacing
- **Body Text**: 16px to 18px, responsive with `clamp()`

### Animations
- **Scroll**: Lenis smooth scroll (1.2s duration)
- **Component**: Framer Motion with spring physics
- **3D**: GSAP with ScrollTrigger
- **Hover**: 0.3s ease transitions

---

## 🔧 Development

### Key Scripts

```json
{
  "start": "PORT=3078 react-scripts start",
  "start:windows": "set PORT=3078 && react-scripts start",
  "build": "CI=false GENERATE_SOURCEMAP=false react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

### Adding New Regions
To add data for a new region:

1. Edit `public/data/nsi-regions-2023.json`
2. Add new region entry:
```json
{
  "id": "new-region-id",
  "nuts_code": "BGXXX",
  "name": "Region Name",
  "name_en": "Region Name EN",
  "coordinates": [longitude, latitude],
  "metrics": {
    "gdp": 20000,
    "gdp_total": 5000000,
    "gva_agriculture": 500000,
    "gva_industry": 2000000,
    "gva_services": 2500000,
    "population": 250000
  },
  "industries": ["IT", "Manufacturing"],
  "developmentLevel": "medium"
}
```

### Adding New Dashboard Sections
1. Create component in `src/components/sections/`
2. Import in `src/App.tsx`
3. Add to burger menu in `src/components/BurgerMenu.tsx`
4. Add route logic in `App.tsx`

---

## 🐛 Troubleshooting

### Port Already in Use
If port 3078 is busy:
```bash
# Find and kill the process
lsof -ti:3078 | xargs kill -9

# Or use a different port
PORT=3079 npm start
```

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Restart TypeScript server
# In VSCode: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Build Failures
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Map Not Displaying
1. Check console for errors
2. Verify data files exist in `public/data/`
3. Clear browser cache
4. Ensure browser supports SVG

### Presentation Not Showing
1. Add PDF/PPTX files to `public/` folder
2. File names must match exactly:
   - `Sustainable-Growth-and-Competitiveness.pdf`
   - `Sustainable-Growth-and-Competitiveness.pptx`

---

## 🔒 Environment Variables (Optional)

Create `.env` file in project root for API configurations:

```env
# API Endpoints (optional, defaults to localhost)
REACT_APP_API_URL=http://localhost:8001
REACT_APP_WB_API=https://api.worldbank.org/v2
REACT_APP_EUROSTAT_API=https://ec.europa.eu/eurostat

# Feature Flags
REACT_APP_ENABLE_3D=true
REACT_APP_ENABLE_SMOOTH_SCROLL=true
```

**Note**: `.env` files are gitignored and not required for basic functionality.

---

## 📈 Performance Optimization

### Code Splitting
- Components are lazy-loaded using `React.lazy()`
- Routes split with dynamic imports

### Caching
- API responses cached in localStorage
- Cache duration: 1 hour (configurable)

### Asset Optimization
- Images: WebP format where possible
- Icons: SVG sprites
- Fonts: Self-hosted, preloaded

### Bundle Size
- Production build: ~2MB (gzipped: ~600KB)
- Initial load: ~800KB
- Code split chunks: ~200KB each

---

## 🌐 Browser Support

| Browser | Minimum Version | Tested |
|---------|----------------|---------|
| Chrome | 90+ | ✅ |
| Firefox | 88+ | ✅ |
| Safari | 14+ | ✅ |
| Edge | 90+ | ✅ |
| Opera | 76+ | ⚠️ |

**Requirements**:
- WebGL 2.0 support
- ES6+ JavaScript
- CSS Grid and Flexbox

---

## 📝 License

This project is private and proprietary. All rights reserved.

**Copyright © 2025 Iliya & Martin**

Unauthorized copying, distribution, or use of this software is strictly prohibited.

---

## 👥 Credits

### Development Team
- **Iliya** - Project Lead & Development
- **Martin** - Development & Data Integration

### Data Sources
- **National Statistical Institute (NSI)** of Bulgaria
- **World Bank** - Global economic data
- **Eurostat** - European statistics
- **IMF** - International financial metrics

### Design Inspiration
- **Lando Norris Website** - Premium UI/UX design patterns

### Technologies
- Built with **React**, **Three.js**, **D3.js**, and **Tailwind CSS**
- Animated with **GSAP** and **Framer Motion**
- Deployed on **GitHub**

---

## 📞 Contact & Support

For questions, issues, or contributions:

- **GitHub Repository**: https://github.com/IliyaMar22/iliya_-_marto_perspective
- **Issues**: https://github.com/IliyaMar22/iliya_-_marto_perspective/issues

---

## 🚀 Quick Start Summary

```bash
# 1. Clone the repository
git clone https://github.com/IliyaMar22/iliya_-_marto_perspective.git

# 2. Navigate to project folder
cd iliya_-_marto_perspective

# 3. Install dependencies
npm install

# 4. Start development server
npm start

# 5. Open browser
http://localhost:3078
```

---

## 📊 Project Statistics

- **Total Files**: 67
- **Lines of Code**: 11,390+
- **Languages**: TypeScript (97.4%), CSS (1.7%), Other (0.9%)
- **Components**: 29
- **Custom Hooks**: 4
- **Data Files**: 4
- **Regions Covered**: 28

---

## 🎯 Roadmap

### Planned Features
- [ ] Real-time data updates via APIs
- [ ] User authentication and saved preferences
- [ ] Export functionality for charts and data
- [ ] Mobile app version
- [ ] Multi-language support (Bulgarian, English, German)
- [ ] Advanced filtering and comparison tools
- [ ] Historical data trends (5-10 years)
- [ ] Predictive analytics and forecasting

### Future Enhancements
- [ ] Integration with more data sources
- [ ] Collaborative features (annotations, sharing)
- [ ] Custom dashboard builder
- [ ] PDF report generation
- [ ] API for external integrations

---

## ✨ Acknowledgments

Special thanks to:
- The Bulgarian National Statistical Institute for providing comprehensive regional data
- The open-source community for the amazing tools and libraries
- All contributors and testers who helped shape this project

---

**Built with ❤️ in Bulgaria**

**Last Updated**: December 24, 2025
