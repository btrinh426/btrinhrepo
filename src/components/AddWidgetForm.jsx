import React from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";

class WidgetForm extends React.Component {

    state = {
        formData: {
            name: "",
            manufacturer: "",
            description: "",
            cost: "",
            id: ""
        }
    }

    onForFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(() => {
            let formData = { ...this.state.formData };

            formData[inputName] = newValue;

            return { formData };

        });

    };

    handleSubmit = (e) => {
        e.preventDefault();
        userService.submit(this.state.formData)
            .then(this.onSubmitSuccess)
            .catch(this.onSubmitError)
    };

    onSubmitSuccess = (response) => {
        toast(`Added Device id:${response.data.item}`)
        console.log("Submit was Successful", response)
    };

    onSubmitError = (response) => {
        toast("There was a problem. Please try again")
        console.error("Submit failed")
    };

    render() {
        return (
            <div className="container col-md-5">
                <h2>Navbar</h2>
                <h5>Navbar</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            value={this.state.formData.name}
                            onChange={this.onForFieldChanged}
                            placeholder="iPhone 12 Pro"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                        <input
                            type="text"
                            name="manufacturer"
                            className="form-control"
                            id="manufacturer"
                            value={this.state.formData.manufacturer}
                            onChange={this.onForFieldChanged}
                            placeholder="Apple"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            id="description"
                            value={this.state.formData.description}
                            onChange={this.onForFieldChanged}
                            placeholder="This phone has an A14 processor."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cost" className="form-label">Cost</label>
                        <input
                            type="number"
                            name="cost"
                            className="form-control"
                            id="cost"
                            value={this.state.formData.cost}
                            onChange={this.onForFieldChanged}
                            placeholder="$999"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    };
};

export default WidgetForm;