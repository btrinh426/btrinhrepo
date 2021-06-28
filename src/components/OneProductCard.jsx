import React from "react";


const OneProductCard = (props) => {


    return (
        <div key={props.id} className="card col-md-2 m-4">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p style={{ color: "green" }}>Id: {props.id}</p>
                <strong>{props.manufacturer}</strong>
                <p style={{ color: "blue" }} className="card-text">{props.description}</p>
                {/* <p style={{ color: "green" }}>Price: {props.cost}, Id: {props.id}</p> */}
                <div>
                    <button
                        className="btn btn-danger m-1"
                        onClick={props.onDeleteButtonClicked}
                        //use this data-whatever to pass info to parent
                        data-product-id={props.id}
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-info m-1"
                    >
                        Edit
                    </button>

                </div>
            </div>
        </div >
    )
}



export default OneProductCard;