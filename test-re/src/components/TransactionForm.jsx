import React, { useState } from 'react';
import '../assets/css/accountBook.css';



function TransactionForm({ dispatch }) {
  const [type, setType] = useState('');
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = parseInt(amount);
    if (!text.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('내용을 입력하고 1원 이상 금액을 숫자로 입력해주세요.');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      text,
      amount: parsedAmount,
    };

    dispatch({ type: 'ADD', payload: newTransaction });
    setText('');
    setAmount('');
    setType('');
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="==선택==">==선택==</option>
        <option value="지출">지출</option>
        <option value="수입">수입</option>
      </select>
      <input
        type="text"
        placeholder="내용"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        placeholder="금액"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default TransactionForm;
