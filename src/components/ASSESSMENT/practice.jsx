import React from "react"
import PracticeCard from "./practiceCard"

class Practice extends React.Component {
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
		showCars: false,
	}

	componentDidMount() {
		this.setState(() => {
			return {
				mappedCars: this.state.cars.map(this.mapCar),
			}
		})
	}

	mapCar = (car) => <PracticeCard car={car} key={car.year + car.model} />
	handleButton = () => {
		this.setState((prevState) => {
			return {
				...prevState,
				// eslint-disable-next-line eqeqeq
				showCars: this.state.showCars == false ? true : false,
			}
		})
	}

	dropdownHandle = (e) => {
		this.setState({
			filteredCars:
				e.target.value === "all"
					? this.state.mappedCars
					: this.state.cars
							// eslint-disable-next-line eqeqeq
							.filter((car) => car.year == e.target.value)
							.map(this.mapCar),
		})
	}
	render() {
		return (
			<>
				<button onClick={this.handleButton} className={"btn btn-primary"}>
					Toggle Cars
				</button>
				<div
					style={{ display: this.state.showCars === false ? "none" : "block" }}
				>
					<select onChange={this.dropdownHandle}>
						<option value="all">--Choose a Year--</option>
						<option value="2021">2021</option>
						<option value="2020">2020</option>
						<option value="2019">2019</option>
					</select>
					{!this.state.filteredCars
						? this.state.mappedCars
						: this.state.filteredCars}
				</div>
			</>
		)
	}
}

export default Practice
