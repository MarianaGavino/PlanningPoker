import React from "react";
import { Card } from "./Users";
import "./Board.css";
import "./CardDeck.css";
import { useState } from "react";

interface BoardProps {
  discardedCards: Card[];
  mostFrequent: (array: Card[]) => number | null;
}

const Board: React.FC<BoardProps> = ({ discardedCards, mostFrequent }) => {
  const [revealed, setRevealed] = useState(false);
  const [mostFrequentVal, setMostFrequentVal] = useState<number | null>(null);

  const handleReveal = () => {
    setRevealed(true);
    setMostFrequentVal(mostFrequent(discardedCards));
  };

  return (
    <div className="board">
      <h2>Selected Cards</h2>
      <div className="selected-cards">
        {discardedCards.map((card) => (
          <div
            className={`selected-card ${revealed ? "white-background" : ""}`}
            key={card.id}
          >
            {card.value}
          </div>
        ))}
      </div>
      <div className="label-agreement">
        {revealed ? (
        <label >
          Agreement value: {mostFrequentVal !== null ? mostFrequentVal : ""}
        </label>
      ) : ""}
      </div>
      
      <button className="button-Reveal" onClick={handleReveal}>Reveal</button>
    </div>
  );
};

export default Board;
