import { SET_CARDS_DECK } from "../Types/actionTypes";
import { Card } from '../CardDeck';
//import CardDeck from "../CardDeck";

const cards: Card[] = [
  { id: 1, value: '0' },
  { id: 2, value: '1' },
  { id: 3, value: '2' },
  { id: 4, value: '3' },
  { id: 5, value: '5' },
  { id: 6, value: '8' },
  { id: 7, value: '13' },
  { id: 8, value: '20' },
  { id: 9, value: '40' },
  { id: 10, value: '100' },
  { id: 11, value: '?' },
];
const initialState = {
  cards,
}

type cardsDeckAction = {
    type: string,
    payload: Card[],
};

export const cardsDeckReducer = (state = initialState, action: cardsDeckAction) => {
    switch (action.type) {
      case SET_CARDS_DECK:
        return {
          ...state,
          cards: action.payload,
        };
      default:
        return state;
    }
  };

export default cardsDeckReducer;