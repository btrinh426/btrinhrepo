import React, { Component } from "react";
import SingleCar from './SingleCar';
import { Button } from 'reactstrap';
class Cars extends Component {
    state = {
        carData: 
        [
            {
                make: "Kia",
                model: "Sorento",
                year: 2020
            },
            {
                make: "Kia",
                model: "Optima",
                year: 2019
            },
            {
                make: "Tesla",
                model: "Model 3",
                year: 2021
            },
            {
                make: "Honda",
                model: "Civic",
                year: 2019
            },
            {
                make: "Honda",
                model: "Accord",
                year: 2018
            },
            {
                make: "Volkswagen",
                model: "Jetta",
                year: 2021
            },
            {
                make: "Toyota",
                model: "Camry",
                year: 2021
            },
            {
                make: "Ford",
                model: "Mustang",
                year: 2019
            },
            {
                make: "Ford",
                model: "F-150",
                year: 2019
            },
            {
                make: "Toyota",
                model: "Camry",
                year: 2020
            },
            {
                make: "Ford",
                model: "F-150",
                year: 2021
            }
        ],
        isToggledOff: false
    };
     mapCars = () => {
         return (this.state.carData.map(oneCar => {
            return (
                <div key={oneCar.id} className="card col-md-3 m-1">
                    <div className="card-body">
                        <h5 className="card-title">{oneCar.make}</h5>
                        <h5 className="card-text">{oneCar.model}</h5>
                        <h5 className="card-text">{oneCar.year}</h5>
                    </div>
                </div>
            )
            }))}
    render() {
        return (
            <React.Fragment>
                <div>{this.mapCars()}</div>
                <Button className="btn btn-primary" onClick={this.onShowClick}>Show/Hide</Button>
            </React.Fragment>
        );
    };
};
export default Cars;