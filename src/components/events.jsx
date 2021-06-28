import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class Events extends React.Component {
	state = {}

	// changeHandler = (e) => {
	// 	this.setState((prevState, e) => {
	// 		return {
	// 			...prevState,
	// 			[e.target.name]: e.target.value,
	// 		}
	// 	})
	// }
	changeHandler = (e) => {
		let value = e.target.value
		let name = e.target.name
		this.setState(() => ({
			eventToAdd: { ...this.state.eventToAdd, [name]: value },
		}))
	}

	startDate = (date) => {
		this.setState(() => {
			return {
				eventToAdd: {
					metaData: {
						startDate: date,
					},
				},
			}
		})
	}

	endDate = (date) => {
		this.setState(() => {
			return {
				endDate: date,
			}
		})
	}

	render() {
		return (
			<form>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label>Name</label>
						<input
							type="text"
							className="form-control"
							name="name"
							onChange={this.changeHandler}
						/>
					</div>

					<div className="form-group col-md-6">
						<label>Headline</label>
						<input
							type="text"
							className="form-control"
							name="headline"
							onChange={this.changeHandler}
						/>
					</div>
				</div>
				<div className="form-group">
					<label>Description</label>
					<input
						type="text"
						className="form-control"
						name="description"
						onChange={this.changeHandler}
					/>
				</div>
				<div className="form-group">
					<label>Summary</label>
					<input
						type="text"
						className="form-control"
						name="summary"
						onChange={this.changeHandler}
					/>
				</div>

				<div className="form-row">
					<div className="form-group col-md-6">
						<label>Slug</label>
						<input
							type="text"
							className="form-control"
							id="inputCity"
							name="slug"
							onChange={this.changeHandler}
						/>
					</div>
					<div className="form-group col-md-4">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							name="address"
							onChange={this.changeHandler}
						/>
					</div>
					<div className="form-group col-md-2">
						<label>Zip</label>
						<input
							type="text"
							className="form-control"
							name="zipCode"
							onChange={this.changeHandler}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							id="gridCheck"
						/>
						<label className="form-check-label">Check me out</label>
					</div>
				</div>
				<div>
					<label htmlFor="datePicker">Dates</label>
					<div>
						<DatePicker
							selected={this.state.startDate}
							onChange={this.startDate}
							dateFormat="yyyy/MM/dd"
							minDate={new Date()}
							placeholderText="Start Date"
						/>
						<DatePicker
							selected={this.state.endDate}
							onChange={this.endDate}
							dateFormat="yyyy/MM/dd"
							minDate={new Date()}
							placeholderText="End Date"
						/>
					</div>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		)
	}
}

export default Events
