import { createStore, applyMiddleware } from "redux";
import { reducers } from "./reducers";
import { logger } from "redux-logger";
import "babel-polyfill";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
