import { GET_BOOKS, GET_BOOK, GET_MY_BOOKS, UPDATE_SHELF } from "../actions";

export default function booksReducer(books = {}, action) {
  switch (action.type) {
    case GET_MY_BOOKS:
      return {
        ...books,
        ...action.data.books
      };
    case GET_BOOK:
    case UPDATE_SHELF:
      const { book } = action.data;
      return {
        ...books,
        ...book
      };
    case GET_BOOKS:
      return {
        ...books,
        ...action.data.browesdBooks
      };
    default:
      return books;
  }
}
