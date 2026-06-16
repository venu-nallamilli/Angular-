import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectProducts, selectLoading } from '../../../../../shell-app/src/app/store/app.selectors';

// NOTE: In a real setup, shared models/selectors come from a shared npm package
// or a shared library in an Nx monorepo. Here we reference the shell directly
// for demo purposes — replace with your shared library path.

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-list">
      <div class="product-list__header">
        <h1>Products</h1>
        <span class="remote-badge">Remote MFE — port 4201</span>
      </div>

      <ng-container *ngIf="loading$ | async; else loaded">
        <div class="loading">Loading products...</div>
      </ng-container>

      <ng-template #loaded>
        <div class="products-grid">
          <div class="product-card" *ngFor="let p of products$ | async">
            <div class="product-card__header">
              <span class="product-card__category">{{ p.category }}</span>
              <span class="product-card__status" [class.active]="p.status === 'active'">
                {{ p.status }}
              </span>
            </div>
            <h3 class="product-card__name">{{ p.name }}</h3>
            <div class="product-card__footer">
              <span class="product-card__price">\${{ p.price }}</span>
              <span class="product-card__stock">{{ p.stock }} in stock</span>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .product-list__header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
    .product-list__header h1 { font-size: 1.5rem; font-weight: 700; }
    .remote-badge { font-size: 0.7rem; padding: 3px 10px; background: rgba(16,185,129,0.12); color: #10b981; border: 1px solid rgba(16,185,129,0.3); border-radius: 20px; }
    .loading { color: #94a3b8; padding: 2rem; text-align: center; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
    .product-card { background: #1a1d27; border: 1px solid #2e3347; border-radius: 10px; padding: 1.25rem; }
    .product-card__header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
    .product-card__category { font-size: 0.72rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    .product-card__status { font-size: 0.72rem; padding: 2px 8px; border-radius: 20px; background: rgba(239,68,68,0.12); color: #ef4444; }
    .product-card__status.active { background: rgba(16,185,129,0.12); color: #10b981; }
    .product-card__name { font-size: 0.95rem; font-weight: 600; color: #f1f5f9; margin-bottom: 1rem; }
    .product-card__footer { display: flex; justify-content: space-between; align-items: center; }
    .product-card__price { font-size: 1.1rem; font-weight: 700; color: #6366f1; }
    .product-card__stock { font-size: 0.78rem; color: #94a3b8; }
  `]
})
export class ProductListComponent implements OnInit {
  products$ = this.store.select(selectProducts);
  loading$  = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {
    // State already loaded by shell — no re-fetch needed (NgRx cache)
    // If needed: this.store.dispatch(AppActions.loadProducts());
  }
}
