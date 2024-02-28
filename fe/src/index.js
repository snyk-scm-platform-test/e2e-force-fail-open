import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { getStore, init as storeInit, registerReducer } from "./redux/store";
import registerServiceWorker from "./registerServiceWorker";
import { Row } from "react-bootstrap";
import Form from "./components/Form";
import Map from "./components/Map";





const getInitiatedStore = () => {
  storeInit();
  registerReducer();
  return getStore();
};

const store = getInitiatedStore();

const getApp = () => (
  <Provider store={store}>
    <Row className="app container">
      <Form />
      <Map />
    </Row>
  </Provider>
);

ReactDOM.render(getApp(), document.getElementById("root"));
registerServiceWorker();
