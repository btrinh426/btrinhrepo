import React, { Component } from "react";
import OneCarCard from "./OneCarCard";
// import OneFriendCard from "./OneFriendCard";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

class Cars extends Component {
    state = {
        myCars:
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
                    model: "F-150 ",
                    year: 2019
                },
                {
                    make: "Toyota",
                    model: "Corolla",
                    year: 2020
                },
                {
                    make: "Ford",
                    model: "F-150",
                    year: 2021
                }
            ],
        showMe: true
    }

    onShowButtonClicked = (e) => {
        console.log("you want to show cars")
        this.setState({
            showMe: !(this.state.showMe)
        })
    }

    mappedCars = () => {
        this.state.myCars.map(this.mapCar)
        console.log("mapped Cars")
        return this.mappedCars;
    }


    mapCar = (oneCar) => {
        return (
            <OneCarCard
                // key={}
                make={oneCar.make}
                model={oneCar.model}
                year={oneCar.year}
            />
        )
    }
    onChangeSelector = (e) => {
        console.log("something is changing")
        console.log(e.currentTarget.value)
    }



    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div
                    className="jumbotron jumbotron-fluid"
                    id="carsJumbo"
                >
                    <div className="container">
                        <h1
                            className="display-3"
                            style={{ color: "white" }}
                        ><strong>Your Cars</strong></h1>
                        <p
                            className="lead"
                            style={{ color: "white" }}
                        >
                            <strong id="listFriendsHeader">Below, a list of all your current Cars <NavLink to="/carFrom">Click here to add a New Car</NavLink></strong>
                        </p>

                    </div>
                </div>
                <div className="col-md-12 m-4">
                    <button
                        type="button"
                        className="btn btn-outline-info "
                        onClick={this.onShowButtonClicked}
                    >Show Cars</button>

                    <select
                        className="form-select ml-5 btn btn-outline-success"
                        aria-label="Default select example"
                        onChange={this.onChangeSelector}
                    >
                        <option selected value="noSelection">Select Year</option>
                        {/* reset state to map
                        set value to year */}
                        <option value="1">2021</option>
                        <option value="2">2020</option>
                        <option value="3">2019</option>
                    </select>

                    <hr />
                    <div className="row">
                        <h1>
                            {
                                this.state.showMe ?
                                    <div className="row">
                                        {this.state.myCars.map(this.mapCar)}
                                    </div>
                                    : null
                            }
                            {/* {this.mappedCars} */}


                        </h1>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Cars;

