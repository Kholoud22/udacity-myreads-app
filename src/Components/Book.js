import React from "react";
import PropTypes from "prop-types";
import { handleUpdateBookShelf } from '../actions/books'
import { connect } from 'react-redux';

class Book extends React.Component {
  state = {
    book:{}
  };

  static propTypes = {
    book: PropTypes.object.isRequired,
    canUpdateShelf: PropTypes.bool.isRequired
  };

  componentDidMount(){
    this.setState({book: this.props.book})
  }

  moveShelf = (event, book) => {
    var bookToBeUpdated = {...book};
    bookToBeUpdated.shelf = event.target.value;
    this.setState({book: bookToBeUpdated});
    this.props.handleUpdateBookShelf(book, event.target.value);
  }

  render() {
    const { book } = this.state;
    const {canUpdateShelf} = this.props;
    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 193,
                backgroundImage: `${
                  book.imageLinks
                    ? `url(${book.imageLinks.smallThumbnail})`
                    : null
                }`
              }}
            ></div>

            {canUpdateShelf && (
              <div className='book-shelf-changer'>
                <select
                  onChange={e => {
                    this.moveShelf(e, book);
                  }}
                  value={book.shelf}
                >
                  <option value='move' disabled>
                    Move to...
                  </option>
                  <option value='currentlyReading'>Currently Reading</option>
                  <option value='wantToRead'>Want to Read</option>
                  <option value='read'>Read</option>
                  <option value='none'>None</option>
                </select>
              </div>
            )}
          </div>
          <div className='book-title'>{book.title}</div>
          {book.authors &&
            book.authors.map(author => (
              <div key={author} className='book-authors'>
                {author}
              </div>
            ))}
        </div>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdateBookShelf: (book, shelf) => dispatch(handleUpdateBookShelf(book,shelf))
  }
}

export default connect(null, mapDispatchToProps)(Book)
