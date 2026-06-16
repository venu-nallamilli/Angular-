import { createReducer, on } from '@ngrx/store';
import { AppState, initialState } from './app.state';
import * as AppActions from './app.actions';

export const appReducer = createReducer<AppState>(
  initialState,
  on(AppActions.loadProducts, state => ({ ...state, loading: true, error: null })),
  on(AppActions.loadProductsSuccess, (state, { products }) => ({
    ...state, products, loading: false,
    stats: { ...state.stats, totalProducts: products.length }
  })),
  on(AppActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AppActions.loadOrders, state => ({ ...state, loading: true, error: null })),
  on(AppActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state, orders, loading: false,
    stats: {
      ...state.stats,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
      pendingOrders: orders.filter(o => o.status === 'pending').length
    }
  })),
  on(AppActions.loadOrdersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AppActions.updateOrderStatus, (state, { orderId, status }) => ({
    ...state,
    orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
  }))
);
