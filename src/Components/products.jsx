import React from "react";
import { toast } from "react-toastify";
import * as userService from "../services/userService"

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                name: "",
                manufacturer: "",
                description: "",
                cost: 0,
                productId: 646
            }
        }
    }

    productsButton = (e) => {
        e.preventDefault();
        let enteredData = this.state.formData;

        userService.registerTest(enteredData)
            .then(this.dataSuccess)
            .catch(this.dataError)
    }

    dataSuccess = () => {
        toast.success("Welcome! Your ID is 646", this.state.formData.id)
    }

    dataError = () => {
        toast.error("Enrique you better CHECK THAT CODE AGAIN")
    }

    newDataEntered = (e) => {
        let currentTarget = e.currentTarget;
        let currentValue = currentTarget.value;
        let currentName = currentTarget.name;

        this.setState(() => {
            let formData = { ...this.state.formData };
            formData[currentName] = currentValue;
            return { formData };
        })
    }

    render() {
        return <React.Fragment>
            <div className="container">
                <div className="row"><div className="row-3">
                    <h1>PRODUCT FORM</h1>

                    <div className="form-group">
                        <label htmlFor="name">Name Please:</label>
                        <input type="text" name="name" id="name" className="form-control" value={this.state.formData.name} onChange={this.newDataEntered} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="manufacturer">Manufacturer Please:</label>
                        <input type="text" name="manufacturer" id="manufacturer" className="form-control" value={this.state.formData.manufacturer} onChange={this.newDataEntered} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description Please:</label>
                        <input type="text" name="description" id="description" className="form-control" value={this.state.formData.description} onChange={this.newDataEntered} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cost">Cost Please (no cents, full dollar amount only):</label>
                        <input type="number" name="cost" id="cost" className="form-control" value={this.state.formData.cost} onChange={this.newDataEntered} />
                    </div></div>
                    <button onClick={this.productsButton}>Products!!!</button>
                </div>
            </div>
        </React.Fragment>;
    }
}

export default Products;
