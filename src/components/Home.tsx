import React from "react";
import { useState, useEffect } from 'react';
import {db} from "../firestoreConfig";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import UserDeck from "./Users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

                                 
import { Button, Input, Titles, ContainerC } from "./style";

const Home = () => {
    const [gameDocumentId, setGameDocumentId] = useState<string | null>(null);
    const [ joinButton, setJoinButton] = useState("");
    const [showDeck, setShowDeck] = useState(false);


    const fullDeck = useSelector(
        (state: RootState) => state.cardsDeckReducer.cards
      );
  const newGame = async () => {
    const createNewGame = collection(db, "planning-poker");
    try {
      const docRef = await addDoc(createNewGame, {});
      const docCode = docRef.id;
      setGameDocumentId(docCode);
      console.log("doc creado", docCode);

    //   const newURL = `${window.location.origin}${window.location.pathname}?code=${docCode}`;
    //   window.history.pushState({ path: newURL }, "", newURL);
    } catch (error) {
      console.log("no se puedo crear el doc");
    }
  };

  const joinGame = async () => {
    const gameDocRef = doc(db, "planning-poker", joinButton);
    try {
      const docSnap = await getDoc(gameDocRef);
      if (docSnap) {
        console.log("Unido al juego", joinButton);
        setGameDocumentId(joinButton);

        const user = {
            userId: Math.floor(Math.random() * 1000),
            cardValue: ""
      }

      await updateDoc(gameDocRef, {
        [user.userId]: user
      })
      console.log("User creado", user)
      setShowDeck(true);

      } else {
        console.log("No se pudo unir");
      }
    } catch (error) {
      console.error("Error al unirse al juego:", error);
    }

  };
 

  const handleInput = (e:any) => {
    setJoinButton(e.target.value);
  }

  return (
    <div>

    
    <ContainerC Height="15rem" Margin="1rem 3rem 1rem 3rem">
        <label>El id del juego es: {gameDocumentId} </label>
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
      <Input AlignSelf="center" MarginBottom=".5rem" type="text" value={joinButton} onChange={handleInput}/>
      <Button Widht="20rem" Cursor="pointer" AlignSelf="center" onClick={joinGame}>
        Join
      </Button>
      <UserDeck gameDocumentId={gameDocumentId} />
    </ContainerC>
        
    </div>
  );
};

export default Home;
