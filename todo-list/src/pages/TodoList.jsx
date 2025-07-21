import React, { useState } from 'react';
import '../assets/css/TodoList.css';
import TodoItem from './TodoItem';

function TodoList(props) {

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (!input.trim()) return;

        const newTodo ={
            id: Date.now(),
            text: input.trim(),
            done: false
        };
        setTodos([...todos, newTodo]);
        setInput('');
    };

    const handleToggle = (id) => {
        setTodos(
            todos.map(todo => todo.id === id ? {...todo, done: !todo.done}: todo)
        );
    };

    const handleRemove = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleCompleteAll = () => {
        setTodos(todos.map(todo => ({...todo, done: true})));
    };

    const todoCount = todos.filter(todo => !todo.done).length;
    const doneCount = todos.filter(todo => todo.done).length;
    const donePercent = todos.length === 0 ? 0 : Math.round((doneCount / todos.length) * 100);
    return (
        <>
            <main className='container'>
                <section className='contents'>
                    <header className='header mb-3'>
                        <p>TodoList</p>
                    </header>
                    <section className='work-status mb-3'>
                        <p>할 일 : <span>{todoCount}</span>건</p>
                        <p>한 일 : <span>{doneCount}</span>건</p>
                        <p>달성률 : <span>{donePercent}</span>%</p>
                    </section>
                    <section className='todo-input mb-4'>
                        <div className='row'>
                            <div className='col-8'>
                                <input type='text' className='form-control'
                                    placeholder='할 일을 입력하세요.'
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                />
                            </div>
                            <div className='col-4 text-end'>
                                <button type='button' className='btn btn-primary me-2'
                                    onClick={handleAdd}>등록</button>
                                <button type='button' className='btn btn-success'
                                    onClick={handleCompleteAll}>일괄 완료</button>
                            </div>
                        </div>
                    </section>
                    <section className='todo-list'>
                        {todos.map(todo => (
                            <TodoItem key={todo.id}
                                id={todo.id}
                                text={todo.text}
                                done={todo.done}
                                onToggle={handleToggle}
                                onRemove={handleRemove}
                            />
                        ))}
                    </section>
                </section>
            </main>
        </>
    );
}

export default TodoList;