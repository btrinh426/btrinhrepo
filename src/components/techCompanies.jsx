import React from "react";
import { render } from "react-dom";
import TcService from "../services/TechCompaniesService";
import SingleTechCompany from "./singleTechCompany";

class TechCompanies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      current: 1,
      totalCount: 0,
      pageCount: "",
      cardId: "",
      tcData: {
        name: "",
      },
    };
  }

  componentDidMount() {
    TcService.getAllTc(0, 3)
      .then(this.onGetAllTcSuccess)
      .catch(this.onGetAllTcError);
  }

  onGetAllTcSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      return {
        totalCount: response.data.item.totalCount,
        current: response.data.item.pageIndex + 1,
        mappedCompanies: response.data.item.pagedItems.map(this.mapCompany),
      };
    });
    console.log(this.state);
  };

  onGetAllTcError = (err) => {
    console.error(err);
  };
  //-----Map Company-----
  mapCompany = (oneCompany) => {
    return (
      <React.Fragment key={`TechCompanies-${oneCompany.id}`}>
        <SingleTechCompany
          {...this.props}
          tcData={oneCompany}
          onEditRequested={this.onATcEditClicked}
        ></SingleTechCompany>
      </React.Fragment>
    );
  };

  //-----Edit Click Handler----
  onATcEditClicked = (techCompany) => {
    console.log("Edit clicked friend", techCompany.id);
    this.props.history.push(`/AddTechCompanies/${techCompany.id}/edit/`, {
      type: "tcData",
      payload: techCompany,
    });
  };

  //-----Add Tech Company Click Handler-----
  onAddTcClicked = (e) => {
    this.props.history.push("AddTechCompanies");
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 p-5">
          <h1>Tech Companies</h1>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.onAddTcClicked}
          >
            Add A Tech Company
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="search tech-companies"
            aria-label="search tech-companies"
            onChange={this.onFormFieldChanged}
            value={this.state.searchTerm}
          />
          <div>
            <button
              className="btn btn-outline-secondary"
              type="submit"
              onClick={this.onSearchClicked}
            >
              Search
            </button>
          </div>
          <hr />
          <div className="row">{this.state.mappedCompanies}</div>
          <div className="row">
            <div className="col d-flex justify-content-center"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TechCompanies;
