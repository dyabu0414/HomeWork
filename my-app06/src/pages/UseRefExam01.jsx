import React, { useEffect, useRef, useState } from 'react';

function UseRefExam01(props) {
    //일반 변수: 컴포넌트가 다시 렌더링되면 초기화 된다(상태 유지 불가)
    let count1 = 0;
    //useRef변수: 렌더링이 되어도 값이 유지된다(상태는 유지되지만 렌더링은 유발하지 않음)
    const count2 = useRef(0);

    //useState : 값이 바뀌면 화면이 자동으로 다시 렌더링 됨
    const [text, setText] = useState('');

    //useEffect : 컴포넌트가 다시 렌더링될 때마다 실행됨
    useEffect(() => {
        console.log('화면이 갱신');
    });

    /*
    state 가 변경되면 컴포넌트는 다시 렌더링되고, 
    이 과정에서 일반 자바스크립트 변수는 초기화 됩니다.
    반면, Ref로 선언된 변수는 렌더링 되더라도 값이 유지되기 때문에
    이전 값을 계속 보존할 수 있습니다.
    */
    const print = () => {
        count1++;   //일반 변수 증가 -> 다음 렌더링 시 초기화
        count2.current++;   //ref 변수 증가 -> 값이 유지됨

        console.log(`일반 변수 count : ${count1}, Ref 변수 count : ${count2.current}`);
    }

    return (
        <div>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)}/>
            <button type='button' onClick={print}>출력</button>
        </div>
    );
}

export default UseRefExam01;