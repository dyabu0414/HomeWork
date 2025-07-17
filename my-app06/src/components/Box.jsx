import React from 'react';
import {styled} from 'styled-components';

//랜더링 이슈로 인해 styled components는 함수(컴포넌트) 위에 작성한다.
const Square = styled.div`
        width: 100px;
        height: 100px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: ${(props) => props.$bgColor || 'black'};
    `;
function Box({bgColor}) {

    
    return (
        <>
         <Square $bgColor = {bgColor}/>
        </>
    );
}

export default Box;