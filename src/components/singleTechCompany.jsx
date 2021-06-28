import React from "react";

function SingleTechCompany(props) {
  const oneCompany = props.tcData;

  const onRequestEdit = function (e) {
    e.preventDefault();
    props.onEditRequested(oneCompany);
  };

  return (
    <div className="card col-md-4">
      <img src={oneCompany.imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{oneCompany.title}</h5>
        <strong>{oneCompany.slug}</strong>
        <p className="card-text">{oneCompany.bio}</p>
        <button
          className="btn btn-primary"
          onClick={onRequestEdit}
          data-tc-id={oneCompany.id}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleTechCompany);
