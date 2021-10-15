import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BooksAPI from "../BooksAPI";
import debounce from "lodash.debounce";
import { handleBrowseBooks } from '../actions/books';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
class browesdBooks extends Component {
  state = {
    browesdBooks: [],
    query: ""
  };

  // static propTypes = {
  //   //books: PropTypes.array.isRequired,
  //   //moveShelf: PropTypes.func.isRequired
  // };

  //componentDidMount() {
    // if (window.history.state.browesdBooks) {
    //   this.setState({
    //     browesdBooks: window.history.state.browesdBooks,
    //     query: window.history.state.query
    //   });
    //   let q = window.history.state.query;
    //   document.getElementById("input").value = q;
    // }
  //}

  browseBooks = debounce(async q => {
    let books = Object.values(this.props.books);
    let browesdBooks = [];

    if (q.trim()) {
      browesdBooks = await BooksAPI.search(q.trim());
      //this.props.handleBrowseBooks(q).then(boks => {
        //browesdBooks = this.props.browesdBooks;
        if (browesdBooks && !browesdBooks.error && browesdBooks.length) {
          browesdBooks = browesdBooks.map(b => {
            b.shelf = "none";
            let bookToBeUpdated = books.filter(book => book.id === b.id)[0];
            if (bookToBeUpdated) b = bookToBeUpdated;
            return b;
          });
        }
      //});  
    }
    
     this.setState(() => ({ browesdBooks: browesdBooks, query: q }));
    // window.history.replaceState(
    //   { browesdBooks: browesdBooks, query: q },
    //   "title"
    // );
  }, 1000);

  componentWillUnmount() {
    this.props.handleInitialData()
  }

  render() {
    const { browesdBooks } = this.state;

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
              // ref={input => (this.input = input)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          {browesdBooks && browesdBooks.length && !browesdBooks.error ? (
            <BookShelf books={browesdBooks} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ books }) => ({
  books,
})

const mapDispatchToProps = (dispatch) => {
  return {
    handleBrowseBooks: (query) => dispatch(handleBrowseBooks(query)),
    handleInitialData: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(browesdBooks)
