// import { Carousel } from "bootstrap"
import React from "react"
import CarsTemp from "./CarsTemp"

class Cars extends React.Component {


    state = {
        cars: [
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
        isShowing: false
    }

    // componentDidMount() {
    //     if (this.state.isShowing === true) {
    //         this.setState((prevState) => {
    //             return { mappedCars: prevState.cars.map(this.mapCars) }
    //         })
    //     } else { return }

    // }

    mapCars = (oneCar) => <CarsTemp key={`Car-${oneCar.model}-${oneCar.year}`} car={oneCar}></CarsTemp>

    onShowCars = () => {
        this.setState({ isShowing: true })
        this.setState((prevState) => {
            return { mappedCars: prevState.cars.map(this.mapCars) }
        })
    }

    onHideCars = () => {
        this.setState(this.stateChanged)
    }

    onChangeHandler = () => {
        this.setState((prevState) => {
            return {}
        })
    }


    render() {


        return (
            <div className="container row col-md-12 p-5">
                <h1 className="col-md-6 p-5">Cars</h1>
                {this.state.isShowing ? (<button
                    className="btn btn-primary col-md-4 p-1"
                    onClick={this.onHideCars}>Hide Cars</button>
                ) : (<button
                    className="btn btn-primary col-md-4 p-1"
                    onClick={this.onShowCars}>Show Cars</button>
                    )}

                <select
                    className="form-select cold-md-4 p-1"
                    value={this.state.cars.year}
                    onChange={this.onChangeHandler}
                >
                    <option defaultValue>Show All</option>
                    <option value="1">2021</option>
                    <option value="2">2020</option>
                    <option value="3">2019</option>
                </select>
                <div className="row col-md-12">

                    {this.state.mappedCars}
                </div>
            </div>
        );
    };
};

export default Cars;