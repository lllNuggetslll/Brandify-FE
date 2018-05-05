import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import customMiddleware from "./../middleware";
import rootReducer from "../reducers";

const configureStore = () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, customMiddleware)
  );
};

export default configureStore;
