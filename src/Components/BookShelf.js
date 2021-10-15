import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class BookShelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string
  };

  render() {
    const { books, title } = this.props;
    return (
      <div className='bookshelf-books'>
        <h2 className='bookshelf-title'>{title}</h2>
        <ol className='books-grid'>
          {books.map(book => (
            <div key={book.id} className='open-details'>
              <Book canUpdateShelf={true} book={book}/>
              {/* <div style={{ marginRight: 50 }}>
                <Link
                  to={{
                    pathname: "/details/" + book.id
                  }} 
                >
                  <button className="book-details-btn" type='button'>Open details</button>
                </Link>
              </div> */}
            </div>
          ))}
        </ol>
      </div>
    );
  }
}

export default BookShelf;
