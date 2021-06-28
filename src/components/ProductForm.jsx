import React from "react";
import productFormService from "../services/productFormService";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"

class ProductForm extends React.Component {

    state = {
        productData: {
            name: "",
            manufacturer: "",
            description: "",
            cost: 0
        }
    }

    onInputChange = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(() => {
            let productData = { ...this.state.productData };
            productData[inputName] = newValue;

            return { productData };
        });
    };

    addPostBtn = (e) => {
        e.preventDefault();

        const data = { ...this.state.productData };

        productFormService.addProduct(data)
            .then(this.onAddProductSuccess)
            .catch(this.onAddProductError)
    };

    onAddProductSuccess = response => {
        console.log({ productId: response.data.item })
        Swal.fire({
            icon: "success",
            title: "New product added!"
        })
    };

    onAddProductError = response => {
        console.warn({ error: response })
        Swal.fire({
            icon: "error",
            text: "Unable to add product."
        })
    };

    render() {
        return <form style={{ margin: "8rem" }}>
            <div className="form-group">
                <label htmlFor="productName">Product Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="name"
                    placeholder="Product name"
                    onChange={this.onInputChange}
                    value={this.state.productData.name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="manufacturer">Manufacturer:</label>
                <input
                    type="text"
                    className="form-control"
                    id="productManufacturer"
                    name="manufacturer"
                    placeholder="Manufacturer Name"
                    onChange={this.onInputChange}
                    value={this.state.productData.manufacturer}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text"
                    className="form-control"
                    id="productDescription "
                    name="description"
                    placeholder="Description"
                    onChange={this.onInputChange}
                    value={this.state.productData.description}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cost">Cost:</label>
                <input
                    type="number"
                    className="form-control"
                    id="productCost"
                    name="cost"
                    placeholder="Cost of product"
                    onChange={this.onInputChange}
                    value={this.state.productData.cost}
                />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.addPostBtn}>Submit</button>
        </form>
    }
};

export default ProductForm;