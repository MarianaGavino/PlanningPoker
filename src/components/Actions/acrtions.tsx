import { SET_CARDS_DECK } from "../Types/actionTypes";
import { SET_USERS_DECK } from "../Types/actionTypes";
import {Card} from "../CardDeck";

export const setCardsDeck = (data: Card[]) => {
    return {
      type: SET_CARDS_DECK,
      payload: data,
    };
  };

export const setUserDeck = (newUserDeck: any) => {
  return {
    type: SET_USERS_DECK,
    payload: newUserDeck,
  }
}