import React from "react";

import { getTechCompanies } from "../services/techCompanyServices.js";

class TechCompanySelect extends React.Component {
  state = {
    mappedTitles: [],
    pageIndex: 0,
    pageSize: 2,
  };

  onSelected = (e) => {
    // console.log(e);
  };

  componentDidMount = () => {
    this.getPageOfTechCompanies();
  };

  // keep calling until 404 error (have all companies)
  getPageOfTechCompanies = () => {
    getTechCompanies(this.state.pageIndex, this.state.pageSize)
      .then(this.getTechCompaniesSuccess)
      .catch(this.getTechCompaniesError);
  };

  mapForSelect = (company) => {
    let id = +company.id;
    console.log(typeof id);
    return (
      <option value={id} key={company.id}>
        {company.name}
      </option>
    );
  };

  getTechCompaniesSuccess = (response) => {
    let titles = [];
    if (this.state.mappedTitles.length === 0) {
      let emtpyCompany = { id: "0", name: "" };
      titles = [emtpyCompany];
      titles = titles.concat(response.data.item.pagedItems);
    } else {
      titles = response.data.item.pagedItems;
    }

    let newMappedTitles = titles.map(this.mapForSelect);
    // let newMappedTitles = response.data.item.pagedItems.map(this.mapForSelect);

    let allMappedTitles = this.state.mappedTitles.concat(newMappedTitles);

    this.setState((prevState) => {
      return {
        mappedTitles: allMappedTitles,
        pageIndex: prevState.pageIndex + 1,
      };
    });

    this.getPageOfTechCompanies(); // set this running asynch
  };

  // have all tech companies, tell parent to refresh
  getTechCompaniesError = (response) => {
    this.props.setMappedCompanies(this.state.mappedTitles);
  };

  render = () => {
    return <React.Fragment></React.Fragment>;
    // return <React.Fragment>{this.state.mappedTitles}</React.Fragment>;
  }; // end render

  // render = () => {
  //   console.log("Tech", this.getId());
  //   return (
  //     <React.Fragment>
  //       <label className="col-sm-2 col-form-label">Tech Co.</label>
  //       <select
  //         className="form-select"
  //         id="techCompany"
  //         name="techCompanyId"
  //         value={this.state.techCompanyId}
  //         // value="24211"
  //         onChange={this.onSelected}
  //       >
  //         {this.state.mappedTitles}
  //       </select>
  //     </React.Fragment>
  //   );
  // };  // end render
} // end TechCompanySelect

export default TechCompanySelect;
