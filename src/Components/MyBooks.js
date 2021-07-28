import React from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const MyBooks = props => {
  const { moveShelf, books } = props;
  const shelves = [
    {
      title: "Currently Reading",
      shelf: "currentlyReading"
    },
    {
      title: "Read",
      shelf: "read"
    },
    {
      title: "Want to Read",
      shelf: "wantToRead"
    }
  ];
  return (
    <div className='list-books'>
      <div className='list-books-content'>
        <div className='bookshelf'>
          {shelves.map((item, index) => (
            <BookShelf
              key={index}
              books={books.filter(book => book.shelf === item.shelf)}
              title={item.title}
              moveShelf={moveShelf}
            />
          ))}
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>
          <button type='button'>Add a book</button>
        </Link>
      </div>
    </div>
  );
};
MyBooks.propTypes = {
  books: PropTypes.array.isRequired,
  moveShelf: PropTypes.func.isRequired
};
export default MyBooks;
