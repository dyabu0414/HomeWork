import React, { useReducer } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Summary from '../components/Summary';
import '../assets/css/accountBook.css';

const initialState = {
  transactions: [],
  income: 0,
  expense: 0,
};

function transactionReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const newList = [...state.transactions, action.payload];
      const { type, amount } = action.payload;
      const updatedIncome = type === '수입' ? state.income + amount : state.income;
      const updatedExpense = type === '지출' ? state.expense + amount : state.expense;
      return {
        transactions: newList,
        income: updatedIncome,
        expense: updatedExpense,
      };
    }
    case 'DELETE': {
      const filtered = state.transactions.filter(t => t.id !== action.payload.id);
      const { type, amount } = action.payload;
      const updatedIncome = type === '수입' ? state.income - amount : state.income;
      const updatedExpense = type === '지출' ? state.expense - amount : state.expense;
      return {
        transactions: filtered,
        income: updatedIncome,
        expense: updatedExpense,
      };
    }
    case 'CLEAR':
      return {transactions: [], income: 0,expense: 0,};
    default:
      return state;
  }
}

function AccountBookPage() {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  return (
    <div>
      <main className='container'>
      <h1>가계부</h1>
      <TransactionForm dispatch={dispatch} />
      <Summary income={state.income} expense={state.expense} />
      <TransactionList transactions={state.transactions} dispatch={dispatch} />
      <button
        onClick={() => {
          if (window.confirm('정말 전체 삭제하시겠습니까?')) {
            dispatch({ type: 'CLEAR' });
          }
        }}
        style={{
          backgroundColor: '#ffb3b3',
          color: 'white',
          padding: '8px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >전체 삭제
      </button>
      </main>
    </div>
  );
}

export default AccountBookPage;
