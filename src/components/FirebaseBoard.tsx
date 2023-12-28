import React from "react";
import { DeckCard } from "./FirebasePlanningPoker";
import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firestoreConfig";
import {
  BoardContainer,
  SelectedCards,
  Card as CardStyle,
  RevealLabel,
  RevealButton,
  DivContainer,
  Titles,
  LabelContainer,
} from "./style";

interface BoardProps {
  mostFrequent: (array: DeckCard[]) => number | null;
  gameDocumentId: string | null;
}
interface UserData {
  userId: number;
  cardValue: string;
}
const FirebaseBoard: React.FC<BoardProps> = ({ mostFrequent, gameDocumentId }) => {
  const [revealed, setRevealed] = useState(false);
  const [mostFrequentVal, setMostFrequentVal] = useState<number | null>(null);
  const [discussionMessage, setDiscussionMessage] = useState(false);
  const [selectedCards, setSelectedCards] = useState<DeckCard[]>([]);

  useEffect(() => {
    if (gameDocumentId) {
      const gameDocRef = doc(db, "planning-poker", gameDocumentId);

      const unsubscribe = onSnapshot(gameDocRef, (doc) => {
        const data = doc.data();
        if (data) {
          const updatedSelectedCards: DeckCard[] = Object.values(data)
            .map((userData: UserData) => ({
              id: userData.userId,
              value: userData.cardValue,
            }))
            .filter((card) => card.value !== null);
          setSelectedCards(updatedSelectedCards);
        }
      });

      return () => unsubscribe();
    }
  }, [gameDocumentId]);

  useEffect(() => {
    const allDifferent = () => {
      const cardValues = selectedCards.map((card) => card.value);
      return cardValues.every(
        (value, index) => cardValues.indexOf(value) === index
      );
    };
    setDiscussionMessage(allDifferent());
  }, [selectedCards]);

  const handleReveal = () => {
    setRevealed(true);
    setMostFrequentVal(mostFrequent(selectedCards));
  };

  return (
    <BoardContainer>
      <Titles FontSize="1.5rem">Selected Cards</Titles>
      <SelectedCards>
        {selectedCards.map((card) => (
          <CardStyle
            BackgroundColor={revealed ? "white" : "#91c43b"}
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
              <DivContainer>
                There are different opinions, time to debate
              </DivContainer>
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

export default FirebaseBoard;
