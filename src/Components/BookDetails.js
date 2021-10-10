import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";
import * as BooksAPI from "../BooksAPI";
class BookDetails extends React.Component {
  state = {
    book: {}
  };
  static propTypes = {
    moveShelf: PropTypes.func.isRequired
  };

  async componentDidMount() {
    let locationArr = window.location.pathname.split("/");
    let id = locationArr[locationArr.length - 1];
    const book = await BooksAPI.get(id);
    this.setState({ book });
  }

  goBack() {
    window.history.back();
  }
  render() {
    const { moveShelf } = this.props;
    const { book } = this.state;
    return (
      <div>
        <div>
          <button
            onClick={this.goBack}
            className='close-search'
            style={{ backgroundColor: "transparent", marginLeft: 25 }}
          >
            Close
          </button>
        </div>
        <div className='container'>
          <div className='book-description'>
            <div>Description</div>
            <div className='book-authors'>{book.description}</div>
          </div>
          <div style={{ marginLeft: 10 }}>
            <Book canUpdateShelf={false} book={book} moveShelf={moveShelf} />
            <div style={{ marginRight: 50 }}></div>
          </div>
        </div>
      </div>
    );
  }
}
export default BookDetails;
