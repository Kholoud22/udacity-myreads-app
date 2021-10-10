import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import MyBooks from "./Components/MyBooks";
import BookDetails from "./Components/BookDetails";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import BrowsedBooks from "./Components/BrowsedBooks";

class BooksApp extends Component {
  state = {
    books: []
  };
  moveShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    book.shelf = shelf;

    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat(book)
    }));
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <MyBooks books={this.state.books} moveShelf={this.moveShelf} />
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
                books={this.state.books}
                moveShelf={this.moveShelf}
              />
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
