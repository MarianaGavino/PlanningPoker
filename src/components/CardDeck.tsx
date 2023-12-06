import React from 'react';
import './CardDeck.css';
import { useDispatch } from 'react-redux';
import  UserDeck  from './Users';

export interface Card {
  id: number;
  value: string;
};


const CardDeck = () => {
const dispatch = useDispatch();
   const cards: Card[] = [
    { id: 1, value: '0' },
    { id: 2, value: '1' },
    { id: 3, value: '2' },
    { id: 4, value: '3' },
    { id: 5, value: '5' },
    { id: 6, value: '8' },
    { id: 7, value: '13' },
    { id: 8, value: '20' },
    { id: 9, value: '40' },
    { id: 10, value: '100' },
    { id: 11, value: '?' },
  ];
  const handleClick = (cardId: number) => {
    console.log(`Haz hecho clic en la ${cardId}`);
    //dispatch(setCardsDeck([...reducer,userid: id, cardId: idcard ]))
  };
  const selectCard = () => {
   
  }

  return (
    <div className="card-deck">
      {cards.map((card) => (
        <div key={card.id} className="card" 
        onClick={() => handleClick(card.id)}>
          {card.value}
        </div>
      ))}
    </div>
  );
};

export default CardDeck;
export function cards() {};
