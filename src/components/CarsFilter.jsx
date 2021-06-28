import React from "react";
import CarsCard from "./CarsCard";

function CarsFilter(props) {
  let cars = props.filteredCars.map((car, item) => {
    console.log(car);
    return <CarsCard key={item} car={car} />;
  });

  return <div>{cars}</div>;
}

export default CarsFilter;
