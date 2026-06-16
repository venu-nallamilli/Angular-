export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
}

export interface Order {
  id: number;
  productName: string;
  quantity: number;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export interface AppState {
  products: Product[];
  orders: Order[];
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
}

export const initialState: AppState = {
  products: [],
  orders: [],
  stats: { totalProducts: 0, totalOrders: 0, totalRevenue: 0, pendingOrders: 0 },
  loading: false,
  error: null
};
