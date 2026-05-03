import React from 'react'

const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card">
        <div className="summary-label">
          <span className="summary-dot income-dot" />
          Income
        </div>
        <p className="summary-amount income-amount">+${fmt(totalIncome)}</p>
      </div>

      <div className="summary-card">
        <div className="summary-label">
          <span className="summary-dot expense-dot" />
          Expenses
        </div>
        <p className="summary-amount expense-amount">-${fmt(totalExpenses)}</p>
      </div>

      <div className="summary-card">
        <div className="summary-label">
          <span className="summary-dot balance-dot" />
          Balance
        </div>
        <p className={`summary-amount ${balance >= 0 ? 'income-amount' : 'expense-amount'}`}>
          {balance >= 0 ? '+' : '-'}${fmt(Math.abs(balance))}
        </p>
      </div>
    </div>
  );
}

export default Summary
