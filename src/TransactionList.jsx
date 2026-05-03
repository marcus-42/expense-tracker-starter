import React, { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const CATEGORY_STYLE = {
  food:          { color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  housing:       { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  utilities:     { color: '#facc15', bg: 'rgba(250,204,21,0.12)' },
  transport:     { color: '#22d3ee', bg: 'rgba(34,211,238,0.12)' },
  entertainment: { color: '#f472b6', bg: 'rgba(244,114,182,0.12)' },
  salary:        { color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  other:         { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
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
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
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
                <button className="delete-btn" onClick={() => handleDelete(t)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList
