import React from "react"

class CarYear extends React.Component {


    render() {

        return (
            <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Year</label>
            <select className="form-control" name="year" value={this.props.cars.year}>
                <option value="">Select Year</option>
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
            </select>
        </div>
        )
    }
}

export default CarYear