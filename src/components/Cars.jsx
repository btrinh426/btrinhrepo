import React from "react";

import Car from "./SingleCar";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Hide Cars",
      display: true,
      showMenu: false,
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

  componentDidUpdate = (prevState) => {
    console.log("updating");
    if (this.state.year === "") {
      return;
    } else if (this.state.year === "2021") {
      console.log("2021");
    } else if (this.state.year === "2020") {
      console.log("2020");
    } else console.log("2019");
  };

  mapCar = (car) => {
    return (
      <React.Fragment key={`Car-${car.model + car.year}`}>
        <Car car={car} />
      </React.Fragment>
    );
  };

  buttonClick = (e) => {
    e.preventDefault();
    if (this.state.buttonText === "Show Cars") {
      this.setState({ buttonText: "Hide Cars", display: true });
    } else {
      this.setState({ buttonText: "Show Cars", display: false });
    }
  };

  showMenu = (e) => {
    e.preventDefault();
    if (this.state.showMenu === false) {
      this.setState({ showMenu: true });
    } else {
      this.setState({ showMenu: false });
    }
  };

  setYear = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let currentYear = currentTarget.value;
    this.setState(() => {
      let year = { ...this.state.year };
      year = currentYear;
      return { year };
    });
  };

  filterCar = (car) => {
    if (this.state.year !== "") {
      return car.year === Number(this.state.year);
    } else {
      return car;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <div className="row">
            <div className="col-md-12">
              <div style={{ padding: 20 }}>
                <h1>Cars</h1>
              </div>
              <button
                className="btn btn-primary m-3"
                onClick={this.buttonClick}
              >
                {this.state.buttonText}
              </button>
              <Dropdown isOpen={this.state.showMenu} toggle={this.showMenu}>
                <DropdownToggle onClick={this.setYear} value="" caret>
                  Select Year
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.setYear} value="2021">
                    2021
                  </DropdownItem>
                  <DropdownItem onClick={this.setYear} value="2020">
                    2020
                  </DropdownItem>
                  <DropdownItem onClick={this.setYear} value="2019">
                    2019
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <div className="row justify-content-center">
                {this.state.display &&
                  this.state.cars.filter(this.filterCar).map(this.mapCar)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cars;
