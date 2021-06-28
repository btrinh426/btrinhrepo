import React from "react";

const OneCardCard = (props) => {
    return (
        <div className="card col-md-3 m-1">
            <div className="card-body">
                <h5 className="card-title">{props.make}</h5>
                <h5 className="card-text">{props.model}</h5>
                <h5 className="card-text">{props.year}</h5>
                <h5 className="card-text">{props.key}</h5>


            </div>
        </div>
    )
}


export default React.memo(OneCardCard);