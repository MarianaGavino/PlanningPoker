import { useState } from "react";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import FirebaseBoard from "./FirebaseBoard";
import { db } from "../firestoreConfig";

import {
  Input,
  Button,
  ContainerC,
  Card,
  CardDeck,
  WarningMessage,
  DivContainer,
  Titles,
} from "./style";

export interface DeckCard {
  id: number;
  value: string;
}

export interface User {
  id: number;
  cardValue: string;
}

const FirebasePlanningPoker = () => {
  const [selectedCards, setSelectedCards] = useState<DeckCard[]>([]);
  const [gameDocumentId, setGameDocumentId] = useState<string>('');
  const [joinedGame, setJoinedGame] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [cardMessage, setCardMessage] = useState<string | null>(null);
  const [newGameErrorMessage, setNewGameErrorMessage] = useState("");

  const fullDeck = useSelector(
    (state: RootState) => state.cardsDeckReducer.cards
  );

  const mostFrequent = () => {
    const valueFrequency = selectedCards.reduce<Record<string, number>>(
      (acum, { value }) => {
        acum[value] = (acum[value] || 0) + 1;
        return acum;
      },
      {}
    );

    const [mostFrequent] = Object.entries(valueFrequency).reduce(
      (max, [id, rep]) => (rep > max[1] ? [id, rep] : max),
      ["", 0] as [string, number]
    );
    return parseInt(mostFrequent);
  };

  const newGame = async () => {
    
    const createNewGame = collection(db, "planning-poker");
    try {
      const docRef = await addDoc(createNewGame, {});
      const docCode = docRef.id;

      setGameDocumentId(docCode);
      await joinGame(docCode);
      
    } catch (error) {
      setNewGameErrorMessage("Couldn't create the game, please try again")
    }
  };

  const handleGameDocumentIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputDocId = event.target.value;
    setGameDocumentId(inputDocId);
  };

  const joinGame = async (gameDocId: string) => {

    const userId = Math.floor(Math.random() * 1000);
    const gameDocRef = doc(db, "planning-poker", gameDocId);

    const user = {
      userId: userId,
      cardValue: null,
    };

    await updateDoc(gameDocRef, {
      [user.userId]: user,
    });
   
    setCurrentUserId(userId);
    setJoinedGame(true);
    setGameDocumentId(gameDocId);

  };

  const handleClickDeck2 = async (cardValue: string) => {
    const gameDocRef = doc(db, "planning-poker", gameDocumentId);

    if (selectedCards.length > 0) {
      setCardMessage("Solo puede seleccionar una carta");
      return;
    }

    await updateDoc(gameDocRef, {
      [`${currentUserId}`]: { cardValue },
    });

    const selectedCard: DeckCard = {
      id: selectedCards.length + 1,
      value: cardValue,
    };
    setSelectedCards([...selectedCards, selectedCard]);
  };

  return (
    <DivContainer>
      <ContainerC Height="15rem" Margin="1rem 3rem 1rem 3rem">
        <label>Game ID: {gameDocumentId || "No game"}</label>
        <Titles FontSize="2rem" Color="#e6b313">
          New Game
        </Titles>
        <Button
          Widht="20rem"
          Cursor="pointer"
          AlignSelf="center"
          onClick={newGame}
        >
          New
        </Button>
        {newGameErrorMessage && (
          <WarningMessage>{newGameErrorMessage}</WarningMessage>
        )}
        <Titles FontSize="1.5rem" Color="#91c43b">
          Join a Game
        </Titles>
        <Input
          AlignSelf="center"
          MarginBottom=".5rem"
          type="text"
          placeholder="Put here the game ID"
          value={gameDocumentId}
          onChange={handleGameDocumentIdChange}
        />
        <Button
          Widht="20rem"
          Cursor="pointer"
          AlignSelf="center"
          onClick={()=> joinGame(gameDocumentId) }
        >
          Join
        </Button>
      </ContainerC>

      <DivContainer>
        <FirebaseBoard mostFrequent={mostFrequent} gameDocumentId={gameDocumentId} />
      </DivContainer>
      {cardMessage && (
        <WarningMessage>You can only choose one card</WarningMessage>
      )}

       {/*  Deck  */}
      {joinedGame && (
        <DivContainer>
          <Titles FontSize="1.5rem">User {currentUserId}</Titles>
          <CardDeck>
            {fullDeck.map((card) => (
              <Card
                Cursor="pointer"
                BackgroundColor="white"
                Hover="#92c43b67"
                key={card.id}
                onClick={() => handleClickDeck2(card.value)}
              >
                {card.value}
              </Card>
            ))}
          </CardDeck>
        </DivContainer>
      )}
    </DivContainer>
  );
};
export default FirebasePlanningPoker;
