import React from "react";
import Product from "./Product";

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
    obj: {
      prop1: {
        subProp1: "",
      },
    },
  };

  changeName = (id) => {
    this.setState((prevState) => {
      const products = [...prevState.products];

      let indx = products.findIndex((product) => product.id === id);

      products[indx].name = "Something";

      return {
        products,
      };
    });
  };

  mapProduct = (product) => (
    <Product key={product.id} product={product} changeName={this.changeName} />
  );

  render() {
    return (
      <div>
        {this.state.products.map(this.mapProduct)}
        <h1>{this.state.obj.prop1.subProp1}</h1>
      </div>
    );
  }
}

export default Test;
