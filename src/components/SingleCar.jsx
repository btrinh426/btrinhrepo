import React from "react"

function SingleCar(props) {
    console.log("props passed to SingleCar.jsx:",props)

    const oneCar = props.car;


    const onEditClick = function () {
        props.onClick(oneCar);
    };

    // const onDeleteClick = function () {
    //     props.onDeleteRequested(oneCar)
    // }

    
    return (
        <div className="card col-sm-3" >
                    <div className="card-body">
                        <h5 className="card-title">{oneCar.make}</h5>
                    </div>
                    <p>
                        {oneCar.model}
                    </p>
                    <p>
                        {oneCar.year}
                    </p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={onEditClick} data-friend-id={oneCar.id}>Edit</button>
                    <button type="button" className="btn btn-danger btn-sm">Delete</button>
                </div>

    )
}


export default React.memo(SingleCar);