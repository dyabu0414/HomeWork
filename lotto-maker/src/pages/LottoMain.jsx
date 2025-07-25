import React, { useState } from 'react';
import '../assets/css/lottoMain.css'
import RandomNum from './RandomNum';

function LottoMain(props) {

    //시스템 로또 번호
    const [systemNum, setSystemNum] = useState({nums: [], bonus: null});
    //유저 로또 번호
    const [userNum, setUserNum] = useState([]);
    //번호에 대한 등수
    const [rank, setRank] = useState([]);

    //1~45중 랜덤한 중복없는 숫자 추출 함수
    const LottoNum = () => {
        const number = new Set();
        while (number.size < 6){
            number.add(Math.floor(Math.random()*45)+1); //1~45중 랜덤
        }
        return Array.from(number).sort((a, b) => a - b);    //오름차순 정렬
    };

    //시스템 로또 번호와 보너스 번호 생성 함수
    const systemLottoNumber = () => {
        const nums = LottoNum();    //시스템 일반번호
        let bonus;
        do {
            bonus = Math.floor(Math.random()*45)+1; //보너스 번호
        }while (nums.includes(bonus));  //일반번호와 보너스 번호가 중복되지 않게 보장

        setSystemNum({nums, bonus});    //시스템 번호 저장
        setRank([]);    //이전 비교 결과값 초기화
    }

    //유저 로또 번호 생성 함수
    const userLottoNumber = () => {
        const newUsers = Array.from({length: 5}, () => LottoNum()); //5줄 생성
        console.log(newUsers);  //디버깅
        setUserNum(newUsers);   //유저 번호 저장
        setRank([]);    //이전 비교 결과값 초기화
    };

    //등수 판단 함수
    const lottoCompare = () => {

        const winNum = [...systemNum.nums, systemNum.bonus] //시스템 번호와 보너스 번호를 비교 대상으로 구성
        const result = userNum.map((userNum) => {
            const matchCount = userNum.filter((n) => winNum.includes(n)).length;    //유저 번호 중 시스템 번호 또는 보너스 번호의 일치 수 계산
            
            //일치 수에 따라 등수 부여
            let rank = '꽝';
            if(matchCount >= 6) rank = '1등';
            else if(matchCount === 5) rank = '2등';
            else if(matchCount === 4) rank = '3등';
            else if(matchCount === 3) rank = '4등';
            else if(matchCount === 2) rank = '5등';

            return rank;    //해당 줄에 대한 결과 반환
        });

        setRank(result);    //모든 줄에 대한 결과 저장
    }
    return (
        <div className='container my-5'>
            <h2 className='text-center mb-4'>Lotto</h2>
            <div className='d-flex justify-content-center mb-4 gap-3'>
                <button type='button' className='btn btn-primary' onClick={systemLottoNumber}>로또 생성</button>
                <button type='button' className='btn btn-success' onClick={userLottoNumber}>유저 로또</button>
                <button type='button' className='btn btn-warning' onClick={lottoCompare}>비교</button>
            </div>
            {
                systemNum.nums.length > 0 && (
                    <div className='card mb-4'>
                        <div className='card-header'>시스템 로또 번호</div>
                        <div className='card-body'>
                            {/*시스템 번호와 보너스 번호 출력용 컴포넌트 */}
                            <RandomNum numbers={systemNum.nums} bonus={systemNum.bonus} isSystem={true}/>
                        </div>
                    </div>
                )
            }
            {
                userNum.length > 0 && (
                    <div className='card'>
                        <div className='card-header'>유저 로또 번호</div>
                        <div className='card-body'>
                            {
                                userNum.map((nums, idx) => (
                                    <div key={idx} className='mb-2'>
                                        {/*유저 번호 출력용 컴포넌트, 시스템 번호와 비교할 정보 전달 */}
                                        <RandomNum numbers={nums} compareNumbers={systemNum.nums} bonus={systemNum.bonus}/>
                                        {
                                            rank[idx] && <p className='text-center fw-bold'>{rank[idx]}</p>
                                            /*등수 결과가 존재하면 함께 출력 */
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default LottoMain;