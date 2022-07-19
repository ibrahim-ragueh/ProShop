import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const reducers = combineReducers({});

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
