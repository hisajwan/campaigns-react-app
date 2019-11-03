import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import { saga } from "./saga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();
const middleware = [sagaMiddleWare];
const initialState = {};
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleWare.run(saga);

export default store;
