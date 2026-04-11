# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

This is a single-page React app (Vite + React 19). State is managed entirely with `useState`.

**Component structure:**

- `App.jsx` — root component; owns the `transactions` array state and passes it down to children
- `Summary.jsx` — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally
- `TransactionForm.jsx` — owns its own form state (description, amount, type, category); calls `onAdd(transaction)` prop when submitted
- `TransactionList.jsx` — receives `transactions`, owns filter state (filterType, filterCategory) internally

The `categories` constant is duplicated in `TransactionForm.jsx` and `TransactionList.jsx` — worth extracting to a shared file if it grows.

**Known intentional issue (part of the course):**
- Transaction #4 ("Freelance Work") is marked `type: "expense"` but categorized as `"salary"` — data inconsistency
