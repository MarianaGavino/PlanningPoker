import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUserDeck as userDeck } from "./Actions/acrtions";
import Board from "./Board";
import {
  Input,
  Label,
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
  deck: Card[];
}

interface SelectedCards {
  [userId: number]: boolean; // 1: true
}

const UserDeck = () => {
  const dispatch = useDispatch();
  const [usersNumber, setUsersNumber] = useState<number>(1);
  const [discardedCards, setDiscardedCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCards>({});
  const [cardMessage, setCardMessage] = useState<SelectedCards>({});

  const fullDeck = useSelector(
    (state: RootState) => state.cardsDeckReducer.cards
  );

  const usersDeck = useSelector(
    (state: RootState) => state.usersReducer.usersDeck
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsersNumber(parseInt(event.target.value));
  };

  const inputValue = () => {
    const users: User[] = new Array(usersNumber).fill(0).map((_, index) => ({
      id: index + 1,
      deck: fullDeck,
    }));
    dispatch(userDeck(users));
  };

  const handleClick = (cardId: number, userId: number) => {
    console.log(`Haz hecho clic en la ${cardId} del usuario ${userId}`);

    console.log([userId]);
    const ejem = selectedCards[userId];
    console.log(ejem);
    if (selectedCards[userId]) {
      setCardMessage({ [userId]: true });
      return;
    }

    const updateUsersDeck = usersDeck.map((user) => {
      if (user.id === userId) {
        const updatedDeck = user.deck.filter((card) => card.id !== cardId);
        const removedCard = user.deck.find((card) => card.id === cardId);
        if (removedCard) {
          setDiscardedCards([...discardedCards, removedCard]);
          setSelectedCards({ ...selectedCards, [userId]: true });
        }
        return { ...user, deck: updatedDeck };
      }
      return user;
    });

    dispatch(userDeck(updateUsersDeck));
  };

  const mostFrequent = () => {
    const valueFrequency = discardedCards.reduce<Record<string, number>>(
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

  return (
    <DivContainer>
      <ContainerC Height="10rem" Margin="1rem 3rem 1rem 3rem">
        <Label MarginBottom="1rem">How many players?</Label>
        <Input
          AlignSelf="center" MarginBottom=".5rem"
          type="number"
          min="1"
          value={usersNumber}
          onChange={handleInputChange}
        />
        <Button Widht="20rem" Cursor="pointer" Color="#6e6f74" AlignSelf="center" type="submit" onClick={inputValue}>
          Submit
        </Button>
      </ContainerC>
      {discardedCards.length > 0 ? (
        <DivContainer>
          <Board discardedCards={discardedCards} mostFrequent={mostFrequent} />
        </DivContainer>
      ) : (
        ""
      )}
      {/* Deck */}
      <DivContainer>
        {usersDeck.map((user) => (
          <DivContainer key={user.id}>
            {cardMessage[user.id] ? (
              <WarningMessage>
                You can only choose one card
              </WarningMessage>
            ) : null}
            <Titles FontSize="1.5rem">{user.id}</Titles>
            <CardDeck>
              {user.deck.map((card) => (
                <Card Cursor="pointer" BackgroundColor="white" Hover="#92c43b67"

                  key={card.id}
                  onClick={() => handleClick(card.id, user.id)}
                >
                  {card.value}
                </Card>
              ))}
            </CardDeck>
          </DivContainer>
        ))}
      </DivContainer>
    </DivContainer>
  );
};
export default UserDeck;
