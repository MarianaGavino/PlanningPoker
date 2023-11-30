import CardDeck from "./CardDeck";
import { useState } from "react";
import './CardDeck.css';

type Card = {
  id: number;
  value: string;
};

type User = {
  id: number;
  deck: Card[];
};

const UserDeck = () => {
  const [usersNumber, setUsersNumber] = useState<number>(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsersNumber(parseInt(event.target.value));
  };

  const inputValue = () => {
    console.log("Número de participantes: " + usersNumber);
  };

  const generateDeck = () => {
    const cards: Card[] = [
      { id: 1, value: "0" },
      { id: 2, value: "1" },
      { id: 3, value: "2" },
      { id: 4, value: "3" },
      { id: 5, value: "5" },
      { id: 6, value: "8" },
      { id: 7, value: "13" },
      { id: 8, value: "20" },
      { id: 9, value: "40" },
      { id: 10, value: "100" },
      { id: 11, value: "?" },
    ];
    return cards;
  };

  // const users: User[] = [{ id: usersNumber, deck: generateDeck() }];

  const users: User[] = new Array(usersNumber).fill(0).map((e, index) => ({
        id: index +1,
        deck: generateDeck()
    }));

  console.log(users);
  console.log(usersNumber)

  return (
    <div>
      <label>How many players?</label>
      <input type="number" value={usersNumber} onChange={handleInputChange} />
      <button type="submit" onClick={inputValue}>
        Submit
      </button>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.id}</h2>
            <div className="card-deck">
            {user.deck.map((card) => (
              <div className="card" key={card.id}>{card.value}</div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDeck;
