import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friend;

  function onEditClicked(e) {
    e.preventDefault();
    console.log(e);
    props.onEditClick(oneFriend, e);
  }

  function onDeleteClicked(e) {
    props.onDeleteClick(oneFriend, e);
  }

  return (
    <div className="card-friends col-md-3">
      {/* <div id="carouselControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src={oneFriend.primaryImage.imageUrl}
              alt="Friend Avatar"
            />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="..." alt="Second slide" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="..." alt="Third slide" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div> */}

      <img
        className="card-img-top"
        src={oneFriend.primaryImage.imageUrl}
        alt="Friend Avatar"
      />
      <div className="card-body">
        <h5 className="card-title">{oneFriend.title}</h5>
        <p className="card-text">{oneFriend.summary}</p>
        <button
          className="btn btn-secondary btn-lg"
          id={oneFriend.id}
          onClick={onEditClicked}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-lg"
          id={oneFriend.id}
          onClick={onDeleteClicked}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default SingleFriend;
