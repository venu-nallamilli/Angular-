import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, delay } from 'rxjs/operators';
import * as AppActions from './app.actions';
import { Product, Order } from './app.state';

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Angular Pro Toolkit',   category: 'Software', price: 299, stock: 45,  status: 'active' },
  { id: 2, name: 'NgRx State Manager',    category: 'Library',  price: 149, stock: 120, status: 'active' },
  { id: 3, name: 'RxJS Operators Pack',   category: 'Library',  price: 99,  stock: 80,  status: 'active' },
  { id: 4, name: 'Module Federation CLI', category: 'DevTools', price: 199, stock: 30,  status: 'active' },
  { id: 5, name: 'Legacy UI Kit v1',      category: 'UI',       price: 49,  stock: 0,   status: 'inactive' },
];

const MOCK_ORDERS: Order[] = [
  { id: 101, productName: 'Angular Pro Toolkit',   quantity: 2, total: 598, status: 'delivered', date: '2024-12-01' },
  { id: 102, productName: 'NgRx State Manager',    quantity: 1, total: 149, status: 'shipped',   date: '2024-12-03' },
  { id: 103, productName: 'RxJS Operators Pack',   quantity: 3, total: 297, status: 'pending',   date: '2024-12-05' },
  { id: 104, productName: 'Module Federation CLI', quantity: 1, total: 199, status: 'pending',   date: '2024-12-06' },
  { id: 105, productName: 'Angular Pro Toolkit',   quantity: 1, total: 299, status: 'cancelled', date: '2024-11-28' },
];

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadProducts),
      switchMap(() =>
        of(MOCK_PRODUCTS).pipe(
          delay(600),
          map(products => AppActions.loadProductsSuccess({ products })),
          catchError(err => of(AppActions.loadProductsFailure({ error: err.message })))
        )
      )
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadOrders),
      switchMap(() =>
        of(MOCK_ORDERS).pipe(
          delay(800),
          map(orders => AppActions.loadOrdersSuccess({ orders })),
          catchError(err => of(AppActions.loadOrdersFailure({ error: err.message })))
        )
      )
    )
  );
}
