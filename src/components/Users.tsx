import { useState } from "react";
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

const UserDeck = () => {
  const dispatch = useDispatch();
  const [usersNumber, setUsersNumber] = useState<number>(1);
  const [discardedCards, setDiscardedCards] = useState<Card[]>([]);

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
    const users: User[] = new Array(usersNumber).fill(0).map((e, index) => ({
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
    const updateUsersDeck = usersDeck.map((user) => {
      if (user.id === userId) {
        const removedCardIndex = user.deck.findIndex((card) => card.id === cardId);
        const removedCard = user.deck.splice(removedCardIndex, 1)[0];

        setDiscardedCards([...discardedCards, removedCard]); // Agregar la carta eliminada al Board
        return { ...user, deck: user.deck };
      }
      return user;
    });

    dispatch(setUserDeck(updateUsersDeck));
  };



  return (
    <div>
      <label>How many players?</label>
      <input type="number" value={usersNumber} onChange={handleInputChange} />
      <button type="submit" onClick={inputValue}>
        Submit
      </button>
      <div><Board discardedCards={discardedCards}/></div>
      {/* Deck */}
      <div className="UserList">
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
            {/* <CardDeck /> */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserDeck;

{
  /* <div className="UserList">
        {users.map((user) => (
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
            {/* <CardDeck /> */
}
//     </div>
//   ))}

// </div> */}
