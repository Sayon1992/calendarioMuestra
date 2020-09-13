import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import calendarReducer from "./store/reducers/calendar";
import loginReducer from "./store/reducers/login";
import todoReducer from "./store/reducers/todo";

const rootReducer = combineReducers({
  calendar: calendarReducer,
  login: loginReducer,
  todo: todoReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
