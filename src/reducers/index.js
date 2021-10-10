import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";
import books from "./books";

const rootReducer = combineReducers({
  books,
  loadingBar: loadingBarReducer
});

export default rootReducer;
