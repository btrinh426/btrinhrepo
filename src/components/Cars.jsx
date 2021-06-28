import React from "react";
import CarsSingle from "./CarsSingle";

class Cars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: [
        {
          make: "Kia",
          model: "Sorento",
          year: 2020,
        },
        {
          make: "Kia",
          model: "Optima",
          year: 2019,
        },
        {
          make: "Tesla",
          model: "Model 3",
          year: 2021,
        },
        {
          make: "Honda",
          model: "Civic",
          year: 2019,
        },
        {
          make: "Honda",
          model: "Accord",
          year: 2018,
        },
        {
          make: "Volkswagen",
          model: "Jetta",
          year: 2021,
        },
        {
          make: "Toyota",
          model: "Camry",
          year: 2021,
        },
        {
          make: "Ford",
          model: "Mustang",
          year: 2019,
        },
        {
          make: "Ford",
          model: "F-150",
          year: 2019,
        },
        {
          make: "Toyota",
          model: "Camry",
          year: 2020,
        },
        {
          make: "Ford",
          model: "F-150",
          year: 2021,
        },
      ],
    };
  }

  componentDidMount() {
    let carsArray = this.state.cars; // vanilla js cars array
    console.log(carsArray);
    this.setState(() => {
      return {
        cars: carsArray, //returned js cars array
        mappedCars: carsArray.map(this.mapCar), // component
      };
    });
  }

  mapCar = (oneCar) => {
    console.log(oneCar);
    return (
      <React.Fragment key={`Cars-${oneCar.id}`}>
        <CarsSingle
          {...this.props}
          car={oneCar} // job prop passed to child CarsSingle (tells parent how it wants data)
          onShowCarsRequested={this.onShowCars}
        ></CarsSingle>
      </React.Fragment>
    );
  };

  onShowClicked = (e) => {
    
    console.log("on Show or Hide clicked, currentTarget:", e.currentTarget)
    //mappedCars: carsArray.map(this.mapCar);

  };

  render() {
    return (
      <React.Fragment>
        <div>Test</div>
        <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <div className="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select className="form-control" >
      <option>2021</option>
      <option>2020</option>
      <option>2019</option>
      
    </select>
  </div>

  </div>
</div>

        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="submit"
          onClick={this.onShowClicked}
        >
          Show Cars
        </button>
      </React.Fragment>
    );
  }
}

export default Cars;
