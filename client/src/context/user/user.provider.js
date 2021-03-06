import React, { createContext, useReducer } from "react";
//import userState
import { userState } from "./user.state";
// import user reducer
import { userReducers } from "./user.reducers";
//IMPORT types constants
// import { userType } from "./user.types";

// user context created
export const UserContext = createContext();

const userinitalState = userState;

const UserContextProvider = (props) => {
  const [userDetails, dispatch] = useReducer(userReducers, userinitalState);
  return (
    <UserContext.Provider value={{ userDetails, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
