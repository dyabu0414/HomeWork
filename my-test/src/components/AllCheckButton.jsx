import React from 'react';

function AllCheckButton({allDoneTodo, allDelTodo, isDisabled}) {
    return (
        <>
            <div className='text-end mt-5'>
                <button type='button' 
                    className='btn btn-success me-2' 
                    onClick={allDoneTodo} 
                    disabled={isDisabled}
                >일괄 완료</button>
                <button type='button' 
                    className='btn btn-danger' 
                    onClick={allDelTodo} 
                    disabled={isDisabled}
                >일괄 삭제</button>
            </div>
        </>
    );
}

export default AllCheckButton;