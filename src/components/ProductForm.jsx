import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import entityService from "../services/entityService";
import { NavLink } from "react-router-dom";


// toast.configure();
class ProductForm extends Component {
    state = {
        formData: {
            name: "",
            manufacturer: "",
            description: "",
            cost: "Price"
        },
    };

    onFormFieldChange = (e) => {
        console.log(e.currentTarget.name, e.currentTarget.value);
        const currentTarget = e.currentTarget;
        const newValue =
            currentTarget.type === "checkbox"
                ? currentTarget.checked
                : currentTarget.value;
        const inputName = currentTarget.name;

        this.setState(() => {
            const formData = { ...this.state.formData };
            formData[inputName] = newValue;
            return { formData };
        });
    };

    onSubmitButtonClicked = (e) => {
        e.preventDefault();
        console.log("you clicked submit");
        if (this.state.formData.name === "" ||
            this.state.formData.manufacturer === "" ||
            this.state.formData.description === "" ||
            this.state.formData.cost === "Price") {
            toast.error("Entity was not added properly please fill out completely ")
        } else {
            entityService.new(this.state.formData)
                .then(this.onEntityAddSuccess)
                .catch(this.onEntityAddError);
        }
        console.log("current State: ", this.state.formData);
    };
    onEntityAddSuccess = (response) => {
        console.log("item Id created:", response.data.item)
        let id = response.data.item
        toast.success(`You created a ${this.state.formData.name} with an id # ${id}`)
        this.props.history.push("/productList")
    }
    onEntityAddError = (response) => {
        toast.error("Entity was not added properly please try again")
        console.warn({ errorEntityAdd: response })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="banner" id="bannerImg">
                    <img src="https://uk.electronic.partners/wp-content/uploads/sites/5/2019/06/electronics-banner.jpg"
                        id="bannerImg"
                        alt="bannerImage" />
                </div>
                <div className="col-md-12 p-5">
                    <h1><NavLink to="/productList">See all your Products</NavLink></h1>
                    <hr />

                </div>
                <div className="container">
                    <h1>Fill out the form below to create a product</h1>
                    <div className="row">
                        <div className="col form-group">
                            <div className="row mt-3">
                                <div className="col form-group">
                                    <h1 style={{ color: "#93329e" }}>Product Form</h1>
                                    <form method="post" action="/login">

                                        <p>
                                            <label htmlFor="name">Name:</label>
                                            <input
                                                type="text"
                                                id="productName"
                                                name="name"
                                                onChange={this.onFormFieldChange}
                                                value={this.state.formData.name}
                                            />
                                        </p>

                                        <p>
                                            <label htmlFor="manufacturer">Manufacturer:</label>
                                            <input
                                                type="text"
                                                id="productManu"
                                                name="manufacturer"
                                                onChange={this.onFormFieldChange}
                                                value={this.state.formData.manufacturer}
                                            />
                                        </p>
                                        <p>
                                            <label htmlFor="description">Description:</label>
                                            <input
                                                type="text"
                                                id="productDescription"
                                                name="description"
                                                onChange={this.onFormFieldChange}
                                                value={this.state.formData.description}
                                            />
                                        </p>
                                        <p>
                                            <label htmlFor="cost">Cost:</label>
                                            <input
                                                type="number"
                                                id="productCost"
                                                name="cost"
                                                onChange={this.onFormFieldChange}
                                                value={this.state.formData.cost}
                                            />
                                        </p>

                                        <button
                                            className="btn btn-warning"
                                            style={{ backgroundColor: "#ffd880" }}
                                            type="submit"
                                            onClick={this.onSubmitButtonClicked}
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* <h2 className="loginText" style={{ color: "#93329e" }}>Register</h2> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default ProductForm;
