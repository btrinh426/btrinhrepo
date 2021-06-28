import React from "react";

function SingleBook(props) {
  const books = props.book;
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={books.avatar} className="card-img-top" alt="..."></img>
      <div className="card-body">
        <h5 className="card-title">{books.title}</h5>
        <p className="card-text" name="summary">
          {books.author}
        </p>
      </div>
    </div>
  );
}
export default SingleBook;
