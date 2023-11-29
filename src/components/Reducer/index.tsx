import { SET_USERS_NUMBER } from "../Types";

const initialState = {
    usersNumber: 1,
};

const ACTION_TYPES = {
    usersNumber: 'usersNumber'
}

type ActionTypes = typeof ACTION_TYPES;

type userAction = {
    type: ActionTypes['usersNumber'],
    payload: number,
};

type Action = userAction;

const userNumberReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case SET_USERS_NUMBER:
        return {
          ...state,
          usersNumber: action.payload,
        };
      default:
        return state;
    }
  };

export default userNumberReducer;