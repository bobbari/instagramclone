//IMPORT types constants
import { userType } from "./user.types";
// import userState
import { userState } from "./user.state";

const initalState = userState;

export const userReducers = (state = initalState, action) => {
  switch (action.type) {
    case userType.ADD_TOKEN:
      return { ...state, token: action.payload };
    case userType.ADD_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
