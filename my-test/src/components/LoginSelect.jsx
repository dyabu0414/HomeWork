import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
function LoginSelect(props) {

    const {user, login, logout} = useContext(UserContext);

    const [selected, setSelected] = useState('');

    const handleLogin = () => {
        if (!selected) {
            alert('사용자를 선택하세요.');
        return;
    } 
        login(selected);
        setSelected('');
};

console.log('user in login:', user);


    return (
        <div className='d-flex justify-content-end mb-3'>
            {
                user ? (
                    <>
                        <span className='me-2'> {user} 님 </span>
                        <button type='button' className='brn btn-secondary btn-sm' onClick={logout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <select className='form-select form-select-sm w-auto' value={selected} onChange={(e) => setSelected(e.target.value)}>
                            <option value={''} disabled>사용자 선택</option>
                            <option value={'신동열'}>신동열</option>
                            <option value={'김철수'}>김철수</option>
                            <option value={'이민호'}>이민호</option>
                        </select>
                        <button type='button' className='btn btn-primary btn-sm' onClick={handleLogin}>
                            로그인
                        </button>
                    </>
                )}
        </div>
    );
}

export default LoginSelect;