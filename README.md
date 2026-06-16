# Micro Frontend Demo — Angular Module Federation

A production-style Micro Frontend architecture built with **Angular 17** and **Webpack Module Federation**.

## Architecture

```
micro-frontend-demo/
├── shell-app/              # Host application (port 4200)
├── remote-app-products/    # Products MFE (port 4201)
└── remote-app-orders/      # Orders MFE (port 4202)
```

## Tech Stack

| Technology | Usage |
|---|---|
| Angular 17 | All applications |
| @angular-architects/module-federation | Module Federation plugin |
| NgRx (Store + Effects + Selectors) | State management in shell |
| RxJS | Async data streams |
| TypeScript 5 | Strict mode enabled |
| SCSS | Styling with BEM convention |
| Webpack Module Federation | MFE wiring |

## Key Concepts Demonstrated

- **Shell App** loads remote micro frontends at runtime (no build-time coupling)
- **Shared NgRx Store** for cross-MFE state communication
- **Lazy Loading** of remote modules via Angular Router
- **OnPush Change Detection** throughout for performance
- **Standalone Components** (Angular 17 style)
- **Shared Library** — common models/interfaces shared across MFEs

## Getting Started

### Prerequisites
```bash
node >= 18
npm >= 9
```

### Install & Run All Apps

```bash
# Terminal 1 — Products Remote (port 4201)
cd remote-app-products
npm install
npm start

# Terminal 2 — Orders Remote (port 4202)
cd remote-app-orders
npm install
npm start

# Terminal 3 — Shell App (port 4200)
cd shell-app
npm install
npm start
```

Open: http://localhost:4200

## Architecture Decisions

### Why Module Federation?
Traditional monolithic Angular apps become hard to scale across teams. Module Federation allows:
- Independent deployment of each MFE
- Separate CI/CD pipelines per team
- Runtime composition — shell fetches remotes at runtime

### NgRx for Cross-MFE Communication
Shared state is managed in the shell app's NgRx store. Remote apps dispatch actions and read selectors via a shared interface — avoiding prop drilling and event bus hacks.

### OnPush Strategy
All components use `ChangeDetectionStrategy.OnPush` to minimise re-renders. Combined with NgRx selectors (which emit only on state change), this gives near-optimal render performance.

## Project Structure (Shell App)

```
shell-app/src/app/
├── components/
│   ├── navbar/           # Navigation with active route highlighting
│   ├── dashboard/        # Summary cards pulling from NgRx
│   └── home/             # Landing page
├── store/
│   ├── app.state.ts      # Root state interface
│   ├── app.actions.ts    # Global actions
│   ├── app.reducer.ts    # Root reducer
│   ├── app.effects.ts    # Side effects (HTTP simulation)
│   └── app.selectors.ts  # Memoized selectors
├── app.routes.ts         # Lazy-loaded remote routes
└── app.config.ts         # Standalone app config
```

## Screenshots

> Add screenshots here after running the app locally.

## Author

**Venu Nallamilli** — Senior Angular Developer  
[LinkedIn](https://linkedin.com/in/your-profile) | [GitHub](https://github.com/venu-nallamilli)

---
*Built to demonstrate enterprise-grade Micro Frontend skills for Angular developer roles.*
