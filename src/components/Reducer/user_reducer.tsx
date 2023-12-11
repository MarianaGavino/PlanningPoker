import {SET_USERS_DECK} from "../Types/actionTypes";
import { User } from "../Users";

const usersDeck: User[] = [];

const initialUsersState = {
    usersDeck: usersDeck, 
  };
  
 export interface UsersDeckAction  {
    type: string;
    payload: User[]; 
  };
  
  const usersReducer = (state = initialUsersState, action: UsersDeckAction) => {
    switch (action.type) {
      case SET_USERS_DECK:
        return {
          ...state,
          usersDeck: action.payload,
        };
      default:
        return state;
    }
  };

  export default usersReducer;