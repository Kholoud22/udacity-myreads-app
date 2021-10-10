import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import MyBooks from "./Components/MyBooks";
import BookDetails from "./Components/BookDetails";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import BrowsedBooks from "./Components/BrowsedBooks";
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared'
import LoadingBar from 'react-redux-loading'
import { handleUpdateBookShelf } from './actions/books'
class BooksApp extends Component {

  moveShelf = (book, shelf) => {
    this.props.handleUpdateBookShelf(book,shelf);
  };

  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <MyBooks books= {Object.values(this.props.books)} moveShelf={this.moveShelf} />
            )}
          ></Route>
          <Route
            exact
            path='/details/:id'
            render={() => <BookDetails moveShelf={this.moveShelf} />}
          ></Route>
          <Route
            exact
            path='/search'
            render={() => (
              <BrowsedBooks
                books={this.props.books}
                moveShelf={this.moveShelf}
              />
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = ({ books }) => ({
  books
})

const mapDispatchToProps = (dispatch) => {
  return {
    handleInitialData: () => dispatch(handleInitialData()),
    handleUpdateBookShelf: (book, shelf) => dispatch(handleUpdateBookShelf(book,shelf))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksApp)
