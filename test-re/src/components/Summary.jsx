import React from 'react';
import '../assets/css/accountBook.css';


function Summary({ income, expense }) {
  const total = Math.max(0, income - expense);

  return (
    <div className="summary-box">
      <p>수입: {income.toLocaleString()}원</p>
      <p>지출: {expense.toLocaleString()}원</p>
      <p>총계: {total.toLocaleString()}원</p>
    </div>
  );
}

export default Summary;
