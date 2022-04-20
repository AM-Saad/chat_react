import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "../reducers/index";
import { socektMiddleWare } from "../middleware/socket";

import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(socektMiddleWare, thunk))
);

export default store;
