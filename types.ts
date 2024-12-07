export interface Order {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'OPEN' | 'FILLED' | 'CANCELLED' | 'REJECTED';
  createdAt: string;
  filledAt?: string;
  suggestedBy?: string;
  reason?: string;
}

export interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export interface BotMember {
  id: string;
  name: string;
  ordersCount: number;
  commissionCosts: number;
  skillScore: number;
}

export interface PortfolioItem {
  symbol: string;
  quantity: number;
  averagePrice: number;
}

export interface Stats {
  cash: number;
  networth: number;
  performance: number;
}
