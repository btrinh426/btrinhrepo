import React from "react";

function CarsTemplate(props)
{
    const oneCar =props.currentCar

    const onCarFilter = function(){
        props.onClick(oneCar)
    }
    return (

        <React.Fragment key={`CarsList-${oneCar.id}`}>
        


            <div className="card col-md-3 m-1"
    style={{ margin:"",borderRadius:"2%",boxShadow:"2px -1px 3px #ccc"}}>

<div className="card-body" style={{fontSize:".8em"}}>
 <h5 className="card-title" style={{textAlign:"center"}}>{oneCar.make}</h5>
 <hr style={{backgroundColor:"plum"}}></hr>
 {oneCar.model}
 <p></p>
 <span className="card-text">
 {oneCar.year}
 </span>
</div>

</div>    
    </React.Fragment>

    )
}

// export default CarsTemplate
export default React.memo(CarsTemplate);