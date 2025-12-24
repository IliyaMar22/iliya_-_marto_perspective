import { DataPoint } from '../types';

/**
 * Mock data for Bulgaria based on real historical trends
 * Used as fallback when APIs are unavailable
 */

// GDP Growth Rate (Annual %) - Historical data
export const mockGDPGrowth: DataPoint[] = [
  { year: 2000, value: 5.4, formatted: '5.4%' },
  { year: 2001, value: 4.1, formatted: '4.1%' },
  { year: 2002, value: 4.8, formatted: '4.8%' },
  { year: 2003, value: 4.5, formatted: '4.5%' },
  { year: 2004, value: 6.6, formatted: '6.6%' },
  { year: 2005, value: 6.2, formatted: '6.2%' },
  { year: 2006, value: 6.3, formatted: '6.3%' },
  { year: 2007, value: 6.2, formatted: '6.2%' },
  { year: 2008, value: 6.0, formatted: '6.0%' },
  { year: 2009, value: -5.5, formatted: '-5.5%' },
  { year: 2010, value: 0.4, formatted: '0.4%' },
  { year: 2011, value: 1.8, formatted: '1.8%' },
  { year: 2012, value: 0.6, formatted: '0.6%' },
  { year: 2013, value: 0.9, formatted: '0.9%' },
  { year: 2014, value: 1.3, formatted: '1.3%' },
  { year: 2015, value: 3.6, formatted: '3.6%' },
  { year: 2016, value: 3.9, formatted: '3.9%' },
  { year: 2017, value: 3.5, formatted: '3.5%' },
  { year: 2018, value: 3.1, formatted: '3.1%' },
  { year: 2019, value: 3.7, formatted: '3.7%' },
  { year: 2020, value: -4.2, formatted: '-4.2%' },
  { year: 2021, value: 4.2, formatted: '4.2%' },
  { year: 2022, value: 3.9, formatted: '3.9%' },
  { year: 2023, value: 3.2, formatted: '3.2%' },
  { year: 2024, value: 3.2, formatted: '3.2%' },
];

// GDP (current US$) - Historical data
export const mockGDP: DataPoint[] = [
  { year: 2000, value: 12680000000, formatted: '$12.68B' },
  { year: 2001, value: 13300000000, formatted: '$13.30B' },
  { year: 2002, value: 14200000000, formatted: '$14.20B' },
  { year: 2003, value: 16000000000, formatted: '$16.00B' },
  { year: 2004, value: 20000000000, formatted: '$20.00B' },
  { year: 2005, value: 26000000000, formatted: '$26.00B' },
  { year: 2006, value: 31000000000, formatted: '$31.00B' },
  { year: 2007, value: 40000000000, formatted: '$40.00B' },
  { year: 2008, value: 52000000000, formatted: '$52.00B' },
  { year: 2009, value: 48000000000, formatted: '$48.00B' },
  { year: 2010, value: 48000000000, formatted: '$48.00B' },
  { year: 2011, value: 54000000000, formatted: '$54.00B' },
  { year: 2012, value: 51000000000, formatted: '$51.00B' },
  { year: 2013, value: 55000000000, formatted: '$55.00B' },
  { year: 2014, value: 56000000000, formatted: '$56.00B' },
  { year: 2015, value: 50000000000, formatted: '$50.00B' },
  { year: 2016, value: 53000000000, formatted: '$53.00B' },
  { year: 2017, value: 58000000000, formatted: '$58.00B' },
  { year: 2018, value: 66000000000, formatted: '$66.00B' },
  { year: 2019, value: 68000000000, formatted: '$68.00B' },
  { year: 2020, value: 69000000000, formatted: '$69.00B' },
  { year: 2021, value: 84000000000, formatted: '$84.00B' },
  { year: 2022, value: 90000000000, formatted: '$90.00B' },
  { year: 2023, value: 95000000000, formatted: '$95.00B' },
  { year: 2024, value: 100000000000, formatted: '$100.00B' },
];

// GDP Per Capita (current US$)
export const mockGDPPerCapita: DataPoint[] = [
  { year: 2000, value: 1600, formatted: '$1,600' },
  { year: 2001, value: 1680, formatted: '$1,680' },
  { year: 2002, value: 1800, formatted: '$1,800' },
  { year: 2003, value: 2030, formatted: '$2,030' },
  { year: 2004, value: 2540, formatted: '$2,540' },
  { year: 2005, value: 3310, formatted: '$3,310' },
  { year: 2006, value: 3950, formatted: '$3,950' },
  { year: 2007, value: 5100, formatted: '$5,100' },
  { year: 2008, value: 6650, formatted: '$6,650' },
  { year: 2009, value: 6150, formatted: '$6,150' },
  { year: 2010, value: 6150, formatted: '$6,150' },
  { year: 2011, value: 6950, formatted: '$6,950' },
  { year: 2012, value: 6550, formatted: '$6,550' },
  { year: 2013, value: 7100, formatted: '$7,100' },
  { year: 2014, value: 7200, formatted: '$7,200' },
  { year: 2015, value: 6450, formatted: '$6,450' },
  { year: 2016, value: 6850, formatted: '$6,850' },
  { year: 2017, value: 7500, formatted: '$7,500' },
  { year: 2018, value: 8550, formatted: '$8,550' },
  { year: 2019, value: 8800, formatted: '$8,800' },
  { year: 2020, value: 8950, formatted: '$8,950' },
  { year: 2021, value: 10900, formatted: '$10,900' },
  { year: 2022, value: 11700, formatted: '$11,700' },
  { year: 2023, value: 12350, formatted: '$12,350' },
  { year: 2024, value: 13000, formatted: '$13,000' },
];

