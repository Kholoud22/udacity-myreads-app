import { GET_BOOKS, GET_BOOK, GET_MY_BOOKS, UPDATE_SHELF } from ".";
import { showLoading, hideLoading } from "react-redux-loading";
import { get, update, search } from "../BooksAPI";

export function getBooks(browesdBooks) {
  return {
    type: GET_BOOKS,
    data: { browesdBooks }
  };
}
export function getMyBooks(books) {
  return {
    type: GET_MY_BOOKS,
    data: { books }
  };
}
export function getBook(book) {
  return {
    type: GET_BOOK,
    data: { book }
  };
}

export function updateShelf(book) {
  return {
    type: UPDATE_SHELF,
    data: { book }
  };
}

export function handleBrowseBooks(query) {
  return dispatch => {
    dispatch(showLoading());
    return search(query).then(books => {
      dispatch(getBooks(books));
      dispatch(hideLoading());
    });
  };
}

export function handleGetBook(id) {
  return dispatch => {
    dispatch(showLoading());
    return get(id).then(book => {
      dispatch(getBook(book));
      dispatch(hideLoading());
    });
  };
}

export function handleUpdateBookShelf(book, shelf) {
  return dispatch => {
    dispatch(showLoading());
    return update(book, shelf).then(() => {
      book.shelf = shelf;
      dispatch(updateShelf(book));
      dispatch(hideLoading());
    });
  };
}
