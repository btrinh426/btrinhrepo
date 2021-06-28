import React, { Component } from "react";
import entityService from "../services/entityService";
import NavBar from "./NavBar";
import OneProductCard from "./OneProductCard";
import { NavLink } from "react-router-dom";
// import { toast } from "react-toastify";
// import OneProductCard from "./OneProductCard";


// another way to export and declare one liner
export default class ProductList extends Component {
    state = {};


    componentDidMount() {
        entityService.getAll()
            .then(this.onGetAllSuccess)
            .catch(this.onGetAllError)
    }

    onGetAllSuccess = (response) => {
        console.log("all products success ", response.data.items)
        const myProducts = response.data.items;


        this.setState((prevState) => {
            return { mappedProducts: myProducts.map(this.mapProduct) }
        })
        // console.log("this is mappedProducts: ", myProducts.map(this.mapProduct))
    }


    onGetAllError = (response) => {
        console.log("all products error ", response)
    }

    mapProduct = (oneProduct) => {
        return (
            <OneProductCard
                key={oneProduct.id}
                name={oneProduct.name}
                manufacturer={oneProduct.manufacturer}
                description={oneProduct.description}
                cost={oneProduct.cost}
                id={oneProduct.id}
                onDeleteButtonClicked={this.onDeleteClick}
                isFree={true}
            />
        )
    }
    onDeleteClick = (e) => {
        const productId = e.currentTarget.dataset.productId;
        console.log("product Id: ", productId);
        const passIdToSuccessHandler = this.onDeleteSuccess(parseInt(productId));
        entityService.delete(productId)
            .then(passIdToSuccessHandler)
            .catch(this.onDeleteError)
    }

    onDeleteSuccess = (deletedProductId) => {
        console.log("in delete success: ", deletedProductId)

        this.setState((prevState) => {
            console.log("prevState ", prevState)
            console.log(prevState.mappedProducts[0].props.id)

            const indexOfProduct = prevState.mappedProducts.findIndex(
                (singleArrayProduct) => singleArrayProduct.props.id === deletedProductId
            );
            const updatedProduct = [...prevState.mappedProducts];

            if (indexOfProduct >= 0) {
                updatedProduct.splice(indexOfProduct, 1);
            }
            return {
                mappedProducts: updatedProduct
            };
        });
    };
    onDeleteError = (response) => {
        console.warn("hahaha didnt work asshole!!!", response)
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
                    <h1><NavLink to="/productForm">Add New Product</NavLink></h1>
                    <hr />
                    <div className="row">
                        {this.state.mappedProducts}
                    </div>
                </div>
            </React.Fragment>

        )
    }

}
// export default ProductList;