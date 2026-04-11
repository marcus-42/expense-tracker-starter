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

This is a single-page React app (Vite + React 19). All application logic lives in `src/App.jsx` — there are no separate components, hooks, or services files. State is managed entirely with `useState`.

**Known intentional issues (part of the course):**
- Bug: `amount` is stored as a string, so `reduce` concatenates instead of summing (e.g. `totalIncome` and `totalExpenses` are wrong)
- Transaction #4 ("Freelance Work") is marked `type: "expense"` but categorized as `"salary"` — data inconsistency
- UI styling is minimal/rough
- All code is in one file with no component decomposition
