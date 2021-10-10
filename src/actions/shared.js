import { showLoading, hideLoading } from "react-redux-loading";
import { getAll } from "../BooksAPI";
import { getMyBooks } from "./books";
export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getAll().then(books => {
      dispatch(getMyBooks(books));
      dispatch(hideLoading());
    });
  };
}
