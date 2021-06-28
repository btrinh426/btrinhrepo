import React from "react";
import entityService from "../services/friendService";

class Product extends React.Component {
  // state = {
  //   entityName: "computers",
  //   // formData: {
  //   //   name: "",
  //   //   manufacturer: "",
  //   //   description: "",
  //   //   cost: 0,
  //   // },
  // };

  // };
  getProductBtn = (e) => {
    e.preventDefault();
    entityService
      .entityByName({ entityName: "Computers" })
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log(response);
  };
  onActionError = () => {
    console.log("err");
  };

  render() {
    return (
      <form className="row g-3 p-5">
        <div className="col-md-6">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" name="name" />
        </div>
        <div className="col-md-6">
          <label htmlFor="manufacturerInput" className="form-label">
            Manufacturer
          </label>
          <input
            type="text"
            className="form-control"
            id="Manufacturer"
            name="anufacturer"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="descriptionInput" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="costInput" className="form-label">
            Cost
          </label>
          <input type="text" className="form-control" id="ost" name="cost" />
        </div>

        <div className="col-12" />
        <div className="col-12">
          <button
            onClick={this.getProductBtn}
            type="submit"
            className="btn btn-primary"
            id="userRegister"
          >
            Get Product
          </button>
        </div>
      </form>
    );
  }
}

export default Product;
