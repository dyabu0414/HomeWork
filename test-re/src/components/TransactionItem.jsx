import React from 'react';
import '../assets/css/accountBook.css';


function TransactionItem({ item, dispatch }) {
  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch({ type: 'DELETE', payload: item });
    }
  };

  return (
    <div className="transaction-item">
      <span>[{item.type}]</span>
      <span>{item.text}</span>
      <span>{item.amount.toLocaleString()}원</span>
      <button onClick={handleDelete} style={{ color: 'red' }}>삭제</button>
    </div>
  );
}

export default TransactionItem;
