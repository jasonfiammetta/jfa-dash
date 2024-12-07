import { useState, useCallback } from 'react';

import { Stock, Order, PortfolioItem } from '@/types';
import { CandlestickData } from 'lightweight-charts';

export function useTradingData() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [currentStats, setCurrentStats] = useState({ totalValue: 10000, dailyChange: 2.5 });
  const [chartData, setChartData] = useState<CandlestickData[]>([]);
  const [listData, setListData] = useState([]);
  const [openOrders, setOpenOrders] = useState<Order[]>([]);
  const [filledOrders, setFilledOrders] = useState<Order[]>([]);
  const [suggestedOrders, setSuggestedOrders] = useState<Order[]>([]);
  const [botStats, setBotStats] = useState([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  const updateData = useCallback((message: { type: string; payload: any }) => {
    switch (message.type) {
      case 'STOCK_LIST':
        setStocks(message.payload)
        break
      case 'CURRENT_STATS':
        setCurrentStats(message.payload);
        break;
      case 'CHART_DATA':
        setChartData(message.payload);
        break;
      case 'LIST_DATA':
        setListData(message.payload);
        break;
      case 'OPEN_ORDERS':
        setOpenOrders(message.payload);
        break;
      case 'FILLED_ORDERS':
        setFilledOrders(message.payload);
        break;
      case 'SUGGESTED_ORDERS':
        setSuggestedOrders(message.payload);
        break;
      case 'BOT_STATS':
        setBotStats(message.payload);
        break;
      case 'PORTFOLIO':
        setPortfolio(message.payload);
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }, []);

  // const executeOrder = useCallback((order: Order) => {
  //   setOpenOrders(prev: Order[] => [...prev, { ...order, status: 'OPEN' }]);
  //   setSuggestedOrders((prev: Order[]) => prev.filter(o => o.id !== order.id));
  // }, []);

  const executeOrder = (order: Order) => {}

  return {
    stocks,
    currentStats,
    chartData,
    listData,
    openOrders,
    filledOrders,
    suggestedOrders,
    botStats,
    portfolio,
    executeOrder,
    updateData
  };
}
