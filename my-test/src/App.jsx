import React from 'react';
import ReactDom from 'react-dom/client'
import { UserProvider } from './context/UserProvider';
import TodoListLayout from './pages/TodoListLayout';

function App() {

  return (
    <UserProvider>
      <TodoListLayout/>
    </UserProvider>
  );
}

export default App
