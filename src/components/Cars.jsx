import React from "react";
import SingleCar from "./SingleCar";

class Cars extends React.Component {

    state = {
        cars: [
            {
                id: 1,
                make: "Kia",
                model: "Sorento",
                year: 2020
            },
            {
                id: 2,
                make: "Kia",
                model: "Optima",
                year: 2019
            },
            {
                id: 3,
                make: "Tesla",
                model: "Model 3",
                year: 2021
            },
            {
                id: 4,
                make: "Honda",
                model: "Civic",
                year: 2019
            },
            {
                id: 5,
                make: "Honda",
                model: "Accord",
                year: 2018
            },
            {
                id: 6,
                make: "Volkswagen",
                model: "Jetta",
                year: 2021
            },
            {
                id: 7,
                make: "Toyota",
                model: "Camry",
                year: 2021
            },
            {
                id: 8,
                make: "Ford",
                model: "Mustang",
                year: 2019
            },
            {
                id: 9,
                make: "Ford",
                model: "F-150",
                year: 2019
            },
            {
                id: 10,
                make: "Toyota",
                model: "Camry",
                year: 2020
            },
            {
                id: 11,
                make: "Ford",
                model: "F-150",
                year: 2021
            }
        ]
    };


    mapCar = (oneCar) => {
        return (
            <React.Fragment key={`Cars-${oneCar.id}`}>
                <SingleCar car={oneCar}></SingleCar>

            </React.Fragment>
        )
    }

    onShowClick = (e) => {
        e.preventDefault();
        console.log("show cars button works");

    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                <div>
                    <h1>Cars</h1>
                </div>
                <div>
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.onShowClick} > Show Cars</button>
                </div>
                <div className="row">
                    {this.state.cars.map(this.mapCar)}
                </div>
            </div>
        )
    }
}

export default Cars;
