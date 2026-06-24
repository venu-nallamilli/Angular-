import { createAction, props } from '@ngrx/store';
import { Product, Order } from './app.state';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: string }>());

export const loadOrders = createAction('[Orders] Load Orders');
export const loadOrdersSuccess = createAction('[Orders] Load Orders Success', props<{ orders: Order[] }>());
export const loadOrdersFailure = createAction('[Orders] Load Orders Failure', props<{ error: string }>());

export const updateOrderStatus = createAction('[Orders] Update Status', props<{ orderId: number; status: Order['status'] }>());
