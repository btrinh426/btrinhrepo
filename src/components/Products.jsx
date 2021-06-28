import React from "react";
import createEntity from "../services/productsService";
import toastr from "toastr";

class Products extends React.Component {
  state = {
    entityData: {
      entityName: " ",
      name: " ",
      manufacturer: " ",
      description: " ",
      cost: " ",
    },
  };

  onInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let entityData = { ...this.state.entityData };
      entityData[inputName] = newValue;
      return { entityData };
    });
  };
  onCreateEntityClicked = (e) => {
    e.preventDefault();
    console.log(this.state);
    createEntity(this.state.entityData)
      .then(this.onCreateEntitySuccess)
      .catch(this.onCreateEntityError);
  };
  onCreateEntitySuccess = (response) => {
    let entityId = response.data.item;
    toastr["success"]("Created Entity! Id:" + { entityId }, "Success!"); //not popping up. imported incorrectly?
  };
  onCreateEntityError = (err) => {
    console.log(err);
  };
  render() {
    return (
      <React.Fragment>
        <div className=" register main">
          <h3>Create a Custom Entity</h3>
          <form id="registerForm">
            <div className="form-group">
              <label>Entity Name (plural)</label>
              <input
                type="text"
                className="form-control"
                name="entityName"
                value={this.state.entityData.entityName}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.entityData.name}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Manufacturer</label>
              <input
                type="text"
                className="form-control"
                name="manufacturer"
                value={this.state.entityData.manufacturer}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={this.state.entityData.description}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Cost</label>
              <input
                type="text"
                className="form-control"
                name="cost"
                value={this.state.entityData.cost}
                onChange={this.onInputChanged}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onCreateEntityClicked}
            >
              Create Entity
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
