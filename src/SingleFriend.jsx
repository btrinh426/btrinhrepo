import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friends;

  function onDelPeople(e) {
    props.onDelete(oneFriend);
  }
  function editFriend() {
    props.onEdit(oneFriend);
  }
  return (
    <div className="col-sm-3" id="d-none" key={oneFriend.id}>
      <div className="card border-0 shadow" styple={{}}>
        <div
          className="card-body"
          style={{
            textAlign: "center",
            width: "100%",
            height: "24vw",
            objectfit: "cover",
          }}
        >
          <img
            src={oneFriend.image.imageUrl}
            className="card-img-top center"
            alt=""
            style={{ width: "150px", textAlign: "center" }}
          />
        </div>
        <hr />
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
          <div className="card-year text-black-50" id="type">
            Skills:
            {oneFriend.skills.map((name) => name.name).join(",")}
          </div>
          <div className="card-year text-black-50" id="type">
            {oneFriend.slug}
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