// Unemployment Rate (%)
export const mockUnemployment: DataPoint[] = [
  { year: 2000, value: 16.0, formatted: '16.0%' },
  { year: 2001, value: 17.3, formatted: '17.3%' },
  { year: 2002, value: 12.9, formatted: '12.9%' },
  { year: 2003, value: 13.5, formatted: '13.5%' },
  { year: 2004, value: 12.0, formatted: '12.0%' },
  { year: 2005, value: 10.1, formatted: '10.1%' },
  { year: 2006, value: 8.9, formatted: '8.9%' },
  { year: 2007, value: 6.9, formatted: '6.9%' },
  { year: 2008, value: 5.6, formatted: '5.6%' },
  { year: 2009, value: 6.8, formatted: '6.8%' },
  { year: 2010, value: 10.3, formatted: '10.3%' },
  { year: 2011, value: 11.3, formatted: '11.3%' },
  { year: 2012, value: 12.3, formatted: '12.3%' },
  { year: 2013, value: 13.0, formatted: '13.0%' },
  { year: 2014, value: 11.4, formatted: '11.4%' },
  { year: 2015, value: 9.2, formatted: '9.2%' },
  { year: 2016, value: 7.6, formatted: '7.6%' },
  { year: 2017, value: 6.2, formatted: '6.2%' },
  { year: 2018, value: 5.2, formatted: '5.2%' },
  { year: 2019, value: 4.3, formatted: '4.3%' },
  { year: 2020, value: 5.0, formatted: '5.0%' },
  { year: 2021, value: 4.8, formatted: '4.8%' },
  { year: 2022, value: 4.2, formatted: '4.2%' },
  { year: 2023, value: 3.9, formatted: '3.9%' },
  { year: 2024, value: 3.9, formatted: '3.9%' },
];

// Employment Rate (%)
export const mockEmployment: DataPoint[] = [
  { year: 2000, value: 55.2, formatted: '55.2%' },
  { year: 2005, value: 58.5, formatted: '58.5%' },
  { year: 2010, value: 59.8, formatted: '59.8%' },
  { year: 2015, value: 62.3, formatted: '62.3%' },
  { year: 2020, value: 68.5, formatted: '68.5%' },
  { year: 2021, value: 69.2, formatted: '69.2%' },
  { year: 2022, value: 70.1, formatted: '70.1%' },
  { year: 2023, value: 70.4, formatted: '70.4%' },
  { year: 2024, value: 70.4, formatted: '70.4%' },
];

// Government Debt to GDP (%)
export const mockDebt: DataPoint[] = [
  { year: 2000, value: 74.5, formatted: '74.5%' },
  { year: 2005, value: 28.3, formatted: '28.3%' },
  { year: 2010, value: 16.2, formatted: '16.2%' },
  { year: 2015, value: 26.0, formatted: '26.0%' },
  { year: 2020, value: 25.0, formatted: '25.0%' },
  { year: 2021, value: 23.1, formatted: '23.1%' },
  { year: 2022, value: 23.1, formatted: '23.1%' },
  { year: 2023, value: 23.1, formatted: '23.1%' },
  { year: 2024, value: 23.1, formatted: '23.1%' },
];

// FDI Inflows (% of GDP)
export const mockFDI: DataPoint[] = [
  { year: 2000, value: 5.2, formatted: '5.2%' },
  { year: 2005, value: 12.5, formatted: '12.5%' },
  { year: 2010, value: 3.8, formatted: '3.8%' },
  { year: 2015, value: 2.1, formatted: '2.1%' },
  { year: 2020, value: 1.8, formatted: '1.8%' },
  { year: 2021, value: 2.5, formatted: '2.5%' },
  { year: 2022, value: 3.2, formatted: '3.2%' },
  { year: 2023, value: 3.5, formatted: '3.5%' },
  { year: 2024, value: 3.5, formatted: '3.5%' },
];

// Inflation Rate (%)
export const mockInflation: DataPoint[] = [
  { year: 2000, value: 10.3, formatted: '10.3%' },
  { year: 2005, value: 2.6, formatted: '2.6%' },
  { year: 2010, value: 3.0, formatted: '3.0%' },
  { year: 2015, value: -1.1, formatted: '-1.1%' },
  { year: 2020, value: 1.2, formatted: '1.2%' },
  { year: 2021, value: 2.8, formatted: '2.8%' },
  { year: 2022, value: 15.3, formatted: '15.3%' },
  { year: 2023, value: 5.1, formatted: '5.1%' },
  { year: 2024, value: 2.5, formatted: '2.5%' },
];

