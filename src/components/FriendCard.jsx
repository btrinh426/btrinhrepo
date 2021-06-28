import React from "react";

let FriendCard = ({ friend }) => {
  return (
    <>
      <div className="card">
        <img className="card-img-top" src={friend.src} alt={friend.title} />
        <div className="card-body">
          <h5 className="card-title">{friend.title}</h5>
          <p className="card-text">
            <strong>{friend.bio}</strong>... Lorem Ipsum Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, {friend.id} eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo.
          </p>
          <p className="card-text">
            <small className="text-muted">{friend.headline}</small>
          </p>
          <footer className="card-footer">
            <button class="btn btn-primary">Edit</button>
            <button class="btn btn-outline-danger">Delete</button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default FriendCard;
