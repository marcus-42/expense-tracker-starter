---
name: Recurring patterns and anti-patterns
description: Code quality trends, anti-patterns, and positives seen across this codebase
type: project
---

## Anti-patterns observed

1. **Duplicated constants** — `categories` array defined identically in TransactionForm.jsx:3 and TransactionList.jsx:3. Classic DRY violation. Extraction to src/constants.js is the fix.

2. **Inline hardcoded colors in JS** — CATEGORY_STYLE in TransactionList.jsx duplicates the color palette already defined as CSS custom properties in index.css (:root). Single source of truth is broken.

3. **ID generation via Date.now()** — TransactionForm.jsx:16 uses Date.now() for IDs. Collision-safe in practice for this app but semantically fragile; crypto.randomUUID() is the modern idiomatic approach.

4. **Loose amount validation** — TransactionForm.jsx:13 checks `!amount` which passes for "0" string. Should validate amount > 0 to prevent zero/negative transactions.

5. **No empty-state handling in TransactionList** — when all transactions are deleted or filters match nothing, the table renders with an empty tbody (no "no results" message). SpendingChart handles this correctly — TransactionList does not.

6. **window.confirm() for delete** — TransactionList.jsx:32 uses the native browser confirm dialog, which is visually inconsistent with the dark theme UI and blocks the main thread. Acceptable for a course project but a known pattern to replace in production.

7. **parseFloat() defensive guard in Summary** — Summary.jsx:8,12 calls parseFloat() on amounts that are already stored as numbers. The form correctly stores parseFloat(amount) at submission time, so this is redundant but harmless.

8. **Missing React import in SpendingChart.jsx** — SpendingChart does not import React (line 1). Valid in React 17+ with the new JSX transform (Vite enables this), so not a bug, just an inconsistency vs. other files that do import React.

9. **No accessible labels on form inputs** — TransactionForm.jsx inputs use placeholder text instead of <label> elements. Placeholders disappear on focus and are not accessible to screen readers.

10. **Table missing accessible column header scope** — TransactionList.jsx <th> elements do not have scope="col", reducing screen reader usability.

11. **ESLint misconfiguration** — npm run lint lints .vite/deps/ producing thousands of false-positive errors from bundled dependencies. .vite/ should be added to eslintignore.

## Positive patterns

- Derived state is correctly computed in the render body, not stored in useState (Summary.jsx, SpendingChart.jsx)
- handleDelete uses functional filtering correctly (App.jsx:25)
- CategoryBadge is cleanly extracted as a sub-component within TransactionList.jsx
- Empty state is handled in SpendingChart.jsx (line 22-29)
- CSS custom properties (variables) are used well in index.css for the design system
- Amount formatting is consistent: toLocaleString with minimumFractionDigits: 2
