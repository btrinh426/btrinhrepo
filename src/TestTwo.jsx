import React from "react";

const Product = (props) => {
  const someName = () => {
    props.changeName(props.product.id);
  };

  return (
    <div className="col-md-3 mb-4">
      <p>{product.id}</p>
      <p>{product.name}</p>
      <button onClick={someName}>change Name</button>
    </div>
  );
};

export default Product;

//this is the child component to the original Parent component, test.jsx
