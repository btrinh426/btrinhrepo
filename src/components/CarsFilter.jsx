import React from "react";
import CarsCard from "./CarsCard";

function CarsFilter(props) {
  let cars = props.filteredCars.map((cars, item) => {
    return <CarsCard key={item} year={cars.year} />;
  });

  return { cars };
}

export default CarsFilter;
