# Bulgaria Investment Dashboard - Data360 Enhanced 🌐

A comprehensive, multi-dimensional analytical platform showcasing Bulgaria's progress across economic, social, environmental, and technological dimensions. The application fetches **70+ real-time indicators** from World Bank Data360 API and visualizes them through compelling, interactive charts and professional dashboards.

## 🌟 Features

### Core Dashboard
- 📊 **Real-time Economic Data**: GDP, employment, inflation, FDI, government debt
- 📈 **Interactive Visualizations**: Beautiful charts using Recharts and D3.js
- 🎨 **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- ⚡ **Performance Optimized**: Smart caching, lazy loading, and optimized bundle
- 🔄 **Auto-refresh**: Automatic data updates with manual refresh option

### NEW: Data360 Comprehensive Analysis 🎉
- 👥 **People**: Education, Health, Labor & Demographics (18 indicators)
- 💰 **Prosperity**: Economic Performance, Trade & Innovation (17 indicators)
- 🌍 **Planet**: Environment, Energy & Climate (14 indicators)
- 🏗️ **Infrastructure**: Transport, Energy, Water & Urban (12 indicators)
- 💻 **Digital**: Internet, ICT & Digital Innovation (10 indicators)
- 📊 **70+ Indicators**: Comprehensive coverage from World Bank Data360
- 🎨 **Category Color Coding**: Purple, Green, Cyan, Orange, Blue themes
- 📈 **Historical Trends**: Data from 2000-present with YoY analysis

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts, D3.js, React-Plotly.js
- **State Management**: Zustand
- **Data Fetching**: Axios
- **UI Components**: Custom components with Radix UI primitives

## 🚀 Quick Deploy

**Deploy to Railway in 2 minutes:**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

Or see [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guides.

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd perspective-for-bulgaria-iliya-martin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3078](http://localhost:3078)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploying

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions to:
- Railway (Recommended)
- Vercel
- Netlify
- Render
- Docker

## Project Structure

```
src/
├── components/
│   ├── charts/          # Chart components (LineChart, BarChart, AreaChart)
│   ├── sections/         # Dashboard sections (Hero, EconomicGrowth, etc.)
│   └── ui/              # Reusable UI components (StatCard, Loading, etc.)
├── services/            # API services (World Bank, Eurostat, etc.)
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── utils/               # Utility functions (formatters, transformers, cache)
├── constants/           # Constants and configuration
└── App.tsx              # Main application component
```

## Data Sources

The dashboard fetches data from:

1. **World Bank API**: GDP, unemployment, inflation, FDI, government debt
2. **Eurostat API**: EU-specific economic indicators
3. **Bulgarian National Statistical Institute (NSI)**: Local economic data
4. **IMF Data**: Fiscal and monetary indicators

### API Configuration

Data fetching is configured in:
- `src/services/worldBank.ts` - World Bank API integration
- `src/services/eurostat.ts` - Eurostat API integration
- `src/services/dataService.ts` - Aggregated data service

### Caching

Data is cached in localStorage to:
- Reduce API calls
- Improve performance
- Provide offline fallback

Cache duration: 60 minutes (configurable in service files)

## Key Sections

1. **Hero Section**: Key statistics and headline numbers
2. **Economic Growth**: GDP trends and growth rates
3. **Fiscal Stability**: Government debt and fiscal position
4. **Labor Market**: Unemployment, employment, and workforce data
5. **Investment Climate**: FDI flows and investment opportunities

## Customization

### Colors

Bulgarian flag colors are used throughout:
- Primary Green: `#00966E`
- Red: `#D62612`
- White: `#FFFFFF`

Colors can be customized in `tailwind.config.js` and `src/constants/indicators.ts`

### Adding New Data Sources

1. Create a new service file in `src/services/`
2. Add the data fetching logic
3. Integrate with `src/services/dataService.ts`
4. Update types in `src/types/index.ts`

### Adding New Charts

1. Create a new chart component in `src/components/charts/`
2. Use Recharts, D3.js, or React-Plotly.js
3. Follow the existing chart component patterns

## Performance Optimization

- **Code Splitting**: Lazy loading of chart components
- **Caching**: localStorage for API responses
- **Debouncing**: User interaction debouncing
- **Virtualization**: For long lists (if needed)
- **Bundle Optimization**: Tree shaking and minification

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

### Code Style

- TypeScript strict mode enabled
- ESLint configuration included
- Prettier recommended for formatting

## Troubleshooting

### API Errors

If APIs fail to load:
- Check browser console for errors
- Verify API endpoints are accessible
- Fallback data will be used automatically
- Clear cache: `localStorage.clear()` in browser console

### Build Errors

- Ensure all dependencies are installed: `npm install`
- Clear node_modules and reinstall if needed
- Check Node.js version (16+ required)

## License

This project is for educational and informational purposes.

## Acknowledgments

- Data provided by World Bank, Eurostat, NSI, and IMF
- Built with React, TypeScript, and Tailwind CSS
- Chart libraries: Recharts, D3.js, Plotly.js

## 🎉 NEW in Version 2.0 - Data360 Enhancement

### What's New
- ✅ **70+ New Indicators** across 5 major categories
- ✅ **Data360 Dashboard** with comprehensive analysis
- ✅ **Tab Navigation** to switch between views
- ✅ **Category Sections** with color-coded themes
- ✅ **Enhanced Charts** with trend analysis
- ✅ **Stat Cards** with latest values and context
- ✅ **World Bank Data360 API** integration
- ✅ **Smart Caching** for optimal performance

### Quick Start with Data360
```bash
npm start
# Click "🌐 Data360 Comprehensive Analysis" tab
```

### Documentation
- 📘 **Enhancement Guide**: See `DATA360_ENHANCEMENT_GUIDE.md`
- 🚀 **Quick Start**: See `DATA360_QUICK_START.md`
- 📊 **API Docs**: See enhancement guide for API details

## Future Enhancements

- [ ] Country comparison (Bulgaria vs Romania, Greece, Poland)
- [ ] Export charts as images/PDF
- [ ] Dark mode toggle
- [ ] Multi-language support (Bulgarian, English)
- [ ] Advanced filtering and custom date ranges
- [ ] Sector-specific deep dives
- [ ] Investment calculator tool
- [ ] Predictive analytics and forecasting
- [ ] Real-time WebSocket updates



