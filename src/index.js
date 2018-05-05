import React from "react";
import ReactDOM from "react-dom";
import MainContainer from "./components";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
