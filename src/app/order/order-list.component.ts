import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectOrders, selectLoading } from '../../../../../shell-app/src/app/store/app.selectors';
import * as AppActions from '../../../../../shell-app/src/app/store/app.actions';
import { Order } from '../../../../../shell-app/src/app/store/app.state';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="order-list">
      <div class="order-list__header">
        <h1>Orders</h1>
        <span class="remote-badge">Remote MFE — port 4202</span>
      </div>

      <ng-container *ngIf="loading$ | async; else loaded">
        <div class="loading">Loading orders...</div>
      </ng-container>

      <ng-template #loaded>
        <table class="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders$ | async">
              <td class="order-id">#{{ order.id }}</td>
              <td>{{ order.productName }}</td>
              <td>{{ order.quantity }}</td>
              <td>\${{ order.total }}</td>
              <td>{{ order.date }}</td>
              <td>
                <span class="badge" [class]="'badge--' + order.status">{{ order.status }}</span>
              </td>
              <td>
                <select class="status-select"
                  [value]="order.status"
                  (change)="onStatusChange(order.id, $any($event.target).value)">
                  <option value="pending">pending</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </ng-template>
    </div>
  `,
  styles: [`
    .order-list__header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
    .order-list__header h1 { font-size: 1.5rem; font-weight: 700; }
    .remote-badge { font-size: 0.7rem; padding: 3px 10px; background: rgba(16,185,129,0.12); color: #10b981; border: 1px solid rgba(16,185,129,0.3); border-radius: 20px; }
    .loading { color: #94a3b8; padding: 2rem; text-align: center; }
    .table { width: 100%; border-collapse: collapse; background: #1a1d27; border-radius: 10px; overflow: hidden; border: 1px solid #2e3347; }
    .table th { padding: 10px 16px; text-align: left; font-size: 0.75rem; text-transform: uppercase; color: #64748b; background: #22263a; border-bottom: 1px solid #2e3347; }
    .table td { padding: 12px 16px; font-size: 0.875rem; border-bottom: 1px solid #2e3347; color: #f1f5f9; }
    .table tr:last-child td { border-bottom: none; }
    .order-id { color: #6366f1; font-weight: 500; }
    .badge { padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 500; }
    .badge--delivered { background: rgba(16,185,129,0.15);  color: #10b981; }
    .badge--shipped   { background: rgba(99,102,241,0.15);  color: #6366f1; }
    .badge--pending   { background: rgba(245,158,11,0.15);  color: #f59e0b; }
    .badge--cancelled { background: rgba(239,68,68,0.15);   color: #ef4444; }
    .status-select { background: #22263a; border: 1px solid #2e3347; color: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; }
  `]
})
export class OrderListComponent implements OnInit {
  orders$  = this.store.select(selectOrders);
  loading$ = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.loadOrders());
  }

  onStatusChange(orderId: number, status: Order['status']): void {
    this.store.dispatch(AppActions.updateOrderStatus({ orderId, status }));
  }
}
