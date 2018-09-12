/* global window */

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

let store;

const init = () => {
  const params = [reducers];
  const enhancers = [applyMiddleware(thunk)];
  if (
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    // eslint-disable-line no-underscore-dangle
    enhancers.push(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    ); // eslint-disable-line no-underscore-dangle
  }
  params.push(window.__PRELOADED_STATE__); // eslint-disable-line no-underscore-dangle
  store = compose(...enhancers)(createStore)(...params);

  store.replaceReducer(reducers);
};

const getStore = () => store;

const registerReducer = reducer => {
  Object.assign(reducers, reducer);
  if (store) {
    store.replaceReducer(reducers);
  }
};

export { registerReducer, getStore, init };
