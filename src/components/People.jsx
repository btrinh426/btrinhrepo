import React from "react";
import * as friendServices from "../services/friendServices.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import SinglePers from "./Person.jsx";
import SearchForm from "./SearchForm.jsx";

class People extends React.Component {
  state = {
    mappedPeople: [],
    totalPages: 0,
    searchInfo: "",
    current: 1,
    pageSize: 3,
    pageIndex: 0,
  };

  componentDidMount() {
    this.setPeople();
  }

  setPeople = (page = 0) => {
    friendServices
      .pageOfPeople(page, this.state.pageSize)
      .then(this.onPageOfPeopleSuccess)
      .catch(this.onPageOfPeopleError);
  };

  searchPeople = (searchName, pageNo = 0) => {
    // console.log(`searching ${searchName}`);

    friendServices
      .searchPerson(searchName, pageNo)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (response) => {
    console.log(response);
    // console.log(`it worked`);
    this.onPageOfPeopleSuccess(response);
  };

  onSearchError = (response) => {
    console.log(response);
    // console.log(`try again bud...`);
  };

  onPageOfPeopleSuccess = (response) => {
    let peopleArr = response.data.item.pagedItems;
    let totalPages = response.data.item.totalPages;
    let totalCount = response.data.item.totalCount;

    // console.log(peopleArr);
    // console.log(response);
    // console.log(totalPages);

    var url = response.config.url;
    var searchInfo = "";

    if (url.includes("search")) {
      var urlArr = url.split("q=");
      searchInfo = urlArr[1];
    }

    this.setState(() => {
      return {
        mappedPeople: peopleArr.map(this.mapPerson),
        totalPages,
        searchInfo,
        totalCount,
      };
    });
  };

  onPageOfPeopleError = (response) => {
    console.log(response);
  };

  onDeleteClicked = (person) => {
    var personId = person.id;
    swal({
      text: "Are you sure you want to delete this record?",
      buttons: true,
      dangerMode: true,
    }).then((deleteRecord) => {
      if (deleteRecord) {
        friendServices
          .deletePerson(personId)
          .then(this.onDeleteSuccess)
          .catch(this.onDeleteError);
      }
    });
  };

  onDeleteSuccess = (response) => {
    toast.success("Person deleted!", this.toastrOptions);
    this.setPeople();
  };

  onDeleteError = (response) => {
    toast.error(
      "Could not delete person. Please try again later.",
      this.toastrOptions
    );
  };

  onEditClickFull = (pers) => {
    // console.log(pers);

    if (!pers.currentTarget) {
      this.props.history.push({
        pathname: `/people/form`,
        state: pers,
      });
    } else {
      this.props.history.push("/people/form");
    }

    // console.log(pers);
  };
  mapPerson = (personRec) => {
    return (
      <SinglePers
        key={`person-${personRec.id}`}
        {...this.props}
        person={personRec}
        onGetInfoClick={this.onEditClickFull}
        onDeleteInfoClick={this.onDeleteClicked}
      ></SinglePers>
    );
  };

  onPageOfPeopleError = (response) => {
    console.log(response);
    console.log(this.state.current);
  };

  onPageNavClick = (current) => {
    var pageIndex = current - 1;
    this.setState(
      () => {
        return { current, pageIndex };
      },
      () => {
        console.log(current);
        console.log(
          typeof this.state.searchInfo,
          this.state.searchInfo === null,
          this.state.searchInfo === ""
        );
        if (this.state.searchInfo === "") {
          this.setPeople(pageIndex);
        } else {
          this.searchPeople(this.state.searchInfo, pageIndex);
          console.log("this is it here doc");
        }
      }
    );
  };

  toastrOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    showDuration: 500,
    timeOut: 1000,
  };

  render() {
    return (
      <div className="container people ">
        <div className="row justify-content-between">
          <h1>People</h1>
          <button
            className="btn btn-warning btn-sm add-pers"
            onClick={this.onEditClickFull}
          >
            Add
          </button>
        </div>

        <hr />
        <SearchForm onSearchSubmit={this.searchPeople} />
        <br />
        <Pagination
          total={this.state.totalCount}
          current={this.state.current}
          pageSize={this.state.pageSize}
          onChange={this.onPageNavClick}
        />
        <br />
        <div className="row">{this.state.mappedPeople}</div>
        <br />

        <hr />
      </div>
    );
  }
}

export default People;
