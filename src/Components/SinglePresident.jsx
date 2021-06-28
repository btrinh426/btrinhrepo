import React from "react"

function SinglePresident(props) {

    const onePresident = props.president;
    const onPresClickFull = function () {
        props.onClick(onePresident);
    };

    return (
        <div className="card col-md-3">
            <img src={onePresident.avatar} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{onePresident.nm}</h5>
                <p className="card-text">
                    <strong>{onePresident.pp}</strong>
Some quick example text to build on the card title and make up the bulk of the card's content.
</p>
                <button className=""
                    onClick={onPresClickFull}
                    data-pres-id={onePresident.id}>
                    Go somewhere</button>
            </div>
        </div>
    );
}



export default React.memo(SinglePresident);