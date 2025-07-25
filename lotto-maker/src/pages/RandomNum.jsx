import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/lottoMain.css'

function RandomNum({numbers, compareNumbers = [], bonus, isSystem}) {

    //번호 별로 색상 지정
    const getColor = (num) => {
        if(num <= 10) return 'yellow';
        if(num <= 20) return 'blue';
        if(num <= 30) return 'red';
        if(num <= 40) return 'gray';
        return 'green';
    };

    return (
        <div className='d-flex flex-wrap justify-content-center my-2'>
            {
                numbers.map((num, idx) => (
                    <div key={idx} 
                        className={`ball ${getColor(num)} ${compareNumbers.includes(num) ? 'match' : ''} 
                        ${bonus === num ? 'bonus' : ''}`}
                    >
                        {num}
                    </div>
                ))
            }
            {
                /* 시스템 번호일 경우, 보너스 번호는 '+ 보너스'를 표기해서 출력*/
                isSystem && bonus && (
                    <>
                    <span className='mx-2 align-self-center'>+ 보너스</span>
                    <div className={`ball ${getColor(bonus)} ${compareNumbers.includes(bonus) ? 'match' : ''}`}>
                        {bonus}
                    </div>
                    </>
                )
            }
        </div>
    );
}

export default RandomNum;