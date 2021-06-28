import React from "react";

const Product = (props) => {
  const someName = () => {
    props.changeName(props.product.id);
  };

  return (
    <div className="col-md-3 mb-4">
      <p>{props.product.id}</p>
      <p>{props.product.name}</p>
      <button onClick={someName}>Change Name</button>
    </div>
  );
};

export default Product;
