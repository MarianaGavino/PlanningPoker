import { useState } from "react";
import "./InputUsers.css";
import "./CardDeck.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUserDeck } from "./Actions/acrtions";
import Board from "./Board";

export interface Card {
  id: number;
  value: string;
}

export interface User {
  id: number;
  deck: Card[];
}

interface SelectedCards {
  [userId:number]: boolean;
}

const UserDeck = () => {
  const dispatch = useDispatch();
  const [usersNumber, setUsersNumber] = useState<number>(1);
  const [discardedCards, setDiscardedCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCards>({});

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
    dispatch(setUserDeck(users));
    console.log("Número de participantes: " + usersNumber);

    let val = Object.keys(users);

    console.log({ users });
    console.log(users[1]);
    console.log(val);
    console.log(usersNumber);
  };

  const handleClick = (cardId: number, userId: number) => {
    console.log(`Haz hecho clic en la ${cardId} del usuario ${userId}`);

    const userSelectedCount = selectedCards[userId];
    console.log(`Seleccionó mas de 1 ${userSelectedCount} el user ${userId}`);
    console.log(selectedCards)

    if(selectedCards[userId]) {
      return;
    }

   console.log(typeof(selectedCards))

    const updateUsersDeck = usersDeck.map((user) => {
      if (user.id === userId) {
        const updatedDeck = user.deck.filter((card) => card.id !== cardId);
        const removedCard = user.deck.find((card) => card.id === cardId);
        if (removedCard) {
          setDiscardedCards([...discardedCards, removedCard]); // Agregar la carta eliminada al Board
          setSelectedCards({...selectedCards,[userId]: true });
        }
        return { ...user, deck: updatedDeck };
      }
      return user;
    });

    dispatch(setUserDeck(updateUsersDeck));
  };

  console.log(discardedCards);

  const valueSelectedCards = discardedCards.map((card) => card.value);
  console.log("Valores de cartas seleccionadas:" + valueSelectedCards);

  const mostFrequent = (array: Card[]) => {
    if (array.length === 0) {
      return null;
    }
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

  console.log(mostFrequent(discardedCards));

  return (
    <div>
      <div className="players-number">
        <label className="players-label">How many players?</label>
        <input
          className="players-input"
          type="number"
          min="1"
          value={usersNumber}
          onChange={handleInputChange}
        />
        <button className="players-button" type="submit" onClick={inputValue}>
          Submit
        </button>
      </div>
      {discardedCards.length > 0 ? (
        <div>
          <Board discardedCards={discardedCards} mostFrequent={mostFrequent} />
        </div>
      ) : (
        ""
      )}

      {/* Deck */}
     
      <div className="UserList">
        {/* {cardsMessage ? <div>You can only select one card </div> : ""} */}
        {usersDeck.map((user) => (
          <div key={user.id}>
      
            <h2>{user.id}</h2>
            
            <div className="card-deck">
              {user.deck.map((card) => (
                <div
                  className="card"
                  key={card.id}
                  onClick={() => handleClick(card.id, user.id)}
                >
                  {card.value}
                </div>
              ))}
            </div>
          </div>
          ))} 
      </div>
    </div>
  );
};
export default UserDeck;