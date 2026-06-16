import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'products',
    // Lazy-loads remote Products MFE at runtime via Module Federation
    loadChildren: () => import('productsApp/ProductsModule').then(m => m.ProductsModule)
  },
  {
    path: 'orders',
    // Lazy-loads remote Orders MFE at runtime via Module Federation
    loadChildren: () => import('ordersApp/OrdersModule').then(m => m.OrdersModule)
  },
  { path: '**', redirectTo: '' }
];
