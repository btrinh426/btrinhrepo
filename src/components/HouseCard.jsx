import React from "react";

const HouseCard = (props) => {
  const oneHouse = props.house;

  const onDeleteHouseClick = (e) => {
    e.preventDefault();
    props.onDeleteHousesClick(oneHouse.id);
  };

  const handleEdit = () => {
    props.handleEditClick(oneHouse);
  };
  console.log(oneHouse);
  return (
    <div className="card" style={{ width: "300px" }}>
      <img
        className="card-img-top"
        //src={oneHouse?.primaryImage?.imageUrl}
        alt="Card cap"
      />
      <div className="card-body">
        <h5 className="card-title">{oneHouse.address}</h5>
        <p className="card-text"> {oneHouse.state}</p>
        <a href="https://www.google.com" className="btn btn-primary">
          Map It!
        </a>
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
          onClick={onDeleteHouseClick}
          href="button"
          //className="btn btn-primary"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default HouseCard;
