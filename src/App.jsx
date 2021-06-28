import React, { Component } from "react";
import SiteNav from "./component/SiteNav";
import Footer from "./component/Footer";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Register from "./component/user/Register";
import { BrowserRouter } from "react-router-dom";
import Login from "./component/user/Login";
import Friends from "./component/Friends";
import AddFriends from "./component/addFriends";
import UpdateFriend from "./component/UpdateFriend";
import Jobs from "./component/jobs";
import AddJob from "./component/AddJob";
import * as ProductService from "./services/productService";
import { toast } from "react-toastify";
import "./App.css";

class App extends Component {
  state = {
    Name: "",
    Manufacturer: "",
    Description: "",
    Cost: "",
  };
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};

      if (inputName === "Cost" && newValue) {
        newState[inputName] = parseInt(newValue);
      } else {
        newState[inputName] = newValue;
      }
      console.log("newState", newState);
      return newState;
    });
  };

  onAddButtonClicked = (e) => {
    e.preventDefault();

    ProductService.addProduct(this.state)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (res) => {
    console.log(res);

    toast.success(`The Product was created, ID is ${res.data.item}`, {
      position: toast.POSITION.TOP_CENTER,
    });

    this.setState((prevState) => {
      let newState = { ...prevState };

      newState.name = "";
      newState.Manufacturer = "";
      newState.Description = "";
      newState.Cost = "";

      return { newState };
    });
  };

  onActionError = (errResponse) => {
    toast.error("Something is wrong", {
      position: toast.POSITION.TOP_CENTER,
    });
    console.log(errResponse);
  };

  render() {
    return (
      <BrowserRouter>
        <SiteNav></SiteNav>

        <React.Fragment>
          <form className="form-addfriend center">
            <h1 className="mt-4">Add a Product</h1>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Name
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.Name}
                  type="text"
                  className="form-control-lg"
                  id="Name"
                  name="Name"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Manufacturer
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.Manufacturer}
                  type="text"
                  className="form-control-lg"
                  id="inputManufacturer"
                  name="Manufacturer"
                  placeholder="Manufacturer"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Description
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.Description}
                  type="text"
                  className="form-control-lg"
                  id="inputDescription"
                  name="Description"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Cost
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.Cost}
                  type="inte"
                  className="form-control-lg"
                  id="inputCost"
                  name="Cost"
                  placeholder="Cost"
                />
              </div>
            </div>

            <button
              onClick={this.onAddButtonClicked}
              type="button"
              id="update"
              className="btn btn-primary product mr-5"
            >
              Add a Product
            </button>
          </form>
        </React.Fragment>

        {/* <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/AddFriend" component={AddFriends} />
          <Route path="/Register" component={Register} />

          <Route path="/friends/:friendId/edit" component={UpdateFriend} />

          <Route path="/Login" component={Login} />
          <Route path="/Jobs" component={Jobs} />
          <Route path="/AddJob" component={AddJob} />

          <Route path="/friends" component={Friends} exact />
          <Route
            path="/friends?friendName-:searchFriendName"
            component={Friends}
            exact
          />
        </Switch> */}
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;
