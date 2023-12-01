import CardDeck from "./CardDeck";
import { useState } from "react";
import './CardDeck.css';
import { useDispatch, useSelector } from "react-redux";
import cardsDeckReducer from './Reducer/reducer';
import { RootState } from "../store";

type Card = {
  id: number;
  value: string;
};

type User = {
  id: number;
  deck: Card[];
};

const UserDeck = () => {

  const dispatch = useDispatch();

  const fullDeck = useSelector((state: RootState)=>state.cardsDeckReducer.cards)


  const [usersNumber, setUsersNumber] = useState<number>(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsersNumber(parseInt(event.target.value));
  };

  const inputValue = () => {
    console.log("Número de participantes: " + usersNumber);
  };

 

  const users: User[] = new Array(usersNumber).fill(0).map((e, index) => ({
        id: index +1,
        deck: fullDeck
    }));

  console.log(users);
  console.log(usersNumber)

  const handleClick = (cardId: number) => {
    console.log(`Haz hecho clic en la ${cardId}`);
    //dispatch(setCardsDeck([...reducer,userid: id, cardId: idcard ]))
  };

  return (
    <div>
      <label>How many players?</label>
      <input type="number" value={usersNumber} onChange={handleInputChange} />
      <button type="submit" onClick={inputValue}>
        Submit
      </button>
      {/* Deck */}
      <div className="UserList">
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.id}</h2>
            <div className="card-deck">
            {user.deck.map((card) => (
              <div className="card" key={card.id} onClick={()=> handleClick(card.id)}>{card.value}</div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDeck;
