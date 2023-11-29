import CardDeck from "./CardDeck";
import { useState } from "react";
import cards from "./CardDeck";

// import Home from "./Home";

type Card = {
  id: number;
  value: string;
};

type User = {
  id: number;
  // name: string,
  deck: any;
};

const UserDeck = () => {
  const [usersNumber, setUsersNumber] = useState<number>(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsersNumber(parseInt(event.target.value));
  };

  const inputValue = () => {
    console.log("Número de participantes: " + usersNumber);
  };

  const users: User[] = [{ id: usersNumber, deck: CardDeck()}];



  const generateDeck = () => {
    users.map((e) => e.id);
  };


  console.log(users);

  return (
    <div>
      <label>How many players?</label>
      <input type="number" value={usersNumber} onChange={handleInputChange} />
      <button type="submit" onClick={inputValue}>
        Submit
      </button>
      <div>
        
      </div>
    </div>
  );
};

export default UserDeck;
