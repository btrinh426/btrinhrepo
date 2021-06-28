import React from "react";
import CarCard from "./CarCard";

class Cars extends React.Component {
  state = {
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
    showMe: true,
  };

  componentDidMount() {
    this.setState(() => {
      return {
        mappedCars: this.state.cars.map(this.mapCars),
      };
    });
  }

  onToggleList = () => {
    console.log("toggle button is firing");

    this.setState({
      showMe: !this.state.showMe,
    });
  };

  onShow2019 = () => {
    console.log("2019 button is working");

    const year = this.state.cars.filter(function (time) {
      if (time.year === 2019) {
        return true;
      }

      return false;
    });
  };

  onShow2020 = () => {
    console.log("2020 button is working");
  };

  onShow2021 = () => {
    console.log("2021 button is working");
  };

  mapCars = (oneCar, index) => {
    return <CarCard key={index} car={oneCar}></CarCard>;
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Cars</h1>
        <hr />
        {this.state.showMe ? (
          <div className="row">{this.state.mappedCars}</div>
        ) : null}
        <button onClick={this.onToggleList}>Show Cars</button>
        <button onClick={this.onShow2019}>2019</button>
        <button onClick={this.onShow2020}> 2020</button>
        <button onClick={this.onShow2021}>2021</button>
      </div>
    );
  }
}

export default Cars;
