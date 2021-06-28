import React from "react";
import SingleBook from "./SingleBook";

class Books extends React.Component {
  state = {
    books: [
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        avatar:
          "https://www.slorep.org/wp-content/uploads/2018/09/PrideAndPrejudice-WebsitePoster.jpg",
        id: 1,
      },
      {
        title: "Farenheit 451",
        author: "Ray Bradbury",
        avatar:
          "https://images-na.ssl-images-amazon.com/images/I/71OFqSRFDgL.jpg",
        id: 2,
      },
      {
        title: "Harry Potter",
        author: "J.K. Rowling",
        avatar:
          "https://images-na.ssl-images-amazon.com/images/I/91TfTh2kjNL.jpg",
        id: 3,
      },
      {
        title: "Coraline",
        author: "Neil Gaiman",
        avatar:
          "http://prodimage.images-bn.com/pimages/9780380807345_p0_v4_s1200x630.jpg",
        id: 4,
      },
    ],
  };

  mapBooks = (book) => {
    return <SingleBook key={`Books-${book.id}`} book={book}></SingleBook>;
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <h1>BOOKS</h1>
        </div>

        <div>{this.state.books.map(this.mapBooks)}</div>
      </React.Fragment>
    );
  }
}
export default Books;
