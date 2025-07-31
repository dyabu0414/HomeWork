import React from 'react';
import TransactionItem from './TransactionItem';
import '../assets/css/accountBook.css';


function TransactionList({ transactions, dispatch }) {
  if (transactions.length === 0) return <p>항목이 없습니다.</p>;

  return (
    <div className="transaction-list">
      {transactions.map((t) => (
        <TransactionItem key={t.id} item={t} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default TransactionList;
