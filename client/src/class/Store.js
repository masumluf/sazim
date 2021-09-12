//Store.js

import React, { createContext, useReducer } from "react";

const init = {
  marks: [],
};

const store = createContext(init);

const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MARK":
      return {
        ...state,
        marks: action.payload,
      };

    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
