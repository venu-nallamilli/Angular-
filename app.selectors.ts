import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');
export const selectProducts = createSelector(selectAppState, s => s.products);
export const selectOrders   = createSelector(selectAppState, s => s.orders);
export const selectStats    = createSelector(selectAppState, s => s.stats);
export const selectLoading  = createSelector(selectAppState, s => s.loading);

export const selectActiveProducts = createSelector(
  selectProducts,
  products => products.filter(p => p.status === 'active')
);

export const selectRecentOrders = createSelector(
  selectOrders,
  orders => [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)
);
