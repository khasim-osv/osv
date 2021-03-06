// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";

import { reducers } from "../../../../../app/reducers";

//import rootSaga from "../../../../../app/sagas";
import rootSaga from "./mockSaga";

const sagaMiddleware = createSagaMiddleware();

function render(
  ui,
  {
    initialState = {},
    store = createStore(reducers, applyMiddleware(sagaMiddleware /*,logger*/)),
    ...renderOptions
  } = {}
) {
  sagaMiddleware.run(rootSaga);

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
