import React from "react";
import * as assessmentService from "../../services/assessmentService";
import "./ProductForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductForm extends React.Component {
    state = {
        aProduct: {
            name: "",
            manufacturer: "",
            description: "",
            cost: "",
        },
        postComplete: false,
    };
    handleClick = e => {
        //console.log("Click Clacked my NickNack", e.currentTarget);

        let product = this.state.aProduct;

        assessmentService
            .createEntity(product)
            .then(this.onPostOk)
            .catch(err => console.log(err));
    };
    onPostOk = res => {
        //console.log(res);
        const toastMsg = (
            <div>
                <p>You've successfully stored your Product.</p>
                <br />
                Product ID: {res}
            </div>
        );
        toast.success(toastMsg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    renderFromData = e => {
        console.log(
            "Capture Form",
            e.currentTarget.value,
            e.currentTarget.name
        );
        let value = e.currentTarget.value;
        let name = e.currentTarget.name;

        this.setState(prevState => {
            let aProduct = { ...prevState.aProduct };

            aProduct[name] = value;
            return { aProduct: aProduct };
        });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="Heading">
                        <h1>Create a product</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <form className="product-form">
                        <div className="form-group">
                            <label htmlFor="productName">
                                <strong>Product</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={this.state.aProduct.name}
                                onChange={this.renderFromData}
                                placeholder="Product Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="manufacturer">
                                <strong>Product Manufacturer</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="manufacturer"
                                name="manufacturer"
                                value={this.state.aProduct.manufacturer}
                                onChange={this.renderFromData}
                                placeholder="Some diabolical corporation"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">
                                <strong>Product Description</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={this.state.aProduct.description}
                                onChange={this.renderFromData}
                                placeholder="Describe your product"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cost">
                                <strong>Product Price</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="cost"
                                name="cost"
                                value={this.state.aProduct.cost}
                                onChange={this.renderFromData}
                                placeholder="$500"
                            />
                        </div>
                        <div>
                            <small className="text-muted">
                                *All fields are required
                            </small>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={this.handleClick}
                        >
                            Store Product
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ProductForm;
