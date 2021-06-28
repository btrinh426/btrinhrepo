import React from "react";

const TechCompaniesCard = (props) => {
  const oneTechCompany = props.techCompany;

  const onDeleteTechCompaniesClick = (e) => {
    e.preventDefault();
    props.onDeleteTechCompaniesClick(oneTechCompany.id);
  };
  const handleEdit = () => {
    props.handleEditClick(oneTechCompany);
  };

  console.log(oneTechCompany);

  return (
    <div className="card" style={{ width: "300px" }}>
      <img
        className="card-img-top"
        src={oneTechCompany?.images?.[0].imageUrl}
        alt="Card cap"
      />
      <div className="card-body">
        <h5 className="card-title">{oneTechCompany.name}</h5>
        <p className="card-text">{oneTechCompany.profile}</p>
        {/* <p className="card-text"> {oneJob.techCompany.name}</p>
        do I need line 25 for tech co, because it refers to jobs? */}
      </div>
      <div className="card-footer">
        <button
          id="edit"
          className="btn btn-primary edit"
          onClick={handleEdit}
          href="button"
          //className="btn btn-primary"
        >
          Edit
        </button>
        <button
          id="delete"
          className="btn btn-primary delete"
          onClick={onDeleteTechCompaniesClick}
          href="button"
          //className="btn btn-primary"
        >
          Delete
        </button>
        <a href="https://www.google.com" className="btn btn-primary">
          View More
        </a>
      </div>
    </div>
  );
};

export default TechCompaniesCard;
