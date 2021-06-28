import React from "react";

function SingleCar(props) {
  const oneCar = props.car;

  return (
    <div className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">{oneCar.make}</h5>
        <h5 className="card-text">{oneCar.model}</h5>
        <h5 className="card-text">{oneCar.year}</h5>
      </div>
    </div>
    // <div className="card col-md-3">
    //   <img
    //     className="card-img-top"
    //     src={oneCar.techCompany.images[0].imageUrl}
    //     alt="..."
    //   />
    //   <div className="card-body">
    //     <h5 className="card-title">{oneCar.title}</h5>
    //     <p className="card-text">
    //       Salary: ${oneCar.pay.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    //     </p>
    //     <p className="card-text">
    //       Skills: {oneCar.skills.map(mapSkills).join(", ")}
    //     </p>
    /* <button
          className="btn btn-primary link-button"
          onClick={onEditClicked}
          data-friend-id={oneCar.id}
        >
          Edit
        </button>
        <button
          className="btn btn-primary link-button deleteBtn"
          onClick={onDeleteClicked}
          data-friend-id={oneCar.id}
        >
          Delete
        </button>
      </div> */
  );
}

export default React.memo(SingleCar);
