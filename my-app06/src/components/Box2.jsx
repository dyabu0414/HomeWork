import React from 'react';
import {styled} from 'styled-components';

//랜더링 이슈로 인해 styled components는 함수(컴포넌트) 위에 작성한다.
const Square = styled.div`
        width: 100px;
        height: 100px;
        border: 1px solid black;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
    `;
function Box2({number}) {

    
    return (
        <Square>
         {number}
        </Square>
    );
}

export default Box2;