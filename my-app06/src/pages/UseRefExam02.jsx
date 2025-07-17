import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/ref.css'
function UseRefExam02(props) {

    const idRef = useRef();
    const pwRef = useRef();

    const[userId, setUserId] = useState('');
    const[passwd, setPasswd] = useState('');

    //시작할 때 한번만 실행 - [] 빈 배열이므로 최초 1회만 실행(의존성 없음)
    useEffect(()=> {
        idRef.current.focus();
        console.log('갱신');
    }, []);

    const goLogin = () => {
        if(userId.trim().length === 0){
            alert('아이디를 입력하십시오.');
            idRef.current.focus();
            return false;
        }

        if(passwd.trim().length === 0){
            alert('패스워드를 입력하십시오.');
            pwRef.current.focus();
            return false;
        }

         alert('로그인 성공!');

        
    }

    return (
        <div>
            <main className='login-frm'>
                <section className='login-contents'>
                    <header>
                        <h2>로그인</h2>
                    </header>
                    <section className='input-frm'>
                        <div className='frm-box'>
                            <label htmlFor='userId'>아이디 :</label>
                            <input type='text' 
                                    id='userId'
                                    ref={idRef} 
                                    onChange={(e)=> setUserId(e.target.value)}
                                    className='in-txt'></input>
                        </div>
                        <div className='frm-box'>
                            <label htmlFor='passwd'>패스워드 :</label>
                            <input type='text' 
                                    id='passwd' 
                                    ref={pwRef}
                                    onChange={(e)=> setPasswd(e.target.value)}
                                    className='in-txt'></input>
                        </div>
                    </section>
                    <section className='btn-box'>
                        <button type='button' className='btn-login' onClick={goLogin}>로그인</button>
                        <button type='button' className='btn-join'>회원가입</button>
                    </section>
                </section>
            </main>
        </div>
    );
}

export default UseRefExam02;