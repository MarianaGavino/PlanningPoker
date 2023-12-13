import React from "react";
import { Card } from "./Users";
// import "./Board.css";
import "./CardDeck.css";
import { useState, useEffect } from "react";
import { 
  BoardContainer,
  SelectedCards,
  Card as CardStyle,
  RevealLabel,
  RevealButton,
  DivContainer,
  Titles,
  LabelContainer,
} from './style';


interface BoardProps {
  discardedCards: Card[];
  mostFrequent: (array: Card[]) => number | null;
}

const Board: React.FC<BoardProps> = ({ discardedCards, mostFrequent }) => {
  const [revealed, setRevealed] = useState(false);
  const [mostFrequentVal, setMostFrequentVal] = useState<number | null>(null);
  const [discussionMessage, setDiscussionMessage] = useState(false);

  useEffect(() => {
    const allDifferent = () => {
      const cardValues = discardedCards.map((card) => card.value);
      return cardValues.every(
        (value, index) => cardValues.indexOf(value) === index
      );
    };
    setDiscussionMessage(allDifferent());
  }, [discardedCards]);

  const handleReveal = () => {
    setRevealed(true);
    setMostFrequentVal(mostFrequent(discardedCards));
  };

  return (
    <BoardContainer>
      <Titles FontSize="1.5rem">Selected Cards</Titles>
      <SelectedCards>
        {discardedCards.map((card) => (
          <CardStyle BackgroundColor={revealed ? "white" : "#91c43b"}
            key={card.id}
          >
            {card.value}
          </CardStyle>
        ))}
      </SelectedCards>
      <RevealLabel>
        {revealed ? (
          <DivContainer>
            <LabelContainer>
              Agreement value: {mostFrequentVal !== null ? mostFrequentVal : ""}
            </LabelContainer>
            {discussionMessage ? (
              <DivContainer>There are different opinions, time to debate</DivContainer>
            ) : null}
          </DivContainer>
        ) : (
          ""
        )}
      </RevealLabel>

      <RevealButton className="button-Reveal" onClick={handleReveal}>
        Reveal
      </RevealButton>
    </BoardContainer>
  );
};

export default Board;
