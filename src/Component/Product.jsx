import React from "react";

class Product extends React.Component {
  componentDidMount() {
    let prodId = this.props.match.param.productId;

    console.log("componentDidMount", { prodId });

    if (prodId) {
      console.log("Making an ajax call for product id", { prodId });
    }
  }

  componentDidUpdate(preProps) {
    let prodId = this.props.match.params.productId;

    console.log(" Product componentDidUpdate", { prodId });

    if (prodId && preProps.props.match.params.productId !== prodId) {
      console.log(
        "Making an ajax call for product id out of componentDidUpdate",
        { prodId }
      );
    }
  }

  render() {
    return <div className="col-md-12">Product</div>;
  }
}

export default Product;
