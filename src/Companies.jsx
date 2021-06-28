import React from "react";
import companyService from "./services/companyService";
class Companies extends React.Component {
  state = { companies: [] };
  showCompanies = () => {
    companyService
      .getCompanies(0)
      .then(this.onShowCompaniesSuccess)
      .catch(this.onShowCompaniesError);
  };
  onShowCompaniesSuccess = (response) => {
    console.log(response);
  };

  onShowCompaniesError = (response) => {
    alert(response);
  };

  componentDidMount() {
    this.showCompanies();
  }
  render() {
    return "hi";
  }
}

export default Companies;
