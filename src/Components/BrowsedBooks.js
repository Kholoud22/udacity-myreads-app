import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import * as BooksAPI from "../BooksAPI";
import debounce from "lodash.debounce";

class BrowsedBooks extends Component {
  state = {
    books: [],
    browsedBooks: [],
    query: ""
  };

  static propTypes = {
    books: PropTypes.array.isRequired,
    moveShelf: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (window.history.state.browsedBooks) {
      this.setState({
        browsedBooks: window.history.state.browsedBooks,
        query: window.history.state.query
      });
      let q = window.history.state.query;
      document.getElementById("input").value = q;
    }
  }

  browseBooks = debounce(async q => {
    let browsedBooks = [];
    let books = this.props.books;
    if (q.trim()) {
      browsedBooks = await BooksAPI.search(q.trim());
      if (browsedBooks && !browsedBooks.error && browsedBooks.length) {
        browsedBooks = browsedBooks.map(b => {
          b.shelf = "none";
          let bookToBeUpdated = books.filter(book => book.id === b.id)[0];
          if (bookToBeUpdated) b = bookToBeUpdated;
          return b;
        });
      }
    }
    this.setState(() => ({ browsedBooks: browsedBooks, query: q }));
    window.history.replaceState(
      { browsedBooks: browsedBooks, query: q },
      "title"
    );
  }, 1000);

  render() {
    const { browsedBooks } = this.state;
    const { moveShelf } = this.props;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>

          <div className='search-books-input-wrapper'>
            <input
              id='input'
              type='text'
              placeholder='Search by title or author'
              onChange={event => this.browseBooks(event.target.value)}
              ref={input => (this.input = input)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          {browsedBooks && browsedBooks.length && !browsedBooks.error ? (
            <BookShelf books={browsedBooks} moveShelf={moveShelf} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default BrowsedBooks;
