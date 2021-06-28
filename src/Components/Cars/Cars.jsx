import React from "react";
import DisplayCars from "./DisplayCars";
import "./CarStyles/cars.scss";
import shortid from "shortid";

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
        carCards: [],
        hideCars: false,
        buttonDisplay: "Show Cars",
        selectedYear: "Show All",
        toggleSelect: false,
    };

    componentDidUpdate() {}
    onShowCars = e => {
        //console.log(e.currentTarget.name);
        let button = e.currentTarget.name;
        if (button === "Show Cars") {
            this.setState(prevProps => {
                const mappedCars = this.state.cars.map(this.carMap);
                let newState = { ...prevProps };
                newState.carCards = mappedCars;
                newState.buttonDisplay = "Hide Cars";
                newState.hideCars = false;
                newState.toggleSelect = true;

                return newState;
            });
        } else if (button === "Hide Cars") {
            this.setState({
                hideCars: true,
                buttonDisplay: "Show Cars",
                toggleSelect: false,
            });
        }
    };

    carMap = aCar => {
        let key = shortid.generate();
        //console.log(key);
        let carCard = <DisplayCars key={key + " " + aCar.year} car={aCar} />;
        return carCard;
    };

    handleSelect = e => {
        let selection = e.currentTarget.value;
        console.log(selection);
        if (selection === "Show All") {
            let showAllCars = this.state.cars.map(this.carMap);
            this.setState({ carCards: showAllCars, selectedYear: "Show ALl" });
        } else {
            let curentCards = this.state.cars.map(this.carMap);
            let filteredCars = curentCards.filter(aCar => {
                let result = false;
                let carKey = aCar.key.slice(-4);

                if (selection === carKey) {
                    result = true;
                }
                return result;
            });
            console.log(filteredCars);
            this.setState({
                carCards: filteredCars,
                selectedYear: `${selection}`,
            });
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="flex-row top">
                    <h1 className="car-welcome">Welcome to our Car Lot</h1>
                </div>
                <div className="row d-flex mid">
                    <span>Click to see our wonderful selection of cars!!</span>
                    <button
                        type="button"
                        className="btn btn-outline-secondary click-me"
                        name={this.state.buttonDisplay}
                        onClick={this.onShowCars}
                    >
                        {this.state.buttonDisplay}
                    </button>
                </div>
                {this.state.toggleSelect && (
                    <>
                        {" "}
                        <span className="dropMenu">Filter by Year</span>
                        <select
                            className="dropMenu"
                            value={this.state.selectedYear}
                            onChange={this.handleSelect}
                        >
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="Show All">Show All</option>
                        </select>
                    </>
                )}
                <div className="row card-row">
                    {!this.state.hideCars && this.state.carCards}
                </div>
            </div>
        );
    }
}

export default Cars;
