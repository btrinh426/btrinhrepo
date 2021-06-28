import React from "react";

function SingleFriend(props) {
  const singleFriend = props.friend;

  const updateProfile = () => {
    props.onUpdateClick(singleFriend);
  };

  const deleteProfile = () => {
    props.onDeleteClick(singleFriend);
  };
  let cardStyle = {
    width: "100%",
    height: "30vh",
    objectFit: "cover",
  };
  return (
    <div className="col-sm">
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          style={cardStyle}
          src={singleFriend.primaryImage.imageUrl}
          alt="Friend needs Pic"
        />
        <div className="card-body">
          <h5 className="card-title">{singleFriend.name}</h5>
          <p className="card-text">{singleFriend.summary}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item pt-2 pb-2">{singleFriend.headline}</li>
          <li className="list-group-item pt-2 pb-2">{singleFriend.bio}</li>
          <li className="list-group-item pt-2 pb-2">
            {singleFriend.skills !== null &&
              singleFriend.skills.map((item) => item.name).join(", ")}
            {singleFriend.skills === null && "No Skills"}
          </li>
        </ul>
        <div className="card-body">
          <button
            className="btn btn-info updateProfile mr-2"
            onClick={updateProfile}
            data-friend-id={singleFriend.id}
          >
            Edit
          </button>
          <button
            className="btn btn-info deleteProfile"
            onClick={deleteProfile}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
