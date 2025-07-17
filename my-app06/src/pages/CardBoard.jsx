import React, {useReducer} from 'react';
import '../assets/css/UseReducer2.css'
import'../components/Box2'

function CardBoard(props) {

    const actionReducer = (state, action) => {
        switch(action.type){
            case 'create':
                return Array.from({length : 5}, () => Math.floor(Math.random()*20) + 1);
            case ' delete':
                return[];
        }
    }

    const [cardList, dispatch] = useReducer(actionReducer, []);

    const updateCard = (action) => {
        dispatch({type: action});
    }

    return (
        <div>
            <main className='container'>
                <section className='contents'>
                    {
                        cardList?.map(cardNum => (
                            <Card>
                                <p style={{color : 'white'}}>
                                    {cardNum}
                                </p>
                            </Card>
                        ))
                    }
                </section>
            </main>
        </div>
    );
}

export default CardBoard;