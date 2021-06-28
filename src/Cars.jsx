import React from "react";
import SingleCar from "./SingleCar";
import DropDown from "./DropDown";

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [
        {
          id: 1,
          make: "Kia",
          model: "Sorento",
          year: 2020,
          // selected: false,
          //key: "cars",
        },
        {
          id: 2,
          make: "Kia",
          model: "Optima",
          year: 2019,
        },
        {
          id: 3,
          make: "Tesla",
          model: "Model 3",
          year: 2021,
        },
        {
          id: 4,
          make: "Honda",
          model: "Civic",
          year: 2019,
        },
        {
          id: 5,
          make: "Honda",
          model: "Accord",
          year: 2018,
        },
        {
          id: 6,
          make: "Volkswagen",
          model: "Jetta",
          year: 2021,
        },
        {
          id: 7,
          make: "Toyota",
          model: "Camry",
          year: 2021,
        },
        {
          id: 8,
          make: "Ford",
          model: "Mustang",
          year: 2019,
        },
        {
          id: 9,
          make: "Ford",
          model: "F-150",
          year: 2019,
        },
        {
          id: 10,
          make: "Toyota",
          model: "Camry",
          year: 2020,
        },
        {
          id: 11,
          make: "Ford",
          model: "F-150",
          year: 2021,
        },
      ],
    };
  }

  componentDidMount() {
    if (this.state) {
      console.log(this.state.cars);
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    // this.componentDidMount();

    this.setState((prevState) => {
      return {
        mappedCars: this.state.cars.map(this.mapCar),
      };
    });
  };

  //   submitYear2021 = (e) => {
  //     e.preventDefault();
  //     console.log();

  //     this.setState((prevState) => {
  //       return {
  //         filteredCars: this.state.cars.filter(this.filterCars2021),
  //       };
  //     });
  //   };

  submitYear2020 = (e) => {
    e.preventDefault();
  };

  submitYear2019 = (e) => {
    e.preventDefault();
  };

  mapCar = (oneCar) => {
    return <SingleCar key={oneCar.id} car={oneCar} />;
  };

  filterCars2021 = (oneCar) => {
    this.setState((prevState) => {
      const indexOfCar = this.state.cars.findIndex(
        (oneCar) => oneCar.year === 2021
      );
      console.log(indexOfCar);

      //   if (oneCar.year === 2021) {
      //     return {
      //       filteredCars: this.state.cars.map(this.mapCar),
      //     };
      //   }

      const oldCars = [...this.state.cars];
      if (indexOfCar) {
        const updatedCars = oldCars.splice(indexOfCar);
        console.log(this.indexOfCar);

        return {
          filteredCars: updatedCars.map(this.mapCar),
        };

        // return updatedCars, (<SingleCar key={oneCar.id} car={oneCar} />);

        // console.log({ mappedCars: updatedCars });
      }
    });
  };

  render() {
    return (
      <>
        <form className="form-inline my-2 my-lg-0">
          {/* <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.title}
            name="title"
            id="title"
          /> */}
          <button
            onClick={this.submitForm}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Show Cars
          </button>
          <button
            onClick={this.filterCars2021}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            2021 Cars
          </button>
          <button
            onClick={this.submitYear2020}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            2020 Cars
          </button>
          <button
            onClick={this.submitYear2019}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            2019 Cars
          </button>
        </form>

        <div className="col-md-12 p-5">
          <h1>Cars List</h1>
        </div>
        <div className="row">{this.state.mappedCars}</div>
      </>
    );
  }
}

export default Cars;
