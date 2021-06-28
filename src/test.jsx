import React from "react";
import Product from "./TestTwo";

class Test extends React.Component {
  state = {
    products: [
      {
        id: 1,
        name: "Razor",
      },
      {
        id: 2,
        name: "Computer",
      },
      {
        id: 3,
        name: "Toy",
      },
    ],
  };
  changeName = (id) => {
    this.setState((prevState) => {
      const products = [...prevState.products];
      let index = products.findIndex((product) => product.id === id);

      products[index].name = "something";
      return {
        products: products, // or just products by itself, it means the same thing
      };
    });
  };
  mapProduct = (product) => {
    <Product key={product.id} product={product} changeName={this.changeName} />;
  };
  render() {
    return <div>{this.state.products.map(this.mapProduct)}</div>;
  }
}

export default Test;
