---
name: Project architecture
description: Architectural decisions, component responsibilities, and known intentional issues
type: project
---

React 19 + Vite SPA. State managed exclusively with useState — no Context API, no Redux.

Component responsibilities:
- App.jsx — owns `transactions` array state; passes it to all children; handles handleAdd and handleDelete
- Summary.jsx — receives transactions, computes totalIncome/totalExpenses/balance inline in render (intentional — derived state, not useState)
- TransactionForm.jsx — owns its own local form state (description, amount, type, category); calls onAdd(transaction) prop on submit
- TransactionList.jsx — receives transactions + onDelete; owns filterType/filterCategory state locally
- SpendingChart.jsx — receives transactions; computes expensesByCategory via reduce inline in render; uses recharts BarChart

Known intentional issues (course content, do not flag as bugs):
- Transaction #4 "Freelance Work": type="expense" but category="salary" — intentional data inconsistency for course lesson

Known improvement opportunities already identified:
- `categories` array is duplicated in TransactionForm.jsx (line 3) and TransactionList.jsx (line 3) — should be extracted to src/constants.js
- CATEGORY_STYLE map in TransactionList.jsx hardcodes inline hex colors that duplicate CSS variables defined in index.css

ESLint config lints .vite/deps/ by default — running `npm run lint` floods output with dependency errors. Should add .vite/ to .eslintignore or eslint ignorePatterns. Source files themselves are mostly clean.
