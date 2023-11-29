import { SET_USERS_NUMBER } from "../Types";


export const setUsersNumber = (number: number) => {
    return {
      type: SET_USERS_NUMBER,
      payload: number,
    };
  };