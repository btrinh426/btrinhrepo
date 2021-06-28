import React from "react";

function CarsSearch(props) {
  return (
    <div>
      <input onChange={props.handleInput} type="text" />
    </div>
  );
}

export default CarsSearch;
