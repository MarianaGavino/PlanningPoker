import React from "react";
import { Card } from "./Users";
import "./Board.css";
import "./CardDeck.css";
import { useState } from 'react';

interface BoardProps {
  discardedCards: Card[];
}


const Board: React.FC<BoardProps> = ({ discardedCards }) => {

  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  }

  return (
    <div className="board">
      <h2>Selected Cards</h2>
      <div className="selected-cards">
        {discardedCards.map((card) => (
          <div 
            className={`selected-card ${revealed ? 'white-background' : ''}`}
            key={card.id}>
            {card.value}
          </div>
        ))}
      </div>
      <button onClick={handleReveal}>Reveal</button>
    </div>
  );
};

export default Board;
