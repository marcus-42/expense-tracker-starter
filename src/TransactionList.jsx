import React, { useState } from 'react'
import { CATEGORIES } from './constants'

const CATEGORY_STYLE = {
  food:          { color: 'var(--cat-food)',          bg: 'var(--cat-food-dim)' },
  housing:       { color: 'var(--cat-housing)',       bg: 'var(--cat-housing-dim)' },
  utilities:     { color: 'var(--cat-utilities)',     bg: 'var(--cat-utilities-dim)' },
  transport:     { color: 'var(--cat-transport)',     bg: 'var(--cat-transport-dim)' },
  entertainment: { color: 'var(--cat-entertainment)', bg: 'var(--cat-entertainment-dim)' },
  salary:        { color: 'var(--cat-salary)',        bg: 'var(--cat-salary-dim)' },
  other:         { color: 'var(--cat-other)',         bg: 'var(--cat-other-dim)' },
};

function CategoryBadge({ category }) {
  const style = CATEGORY_STYLE[category] || CATEGORY_STYLE.other;
  return (
    <span
      className="category-badge"
      style={{ color: style.color, background: style.bg }}
    >
      {category}
    </span>
  );
}

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleDelete = (t) => {
    if (window.confirm(`Delete "${t.description}"?`)) {
      onDelete(t.id);
    }
  };

  let filtered = transactions;
  if (filterType !== "all")     filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== "all") filtered = filtered.filter(t => t.category === filterCategory);

  return (
    <div className="transactions">
      <h2>Transactions</h2>

      <div className="filters">
        <label htmlFor="filter-type" className="sr-only">Filter by type</label>
        <select id="filter-type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label htmlFor="filter-category" className="sr-only">Filter by category</label>
        <select id="filter-category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="chart-empty">No transactions match the selected filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="td-date">{t.date}</td>
                <td className="td-description">{t.description}</td>
                <td><CategoryBadge category={t.category} /></td>
                <td className={`td-amount ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t)}
                    aria-label={`Delete transaction: ${t.description}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList
