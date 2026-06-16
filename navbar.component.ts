import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="navbar">
      <div class="navbar__brand">
        <span class="navbar__logo">&#9645;</span>
        <span class="navbar__title">MFE Dashboard</span>
        <span class="navbar__badge">Module Federation</span>
      </div>
      <ul class="navbar__links">
        <li><a routerLink="/"         routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a></li>
        <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
        <li><a routerLink="/products"  routerLinkActive="active">Products <span class="mfe-tag">MFE</span></a></li>
        <li><a routerLink="/orders"    routerLinkActive="active">Orders <span class="mfe-tag">MFE</span></a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 60px;
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar__brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .navbar__logo { font-size: 1.4rem; color: var(--color-accent); }
    .navbar__title { font-weight: 600; font-size: 1rem; color: var(--color-text-primary); }
    .navbar__badge {
      font-size: 0.65rem;
      background: rgba(99,102,241,0.15);
      color: var(--color-accent);
      padding: 2px 8px;
      border-radius: 20px;
      border: 1px solid rgba(99,102,241,0.3);
    }
    .navbar__links {
      display: flex;
      list-style: none;
      gap: 0.25rem;
    }
    .navbar__links a {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: var(--radius-sm);
      color: var(--color-text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.15s;
    }
    .navbar__links a:hover { color: var(--color-text-primary); background: var(--color-surface-2); }
    .navbar__links a.active { color: var(--color-accent); background: rgba(99,102,241,0.1); }
    .mfe-tag {
      font-size: 0.6rem;
      background: rgba(16,185,129,0.15);
      color: var(--color-success);
      padding: 1px 5px;
      border-radius: 4px;
      border: 1px solid rgba(16,185,129,0.3);
    }
  `]
})
export class NavbarComponent {}
