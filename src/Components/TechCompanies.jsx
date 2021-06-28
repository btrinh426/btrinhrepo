import React from "react";
import * as techService from "../services/techService";
import SingleCompany from "./SingleCompany";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class TechCompanies extends React.Component {
  state = {
    techCompanies: [],
    // search: "",
    // current: 1,
    // totalCount: 0,
    // searchedCompany: [],
  };

  componentDidMount = (response) => {
    // techService
    //   .getCompanies(0, 5)
    //   .then(this.onGetCompanySuccess)
    //   .catch(this.onGetCompanyError);
  };

  onGetCompanySuccess = (response) => {
    let companiesArr = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        mappedCompanies: companiesArr.map(this.mapCompany),
        // current: response.data.item.pageIndex + 1,
        // totalCount: response.data.item.totalCount,
      };
    });
    console.log(this.state);
  };
  onGetCompanyError = (err) => {
    console.log(err);
  };

  onAddCompanyClick = (company) => {
    this.props.history.push("/Companies/Add");
  };

  onEditClickedFull = (company) => {
    console.log(company);
    this.props.history.push("/Companies/" + company.id + "/edit");
  };

  onEditSuccess = (response) => {
    toast.success("You have updated a company.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onEditError = (errResponse) => {
    toast.error("You could not update company.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onDeleteClickedFull = (company) => {
    //pass parameter object from edit profile component
    const pointerToFunc = this.onDeleteSuccessCur(company.id);
    techService
      .deleteCompany(company.id)
      .then(pointerToFunc)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
    console.log(company);
  };

  onDeleteSuccessCur = (id) => {
    return (data) => {
      console.log(data);
      console.log(id);
      this.setState((prevState) => {
        const indexOfCompanies = prevState.techCompanies.findIndex(
          (oneCompany) => oneCompany.id === data.id
        );
        debugger;
        const updatedCompanies = [...prevState.techCompanies];

        if (indexOfCompanies >= 0) {
          updatedCompanies.splice(indexOfCompanies, 1);
        }
        return {
          idDeleted: id,
          techCompanies: updatedCompanies,
          formData: null,
        };
      }, this.stateChanged);
      console.log("Successful Delete", data);
    };
  };

  onDeleteSuccess = () => {
    window.location.reload();
    //Use set state to prevent ajax calls again
    toast.success("You have deleted a company.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onDeleteError = (errResponse) => {
    toast.error("You could not delete company.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onFormFieldChanged = (e) => {
    let inputName = e.currentTarget;
    let newValue = e.currentTarget.value;
    console.log("inputName", inputName, "newValue", newValue);

    this.setState(() => {
      let newState = {};
      newState.search = newValue;

      return newState;
    });
  };

  // onSearchClicked = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   const searchResult = this.state.search;
  //   this.props.history.push("/friends?q=" + searchResult);
  //   friendService
  //     .searchFriend(0, 4, searchResult)
  //     .then(this.searchFriendSuccess)
  //     .catch(this.searchFriendError);
  // };

  // searchFriendSuccess = (response) => {
  //   toast["success"]("You Found Your Friend");

  //   this.setState((prevState) => {
  //     return {
  //       mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
  //       current: response.data.item.pageIndex + 1,
  //       totalCount: response.data.item.totalCount,
  //     };
  //   });
  //   console.log("success ajax call");
  // };

  // searchFriendError = (err) => {
  //   console.log({ err });
  //   toast["error"]("You couldn't locate Your Friend");
  // };

  // onChange = (page) => {
  //   const searchResult = this.state.search;
  //   this.setState((prevState) => {
  //     if (searchResult) {
  //       console.log(page - 1);
  //       friendService
  //         .searchFriend(page - 1, 4, searchResult)
  //         .then(this.searchFriendSuccess)
  //         .catch(this.searchFriendError);

  //       return { current: page };
  //     } else {
  //       console.log(page);
  //       friendService
  //         .getFriends(page - 1, 4)
  //         .then(this.onGetFriendsSuccess)
  //         .catch(this.onGetFriendsError);

  //       return { current: page };
  //     }
  //   });
  //   // console.log("current page");
  // };

  mapCompany = (oneCompany) => {
    return (
      <React.Fragment key={`TechCompanies-${oneCompany.id}`}>
        <SingleCompany
          {...this.props}
          company={oneCompany}
          onDeleteClick={this.onDeleteClickedFull}
          onEditClick={this.onEditClickedFull}
        ></SingleCompany>
      </React.Fragment>
    );
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <center>
            <h1>Companies</h1>
          </center>
          <div className="container">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onAddCompanyClick}
            >
              Add Company
            </button>
            <p></p>
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Type Company Name Here"
              aria-label="search"
              value={this.state.search}
              onChange={this.onFormFieldChanged}
            />
            {/* <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              onClick={this.onSearchClicked}
            >
              Search
            </button> */}
            {/* <div className="row">{this.state.mappedSearchedFriend}</div> */}
            <div className="row">{this.state.mappedCompanies}</div>
            {/* <div className="row">
              <Pagination
                className="pagination"
                defaultPageSize={4}
                onChange={this.onChange}
                current={this.state.current}
                total={this.state.totalCount}
              ></Pagination>
            </div> */}
          </div>
        </div>
      </main>
    );
  }
}

export default TechCompanies;
