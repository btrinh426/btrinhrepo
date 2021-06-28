import React from "react";
import CarsList from "./carslist";

class Cars extends React.Component {
    state = [
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
    ]




    render() {
        return <CarsList cars={this.state}></CarsList>;
    }

}

export default Cars;