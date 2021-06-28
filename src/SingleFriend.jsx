import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friends;

  function onDelPeople(e) {
    props.onDelete(e);
  }
  function editFriend() {
    props.onEdit(oneFriend);
  }
  return (
    <div className="col-sm-3" id="d-none" key={oneFriend.id}>
      <div className="card border-0 shadow" key={oneFriend.id}>
        <img
          src={oneFriend.primaryImage.imageUrl}
          className="card-img-top"
          alt=""
        />
        <div className="card-body text-center">
          <h5 className="card-title mb-0" id="name">
            {oneFriend.title}
          </h5>
          {/* <div className="card-genre text-black-50" id="location">
      {oneFriend.bio}
    </div> */}
          <div className="card-year text-black-50 " id="type">
            {oneFriend.summary.slice(0, 100) + "..."}
          </div>

          <div className="card-year text-black-50 d-none" id="type">
            {oneFriend.headline}
          </div>
          <div className="card-year text-black-50 d-none" id="type">
            {oneFriend.slug}
          </div>
          <div className="card-year text-black-50 d-none" id="type">
            {oneFriend.id}
          </div>
          <button
            key={oneFriend.id}
            style={{ float: "right" }}
            type="button"
            className="btn btn-danger deleteSchool mt-2"
            name={oneFriend.id}
            onClick={onDelPeople}
          >
            Delete
          </button>
          <button
            style={{ float: "left" }}
            type="button"
            className="btn btn-danger editSchool mt-2"
            name={oneFriend.id}
            name1={oneFriend.title}
            onClick={editFriend}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
