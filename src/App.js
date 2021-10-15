import React, { Component } from "react";
import MyBooks from "./Components/MyBooks";
import BookDetails from "./Components/BookDetails";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import BrowsedBooks from "./Components/BrowsedBooks";
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared'
class BooksApp extends Component {

  // moveShelf = (book, shelf) => {
  //   this.props.handleUpdateBookShelf(book,shelf);
  // };

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
              <MyBooks />
            )}
          ></Route>
          <Route
            exact
            path='/details/:id'
            render={() => <BookDetails />}
          ></Route>
          <Route
            exact
            path='/search'
            render={() => (
              <BrowsedBooks />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksApp)
