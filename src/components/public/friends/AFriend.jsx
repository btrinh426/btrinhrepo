import React from "react";

function AFriend(props) {
  const oneFriend = props.friend;

  function onFrndDelClick(e) {
    props.onDelClick(oneFriend);
  }

  function onFrndEditClick(e) {
    props.onEditClick(oneFriend);
  }

  return (
    <div className="card col-3 mr-1 mb-1">
      <img
        className="card-img-top"
        src={oneFriend.primaryImage}
        alt={oneFriend.title}
      />
      <div className="card-body">
        <h5 className="card-title">{oneFriend.title}</h5>
        <h6 className="card-subtitle card-headline mb-2 text-muted">
          {oneFriend.headline}
        </h6>
        <h6 className="card-subtitle card-slug mb-2 text-muted" name="slug">
          {oneFriend.slug}
        </h6>
        <p className="card-text card-summary">{oneFriend.summary}</p>
        <p className="card-text card-bio">{oneFriend.bio}.</p>
        <h6 className="card-text">{oneFriend.skillsStrg}</h6>
        {/* <p className="card-text card-other">Other data here.</p> */}
        <button
          type="button"
          className="btn btn-dark btnFrndCardEdit"
          onClick={onFrndEditClick}
        >
          Edit...
        </button>
        <button
          type="button"
          className="btn btn-danger  btnFrndCardDelete"
          onClick={onFrndDelClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(AFriend);

// state = {
//   id: 7170,
//   bio: "victory over eagles",
//   title: "friend #22",
//   summary: "soars",
//   headline: "veracity",
//   entityTypeId: 1,
//   statusId: "Active",
//   slug: "swift",
//   skills: null,
//   primaryImage: "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg",
//     id: 6208,
//     entityId: 7170,
//     imageTypeId: "Main",
//     imageUrl:
//       "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg",
//   },
//   dateCreated: "2020-10-20T03:27:11.33",
//   dateModified: "2020-10-20T03:27:11.33",
// };
