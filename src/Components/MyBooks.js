import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const MyBooks = props => {
  const { books } = props;
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
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
      <div className='list-books-content'>
        <div className='bookshelf'>
          {shelves.map((item, index) => ( 
            <BookShelf
              key={index}
              books={Object.values(books).filter(book => book.shelf === item.shelf)}
              title={item.title}
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
// MyBooks.propTypes = {
//   //books: PropTypes.array.isRequired,
//   moveShelf: PropTypes.func.isRequired
// };
const mapStateToProps = ({ books }) => ({
  books
})

export default connect(mapStateToProps, null)(MyBooks)
