import React from 'react';

function TodoItem({id, text, done, onToggle, onRemove}) {
    return (
        <div className={`todo mb-2 ${done ? 'complete' : ''}`}>
            <div className='item1'>
                <input type='checkbox'
                    checked={done}
                    onChange={() => onToggle(id)}
                />
            </div>
            <div className='item2'>
                <p>{text}</p>
            </div>
            <div className='item3 text-end'>
                {!done && (
                    <button type='button' className='btn btn-success me-2'
                    onClick={() => onToggle(id)}>완료</button>
                )}
                    <button type='button' className='btn btn-danger'
                    onClick={() => onRemove(id)}>삭제</button>
            </div>
        </div>
    );
}

export default TodoItem;