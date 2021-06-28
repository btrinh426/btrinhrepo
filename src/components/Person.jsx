import React from "react";

function SinglePers(props) {
  const person = props.person;
  const personInfo = {
    id: person.id,
    bio: person.bio,
    headline: person.headline,
    primaryImage: person.primaryImage.imageUrl,
    slug: person.slug,
    statusId: person.statusId,
    summary: person.summary,
    title: person.title,
  };
  const onDeleteClick = function () {
    props.onDeleteInfoClick(person);
  };
  const onEditClickFull = function () {
    props.onGetInfoClick(personInfo);
  };

  // console.log(person)
  // console.log("from function person")
  return (
    <div className="row-lg-5 col-lg-5 mx-auto mb-2">
      <div className="card">
        <img
          className="card-img-top"
          src={person.primaryImage.imageUrl}
          alt={`img-${person.id}`}
        />
        <div className="card-body">
          <h5 className="card-title">{person.title}</h5>
          <p className="card-text">{person.bio}</p>
          <hr />
          <div className="button-container row justify-content-between">
            <button
              className="btn btn-primary btn-sm"
              onClick={onEditClickFull}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm float-right"
              id={person.id}
              onClick={onDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SinglePers);
