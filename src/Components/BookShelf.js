import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class BookShelf extends React.Component {
  static propTypes = {
    //books: PropTypes.array,
    moveShelf: PropTypes.func.isRequired,
    title: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.books && !nextProps.books.error) return true;
    return false;
  }

  render() {
    const { books, title, moveShelf } = this.props;
    return (
      <div className='bookshelf-books'>
        <h2 className='bookshelf-title'>{title}</h2>
        <ol className='books-grid'>
          {books.map(book => (
            <div key={book.id} className='open-details'>
              <Book canUpdateShelf={true} book={book} moveShelf={moveShelf} />
              <div style={{ marginRight: 50 }}>
                <Link
                  to={{
                    pathname: "/details/" + book.id
                    //search: "?id="+book.id,
                  }}
                >
                  <button type='button'>Open details</button>
                </Link>
              </div>
            </div>
          ))}
        </ol>
      </div>
    );
  }
}
export default BookShelf;
