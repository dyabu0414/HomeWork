import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/todoListLayout.css'
import InputEditor from '../components/InputEditor';
import {TodoContext} from '../context/TodoContext';
import Todo from '../components/Todo';
import TodoList from '../components/TodoList';
import AllCheckButton from '../components/AllCheckButton';
import LoginSelect from '../components/LoginSelect';
import { UserContext } from '../context/UserContext';

function TodoListLayout(props) {

    const initialState = {};

    const todoReducer = (state, action) => {
        
        const {user} = action;

        switch(action.type) {
            case 'insert':
                return{...state, [user]: [...state[user] || [], action.payload]};
            
            case 'check' :
                return {...state, [user]: (state[user] || []).map(todo =>
                todo.id === action.payload.id ?
                    {...todo, checked: !todo.checked} : todo)
                };

            case 'todoDone':
                return {...state, [user]: (state[user] || []).map(todo =>
                todo.id === action.payload.id ?
                    {...todo, isDone: true} : todo)
                };

            case 'delTodo':
                return {...state, [user]: (state[user] || []).filter(todo => todo.id !== action.payload.id)};

            case 'allDone':
                return {...state, [user]: (state[user] || []).map(todo => todo.checked && !todo.isDone ? {...todo, isDone: true} : todo)};

            case 'allDelTodo':
                return {...state, [user]: (state[user] || []).filter(todo => !todo.checked)};

            case 'reset':
                return {};

            default:
                return state;
        }
    };

    const todoId = useRef(1);

    const {user} = useContext(UserContext);

    const [inputText, setInputText] = useState('');
    
    const [todoList, dispatch] = useReducer(todoReducer, initialState);

    const [todoCount, setTodoCount] = useState(0);

    const [doneCount, setDoneCount] = useState(0);

    const [doneRate, setDoneRate] = useState(0);

    const createTodo = () => {
  if (!inputText.trim()) return;

  const todo = {
    id: todoId.current++,
    text: inputText,
    checked: false,
    isDone: false,
  };

  dispatch({ type: 'insert', payload: todo, user });
  setInputText('');
};


    const updatedChecked = (id) => {
        dispatch({type: 'check', payload: {id}, user});
    }

    const doneTodoBtn = (id) => {
        dispatch({type: 'todoDone', payload: {id}, user});
    }

    const delTodoBtn = (id) => {
        const isConFirm = confirm('정말 삭제하시겠습니까?');
        if(isConFirm){
            dispatch({type: 'delTodo', payload: {id}, user});
        }
    };

    const allDoneTodo = useCallback(() => {
        const todos = todoList[user]?.filter(todo => !todo.isDone && todo.checked);
        if(todos.length === 0){
            alert('일괄 처리할 일감을 체크해주십시오.')
            return false;
        }
        dispatch({type: 'allDone', user});
    }, [todoList, user]);

    const allDelTodo = useCallback(() => {
        const todos = todoList[user]?.filter(todo => todo.checked);
        if(todos.length === 0){
            alert('일괄 삭제할 일감을 체크해주십시오.');
            return false;
        }

        const isConfirm = confirm('정말 삭제하시겠습니까?');

        if(isConfirm){
            dispatch({type: 'allDelTodo', user});
        }
    }, [todoList, user]);

    useEffect(() => {
        if(!user){
            dispatch({type: 'reset'});
            todoId.current = 1;
        }
    }, [user]);

    useEffect(() => {

        const list = todoList[user] || [];

        const totalSize = list.length;
        
        const doneCount = list.filter(todo => todo.isDone).length;

        const todoCount = totalSize - doneCount;

        const doneRate = totalSize === 0 ? 0: parseFloat(((doneCount / totalSize)* 100).toFixed(2));

        setDoneCount(doneCount);
        setTodoCount(todoCount);
        setDoneRate(doneRate);
    }, [todoList, user]);

    console.log('user in layout:', user);



    return (
        <div>
            <TodoContext.Provider value={{updatedChecked, doneTodoBtn, delTodoBtn}}>
                <main className='container'>
                    <section className='contents'>
                        <LoginSelect/>
                        <header className='text-center'>
                            <h2>TodoList</h2>
                        </header>
                        <section className='text-end'>
                            <p>할 일: {todoCount} 건</p>
                            <p>한 일: {doneCount} 건</p>
                            <p>달성률: {doneRate} 건</p>
                        </section>
                        <InputEditor
                            inputText= {inputText}
                            setInputText= {setInputText}
                            createTodo= {createTodo}
                            isDisabled={!user}
                        />
                        <AllCheckButton 
                            allDoneTodo= {allDoneTodo} 
                            allDelTodo= {allDelTodo}
                            isDisabled={!user}
                        />
                        <TodoList todoList= {todoList[user] || []}/>
                    </section>
                </main>
                <TodoList todoList = {todoList[user] || []}/>
            </TodoContext.Provider>
        </div>
    );
}

export default TodoListLayout;