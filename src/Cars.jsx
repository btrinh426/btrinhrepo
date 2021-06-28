import React from "react";
import Car from "./Car-Single";
import { toast, ToastContainer } from "react-toastify";

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
    buttonTitle: "Show Cars",
  };

  componentDidMount() {}

  mapCars = (car, key) => {
    return <Car key={key} car={car}></Car>;
  };

  onShowCars = () => {
    if (this.state.show) {
      this.setState((prevState) => {
        return {
          ...prevState,
          cars: prevState.cars,
          show: false,
          buttonTitle: "Show Cars",
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          mappedCars: prevState.cars.map(this.mapCars),
          show: true,
          value: "showAll",
          buttonTitle: "Hide Cars",
        };
      });
      toast.info("Showing Cars!");
    }
  };

  onYearSelect = (e) => {
    console.log(e.currentTarget.value);
    let year = e.currentTarget.value;
    this.setState((prevState) => {
      console.log(year, prevState.mappedCars);
      let carsByYear = prevState.cars.map(this.mapCars);
      return {
        ...prevState,
        mappedCars: carsByYear.filter((car) => car.props.car.year == year),
        value: year,
      };
    });
  };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <ToastContainer></ToastContainer>
        <div className="row pb-5 text-center">
          <h1 className="col-12">Cars</h1>
          <div className="col-12 text-center pt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onShowCars}
            >
              {this.state.buttonTitle}
            </button>
            <div className="mt-2">
              <select
                name="cars"
                value={this.state.value}
                onChange={this.onYearSelect}
                id="cars"
              >
                <option value="showAll">Show All</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">{this.state.show && this.state.mappedCars}</div>
      </div>
    );
  }
}

export default Cars;
