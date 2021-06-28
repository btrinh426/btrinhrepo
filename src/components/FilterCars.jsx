import React from "react"


const FilterCars = props =>{

return(
    <div className="dropdown">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown button
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a className="dropdown-item" href="cars">2021</a>
      <a className="dropdown-item" href="cars">2020</a>
     <a className="dropdown-item" href="cars">2019</a> 

      
      
    </div>
  </div>
  

    
)
}

export default FilterCars