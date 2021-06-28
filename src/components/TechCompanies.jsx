import React, { Component } from "react";
import { deleteJobs } from "../services/jobsService";
import {
  getTechCompanies,
  onDeleteTechCompanies,
} from "../services/techCompaniesService";
import TechCompaniesCard from "./TechCompaniesCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import { currentUser } from "../services/userService";

class TechCompanies extends Component {
  //these lines relate to making class objects
  //how to set up THIS particular objects... what is unique, what is different we set that up in here
  //props is a bundle of data that show up from the component invocation? I forget the word
  // super(props) is a formatlity that is required when extending components
  // constructor(props) {
  //   super(props);
  //real code work goes here

  //componentDidMount(){}
  //componentDidUpdate(){}
  //componentWillMount(){}
  //componentWillUpdate(){}
  //componentWillUnmount(){}

  state = {
    techCompanies: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 10,
    searchTerm: "",
  };
  componentDidMount() {
    this.onGetTechCompanies();
  }

  onGetTechCompanies = () => {
    getTechCompanies(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetTechCompaniesSuccess)
      .catch(this.onGetTechCompaniesError);
  };

  onGetTechCompaniesSuccess = (response) => {
    let techCompanies = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        ...prevState,
        techCompanies,
        totalCount: response.data.item.totalCount,
      };
    });
    console.log(techCompanies);
  };

  onGetTechCompaniesError = () => {
    console.warn();
  };

  onDeleteTechCompaniesClick = (techCompaniesId) => {
    console.log("onDeleteTechCompaniesClick");
    deleteJobs(techCompaniesId)
      .then(this.onDeleteTechCompaniesSuccess)
      .catch(this.onDeleteTechCompaniesError);
  };
  onDeleteTechCompaniesSuccess = (idDeleted) => {
    console.log("onDeleteTechCompaniesSuccess");
    getTechCompanies()
      .then(this.onGetTechCompaniesSuccess)
      .catch(this.onGetTechCompaniesError);
  };

  onDeleteTechCompaniesError = () => {
    console.warn();
  };

  onEdit = (oneTechCompany) => {
    console.log(oneTechCompany);
    this.props.history.push(`/techCompanies/${oneTechCompany.id}/edit`, {
      type: "techCompany_Obj",
      payload: { oneTechCompany },
    });
  };

  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
  };

  onTechCompaniesFilter = (props) => {
    let techCompanies = props.filteredTechCompanies.map(
      (techCompanies, item) => {
        console.log(techCompanies);
        return <techCompaniesFilter key={item} techCompany={techCompanies} />;
      }
    );

    return <div>{techCompanies}</div>;
  };

  onTechCompaniesSearch = () => {
    return <div>input onChange={this.handleInput} type = "text"/></div>;
  };
  onPaginationChange = (page) => {
    this.setState(() => {
      return { pageIndex: page - 1 };
    }, this.onGetTechCompanies);
  };
  render() {
    console.log(this.state);
    let techCompaniesToDisplay = this.state.techCompanies;
    if (this.state.searchTerm) {
      techCompaniesToDisplay = this.state.techCompanies.filter(
        (techCompany) => {
          return JSON.stringify(techCompany).includes(this.state.searchTerm);
          //return car.year.toString().includes(this.state.searchTerm);
        }
      );
    }
    console.log(techCompaniesToDisplay);
    return (
      <div>
        <input onChange={this.handleInput}></input>
        <div className="row">
          {techCompaniesToDisplay.map((oneTechCompany) => {
            return (
              <TechCompaniesCard
                key={oneTechCompany.id}
                techCompany={oneTechCompany}
                onDeleteTechCompaniesClick={this.onDeleteTechCompaniesClick}
                handleEditClick={this.onEdit}
              />
            );
          })}

          <Pagination
            total={this.state.totalCount}
            onChange={this.onPaginationChange}
            current={this.state.pageIndex}
            pageSize={this.state.pageSize}
          />
        </div>
      </div>
    );
  }
}

export default TechCompanies;
