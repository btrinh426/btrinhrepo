import React from "react";
import Car from "./Car";

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
        ],
        isHidden: false
    }

    componentDidMount() {
        this.setState((prevState) => {
            return { mappedCars: prevState.cars.map(this.mapCar) }
        })
    };

    mapCar = car => {
        return (<Car car={car} key={car.id} />)
    };

    toggleDisplayCars = () => {
        this.setState({ isHidden: !this.state.isHidden })
    };

    onFilterYear = (e) => {
        this.setState((prevState) => {
            return { carYear: prevState.cars.filter(car => car.year === e.target.value) }
        })
    };

    render() {

        return <div className="container" style={{ margin: "8rem" }}>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.toggleDisplayCars}
                    style={{ marginRight: "8px" }}>Show Cars</button>


                <select name="cars" id="cars" onChange={this.onFilterYear}>
                    <option value="year">Year</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                </select>

            </div>

            <div className="row" style={{ display: this.state.isHidden ? "block" : "none" }}>
                {this.state.mappedCars}
            </div>
        </div>
    }
};

export default Cars;