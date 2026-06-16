import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home">
      <div class="hero">
        <h1 class="hero__title">Angular Micro Frontend<br><span class="hero__accent">Module Federation Demo</span></h1>
        <p class="hero__desc">
          A production-style MFE architecture — Shell App dynamically loads
          remote micro frontends at runtime with zero build-time coupling.
        </p>
        <div class="hero__actions">
          <a routerLink="/dashboard" class="btn btn--primary">View Dashboard</a>
          <a routerLink="/products" class="btn btn--ghost">Products MFE →</a>
        </div>
      </div>

      <div class="cards">
        <div class="card">
          <div class="card__icon">⚡</div>
          <h3>Module Federation</h3>
          <p>Shell loads remote bundles at runtime via Webpack 5 Module Federation. No rebuild needed when remotes change.</p>
        </div>
        <div class="card">
          <div class="card__icon">🗃️</div>
          <h3>NgRx State</h3>
          <p>Centralised NgRx Store with Effects and memoized Selectors powers cross-MFE state sharing.</p>
        </div>
        <div class="card">
          <div class="card__icon">🚀</div>
          <h3>OnPush + Lazy Load</h3>
          <p>Every component uses OnPush change detection. Remotes are lazy-loaded via Angular Router.</p>
        </div>
        <div class="card">
          <div class="card__icon">🔷</div>
          <h3>Standalone Components</h3>
          <p>Angular 17 standalone API — no NgModules in remotes. Cleaner, tree-shakeable architecture.</p>
        </div>
      </div>

      <div class="arch-box">
        <h2>Architecture Overview</h2>
        <pre class="arch-diagram">
Shell App (port 4200)
├── NgRx Store (shared state)
├── /products → loads ProductsModule from remote:4201
└── /orders   → loads OrdersModule  from remote:4202

Remote: products-app (port 4201)
└── Exposes: ProductsModule, ProductListComponent

Remote: orders-app (port 4202)
└── Exposes: OrdersModule, OrderListComponent
        </pre>
      </div>
    </div>
  `,
  styles: [`
    .home { max-width: 960px; margin: 0 auto; }
    .hero { text-align: center; padding: 4rem 0 3rem; }
    .hero__title { font-size: 2.5rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem; }
    .hero__accent { color: var(--color-accent); }
    .hero__desc { color: var(--color-text-secondary); font-size: 1.05rem; max-width: 560px; margin: 0 auto 2rem; }
    .hero__actions { display: flex; gap: 1rem; justify-content: center; }
    .btn { padding: 10px 24px; border-radius: var(--radius-sm); font-weight: 500; font-size: 0.9rem; cursor: pointer; transition: all 0.15s; }
    .btn--primary { background: var(--color-accent); color: #fff; }
    .btn--primary:hover { background: var(--color-accent-hover); color: #fff; }
    .btn--ghost { border: 1px solid var(--color-border); color: var(--color-text-secondary); }
    .btn--ghost:hover { border-color: var(--color-accent); color: var(--color-accent); }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem; }
    .card__icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
    .card h3 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.5rem; }
    .card p { color: var(--color-text-secondary); font-size: 0.82rem; line-height: 1.6; }
    .arch-box { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem; }
    .arch-box h2 { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; }
    .arch-diagram { font-family: 'Courier New', monospace; font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.7; white-space: pre; }
  `]
})
export class HomeComponent {}
