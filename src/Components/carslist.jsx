import React from "react";

const CarsList = (props) => {
    const car = props.cars;
    debugger

    return <div className="card col-md-3 m-1">
        <div className="card-body">
            <h5 className="card-title">{ }</h5>
            <h5 className="card-text">{ }</h5>
            <h5 className="card-text">{ }</h5>
        </div>
    </div>
}

export default CarsList;