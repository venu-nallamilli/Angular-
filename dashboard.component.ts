import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, DashboardStats, Order } from '../../store/app.state';
import { selectStats, selectLoading, selectRecentOrders } from '../../store/app.selectors';
import * as AppActions from '../../store/app.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard">
      <div class="dashboard__header">
        <h1>Dashboard</h1>
        <p class="subtitle">Live data from NgRx Store — dispatched on component init</p>
      </div>

      <ng-container *ngIf="loading$ | async; else loaded">
        <div class="loading-grid">
          <div class="skeleton" *ngFor="let i of [1,2,3,4]"></div>
        </div>
      </ng-container>

      <ng-template #loaded>
        <ng-container *ngIf="stats$ | async as stats">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-card__label">Total Products</div>
              <div class="stat-card__value">{{ stats.totalProducts }}</div>
              <div class="stat-card__trend positive">+3 this month</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__label">Total Orders</div>
              <div class="stat-card__value">{{ stats.totalOrders }}</div>
              <div class="stat-card__trend positive">+12% vs last month</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__label">Revenue</div>
              <div class="stat-card__value">\${{ stats.totalRevenue | number }}</div>
              <div class="stat-card__trend positive">+8.4% vs last month</div>
            </div>
            <div class="stat-card stat-card--warn">
              <div class="stat-card__label">Pending Orders</div>
              <div class="stat-card__value">{{ stats.pendingOrders }}</div>
              <div class="stat-card__trend warn">Needs attention</div>
            </div>
          </div>
        </ng-container>

        <div class="recent-orders">
          <h2>Recent Orders</h2>
          <table class="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let order of recentOrders$ | async">
                <td class="order-id">#{{ order.id }}</td>
                <td>{{ order.productName }}</td>
                <td>{{ order.quantity }}</td>
                <td>\${{ order.total }}</td>
                <td>{{ order.date }}</td>
                <td><span class="status-badge" [class]="'status-' + order.status">{{ order.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .dashboard__header { margin-bottom: 2rem; }
    .dashboard__header h1 { font-size: 1.6rem; font-weight: 700; }
    .subtitle { color: var(--color-text-muted); font-size: 0.85rem; margin-top: 4px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem; }
    .stat-card--warn { border-color: rgba(245,158,11,0.3); }
    .stat-card__label { font-size: 0.78rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .stat-card__value { font-size: 2rem; font-weight: 700; color: var(--color-text-primary); }
    .stat-card__trend { font-size: 0.78rem; margin-top: 6px; }
    .positive { color: var(--color-success); }
    .warn { color: var(--color-warning); }
    .loading-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
    .skeleton { height: 110px; background: var(--color-surface); border-radius: var(--radius-md); animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    .recent-orders h2 { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; }
    .orders-table { width: 100%; border-collapse: collapse; background: var(--color-surface); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border); }
    .orders-table th { padding: 10px 16px; text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); background: var(--color-surface-2); border-bottom: 1px solid var(--color-border); }
    .orders-table td { padding: 12px 16px; font-size: 0.875rem; border-bottom: 1px solid var(--color-border); }
    .orders-table tr:last-child td { border-bottom: none; }
    .order-id { color: var(--color-accent); font-weight: 500; }
    .status-badge { padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 500; }
    .status-delivered { background: rgba(16,185,129,0.15); color: var(--color-success); }
    .status-shipped   { background: rgba(99,102,241,0.15); color: var(--color-accent); }
    .status-pending   { background: rgba(245,158,11,0.15); color: var(--color-warning); }
    .status-cancelled { background: rgba(239,68,68,0.15);  color: var(--color-danger); }
  `]
})
export class DashboardComponent implements OnInit {
  stats$        = this.store.select(selectStats);
  loading$      = this.store.select(selectLoading);
  recentOrders$ = this.store.select(selectRecentOrders);

  constructor(private store: Store<{ app: AppState }>) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.loadProducts());
    this.store.dispatch(AppActions.loadOrders());
  }
}
