import React from "react";

function SingleCompany(props) {
  const oneCompany = props.company;

  const onEditClickedFull = function () {
    props.onEditClick(oneCompany);
  };

  const onDeleteClickedFull = function () {
    props.onDeleteClick(oneCompany);
  };

  return (
    <div key={`TechCompanies-${oneCompany.slug}`} className="card col-md-3">
      <img src={oneCompany.imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{oneCompany.headline}</h5>
        <p className="card-text">{oneCompany.contactInformation}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onEditClickedFull}
          data-fr-id={oneCompany.slug}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onDeleteClickedFull}
          data-fr-id={oneCompany.slug}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleCompany);
