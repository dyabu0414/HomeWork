import React, { useReducer, useRef, useState } from 'react';
import '../assets/css/UseReducer2.css'
import Box from '../components/Box';
function UseReducerExam02(props) {

    /*
    props
    -> 하위 컴포넌트가 상위컴포넌트로부터 전달받는 데이터를 저장하는 객체
    -> 함수형 컴포넌트는 매개변수 위치에 props 객체가 존재하게 된다.
    */

    const idx = useRef(0);


    const boxReducer = (state, action) => {
        //case 안에서는 새로운 변수 선언 불가
        let newBoxList = [];
        switch(action.type) {
            case 'create' :
                return [...state, {id: (++idx.current), bgColor: action.payload}];
            case 'delete' :
                newBoxList = state.filter(obj => obj.id !== idx.current);
                idx.current--;
                return newBoxList;
            case 'init' :
                idx.current = 0;
                return[];
            default :
                return state;
        }
    }

    const [boxList, dispatch] = useReducer(boxReducer, []);

    const updatedBox = (action) => {
        dispatch({type : action, payload : makeColor()})
        
    }


    

    /*const createBox = () => {
        const newBoxList = [...boxList, {id: (++idx.current), bgColor: makeColor()}];
        setBoxList(newBoxList);
    }


    

    const deleteBox = () => {
        const newBoxList = boxList.filter(obj => !obj.id === current);
        idx.current--;
        setBoxList(newBoxList);
    }
*/

function makeColor() {
        const colors = [];
        colors.push('#');

        for(let i = 0; i < 3; i++){
            //0~255 사이 값을 16진수로 변경
            let color = Math.floor(Math.random() * 256).toString(16);
            if(color.length === 1){
                color = '0' + color;
            }
            colors.push(color);
        }
        return colors.join('');
}
    

    return (
        <>
            <main className='container'>
                <section className='contents'>
                    <section className='canvas'>
                        {
                            boxList?.map(obj => (
                                <Box key={`key_${obj.id}`} bgColor = {obj.bgColor}/>
                            ))
                        }
                    </section>
                </section>
                <section className='btn-box'>
                    <button type='button' className='btn' onClick={(e) => updatedBox('create')}>Box 생성</button>
                    <button type='button' className='btn' onClick={(e) => updatedBox('delete')}>Box 삭제</button>
                    <button type='button' className='btn' onClick={(e) => updatedBox('init')}>초기화</button>
                </section>
            </main>   
        </>
    );
}

export default UseReducerExam02;