import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./bootstrap_overrides.css";
import App from "./components/App";
import { getStore, init as storeInit, registerReducer } from "./redux/store";
import registerServiceWorker from "./registerServiceWorker";

const getInitiatedStore = () => {
  storeInit();
  registerReducer();
  return getStore();
};

const store = getInitiatedStore();

const getApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(getApp(), document.getElementById("root"));
registerServiceWorker();
