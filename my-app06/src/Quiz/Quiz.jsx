import React, { useEffect, useReducer, useRef } from 'react';
import '../assets/css/Quiz.css'
import Box2 from '../components/Box2';

// 1~ max까지 숫자 중 랜덤한 숫자를 생성
function getRandomNumber (count, max){
    const numbers = Array.from({length: max}, (_, i) => i + 1);

    
    for(
        let i = numbers.length -1; i > 0; i--){
            const j = Math.floor(Math.random()*(i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
    return numbers.slice(0, count);
}

function Quiz(props) {

    const idx = useRef(0);

    const initialState = {
        boxes: [],
        pcCards: [],
        result: '',
        started: false
    };

    const boxReducer = (state, action) => {
        switch(action.type) {
            case 'start':{
                const pcCards = getRandomNumber(2,20);
                const userNumbers = getRandomNumber(5, 20);
                const boxes = userNumbers.map((num) => ({
                    id : idx.current++,
                    number: num,
                    checked: false
                }));
                return {
                    boxes,
                    pcCards,
                    result: '',
                    started: true
                };
            }   

            case 'toggle':{
                return {
                    ...state,
                    boxes: state.boxes.map(box => 
                    box.id === action.id ? {...box, checked: !box.checked} : box
                )
            };
        }

            case 'choice': {
                const selected = state.boxes.filter(box => box.checked);
                const userSum = selected[0].number + selected[1].number;
                const pcSum = state.pcCards[0] + state.pcCards[1];

                let result = '';
                if(userSum > pcSum) result = '🎉🎉사용자 승리!🎉🎉'
                else if(userSum < pcSum) result = '😢😢PC 승리...😢😢'
                else result = '🤨🤨무승부!🤨🤨';

                return {
                    ...state,
                    result
                };
            }

            case 'reset': {
                idx.current = 0;
                return initialState;
            }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(boxReducer, initialState);

    const handleStart = () => {
        if (!state.started) dispatch({type: 'start'});
    };

    const handleChoice = () => {
        const selected = state.boxes.filter(box => box.checked);
        if (selected.length < 2){
            alert('2장의 카드를 선택하세요!');
            return;
        }
        dispatch({type: 'choice'});
    };

    const handleToggle = (id, checked) => {
        const selectedCount = state.boxes.filter(box => box.checked).length;
        if(!checked && selectedCount >= 2){
            alert('2장까지만 선택할 수 있습니다!');
            return;
        };
        dispatch({type: 'toggle', id});
    };

    return (
        
         <main className='container'>
            <section className='contents'>
                <section className='canvas'>
                    {
                        state.boxes.map(obj => (
                            <label key = {`key_${obj.id}`} className='box-wrapper'>
                            <Box2  number = {obj.number}/>
                            <input 
                            type='checkbox'
                            checked={obj.checked}
                            onChange={() => handleToggle(obj.id, obj.checked)}
                            />
                            </label>
                        ))}
                </section>
                {state.result && (
                    <p className='result'>{state.result}</p>
                )}
            </section>
            <section className='btn-box'>
                <button type='button' className='btn' onClick={handleStart} disabled={state.started}>시작</button>
                <button type='button' className='btn' onClick={handleChoice}>선택</button>
                <button type='button' className='btn' onClick={() => dispatch({type: 'reset'})}>리셋</button>
            </section>
        </main>   
    );
}

export default Quiz;