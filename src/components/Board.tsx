import React from "react";
import { Card } from "./Users";

interface BoardProps {
  discardedCards: Card[];
}

const Board: React.FC<BoardProps> = ({ discardedCards }) => {
  return (
    <div className="board">
      <h2>Discarded Cards</h2>
      <div className="discarded-cards">
        {discardedCards.map((card) => (
          <div className="discarded-card" key={card.id}>
            {card.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;