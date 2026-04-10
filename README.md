# HardStaff Connect — Vue 3

Decision-support tool for Australian teachers considering rural/remote placements in QLD and NSW.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  views/
    HomeView.vue          # Landing page
    ExplorerView.vue      # School search + guided quiz (Person A)
    InsightsView.vue      # Lifestyle data viewer (Person B)
    AboutView.vue         # Data sources + disclaimer
  components/
    AppNav.vue            # Top navigation bar (Person C)
    MobileNavDrawer.vue   # Mobile hamburger drawer (Person C)
    AppFooter.vue         # Footer (Person C)
    CompareTray.vue       # Fixed compare tray (Person C)
    SchoolRow.vue         # Single result row with expand (Person A)
    IncDetail.vue         # Incentive breakdown panel (Person A)
    FilterPanel.vue       # State/remoteness/employment filters (Person A)
    SortBar.vue           # Sort pills (Person A)
    Pagination.vue        # Page controls (Person A)
    QuizPanel.vue         # 3-question guided quiz (Person A)
    LifestyleCard.vue     # 3-card lifestyle grid (Person B)
    SideBySide.vue        # Multi-school comparison table (Person B)
  stores/
    useFilters.js         # Pinia store — shared state (Person C) ← DO NOT EDIT unless agreed
    useApp.js             # UI state — mobile nav open/close (Person C)
  data/
    schools.js            # 75 schools with metrics + incentives
  assets/
    main.css              # Global styles
  router/
    index.js              # Vue Router — hash history
  main.js
  App.vue

```

## Team Rules

- **Person A** owns `ExplorerView.vue` + all Explorer components. Branch: `feature/explorer`
- **Person B** owns `InsightsView.vue` + Lifestyle components. Branch: `feature/insights`
- **Person C** owns everything else (shared infra). Branch: `feature/shared`
- A and B **import** from `useFilters.js` but **never edit** it. State changes = group decision → Person C implements.
- All PRs go to `main`. No direct pushes to main.

## Shared Store Contract

`useFilters.js` exports:

| State | Type | Description |
|---|---|---|
| `fState` | `'both'|'qld'|'nsw'` | State filter |
| `fEmp` | `'perm'|'temp'` | Employment type |
| `fRem` | `Set<string>` | Remoteness tier IDs |
| `fSort` | `'inc'|'hc'|'dist'|'az'` | Sort field |
| `cmpList` | `string[]` | Compare list (max 4 IDs) |
| `currentPage` | `number` | Explorer pagination |
| `insSchool` | `object|null` | Insights selected school |
| `sbsMode` | `boolean` | Side-by-side mode |

| Action | Description |
|---|---|
| `setFilter(key, val)` | Update fState, fEmp, fSort |
| `toggleRem(id)` | Toggle remoteness tier |
| `toggleCmp(id)` | Add/remove from compare |
| `clearCompare()` | Clear compare list |
| `setPage(n)` | Set explorer page |
| `setInsSchool(school)` | Set insights school |
| `toggleSbs()` | Toggle side-by-side |
| `resetFilters()` | Reset all to defaults |

## Data Sources

- ACARA My School 2025 — 5,050 schools QLD + NSW
- ABS Census 2021 SA2 — lifestyle metrics
- QLD Government Directive 16/18 — Locality Allowance
- NSW RTI Review 2020 — Rural Teacher Incentive

**Note:** The `schools.js` data file is a 75-school sample. The full 5,050-school pipeline outputs `location_metrics.csv` and related files which need to be re-joined to expand the dataset.
