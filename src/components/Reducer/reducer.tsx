import { SET_CARDS_DECK } from "../Types/actionTypes";
import { Card } from '../CardDeck';

const initialState = {
  cards: [],
}

// const ACTION_TYPES = {
//     usersNumber: 'usersNumber'
// }

// type ActionTypes = typeof ACTION_TYPES;

type cardsDeckAction = {
    type: string,
    payload: Card[],
};

// type Action = userAction;

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