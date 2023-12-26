import { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Board1 from "./Board1";
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

export interface Card {
  id: number;
  value: string;
}

export interface User {
  id: number;
  cardValue: string;
}

export interface SelectedUser {
  user: User;
  selectedCard: Card;
}
interface UserData {
  id: number;
  cardValue: string | null;
}

const UserDeck1 = () => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);

  const [gameDocumentId, setGameDocumentId] = useState<string | null>(null);
  const [joinedGame, setJoinedGame] = useState<boolean>(false);
  const [inputGameDocumentId, setInputGameDocumentId] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [cardMessage, setCardMessage] = useState<string | null>(null);

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
      console.log("doc creado", docCode);

    } catch (error) {
      console.log("no se puedo crear el doc");
    }
  };

  const handleGameDocumentIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputGameDocumentId(event.target.value);
  };

  const joinGame = async () => {
    if (!inputGameDocumentId) {
      return;
    }
    const userId = Math.floor(Math.random() * 1000);
    const gameDocRef = doc(db, "planning-poker", inputGameDocumentId);
    const user = {
      userId: userId,
      cardValue: null,
    };

    await updateDoc(gameDocRef, {
      [user.userId]: user,
    });
    setCurrentUserId(userId);
    console.log("User creado", user);
    setJoinedGame(true);
    setGameDocumentId(inputGameDocumentId);
  };

  useEffect(() => {
    if (joinedGame) {
      const gameDocRef = doc(db, "planning-poker", inputGameDocumentId);

      const unsubscribe = onSnapshot(gameDocRef, (doc) => {
        const data = doc.data();
        if (data) {
          const updatedSelectedUsers: SelectedUser[] = Object.values(data).map(
            (userData: UserData) => ({
              user: userData as User,
              selectedCard: fullDeck.find(
                (card) => card.value === userData.cardValue
              ) || { id: 0, value: "" },
            })
          );
          setSelectedUsers(updatedSelectedUsers);
        }
      });

      return () => unsubscribe();
    }
  }, [joinedGame, inputGameDocumentId, fullDeck]);

  const handleClickDeck2 = async (cardValue: string) => {
    const gameDocRef = doc(db, "planning-poker", inputGameDocumentId);

    if (selectedCards.length > 0) {
      setCardMessage("Solo puede seleccionar una carta");
      return;
    }

    await updateDoc(gameDocRef, {
      // [`${currentUserId}.cardValue`]: cardValue,
      [`${currentUserId}`]: { cardValue },
    });
    console.log("cardV:", cardValue, "para user", currentUserId);

    const selectedCard: Card = {
      id: selectedCards.length + 1,
      value: cardValue,
    };
    setSelectedCards([...selectedCards, selectedCard]);
  };

  return (
    <DivContainer>
      <ContainerC Height="15rem" Margin="1rem 3rem 1rem 3rem">
        <label>El id del juego es: {gameDocumentId}</label>
        <Titles FontSize="2rem" Color="#e6b313">
          Nuevo Juego
        </Titles>
        <Button
          Widht="20rem"
          Cursor="pointer"
          AlignSelf="center"
          onClick={newGame}
        >
          New
        </Button>
        <Titles FontSize="1.5rem" Color="#91c43b">
          Unirse a un juego
        </Titles>
        <Input
          AlignSelf="center"
          MarginBottom=".5rem"
          type="text"
          value={inputGameDocumentId}
          onChange={handleGameDocumentIdChange}
        />
        <Button
          Widht="20rem"
          Cursor="pointer"
          AlignSelf="center"
          onClick={joinGame}
        >
          Join
        </Button>
      </ContainerC>

      <DivContainer>
        <Board1 mostFrequent={mostFrequent} gameDocumentId={gameDocumentId} />
      </DivContainer>
      {cardMessage && (
        <WarningMessage>You can only choose one card</WarningMessage>
      )}
      {/* Deck 2 */}
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
export default UserDeck1;
