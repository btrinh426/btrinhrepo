import React, { Component } from 'react';
import { getAll } from '../services/techService';
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
// import SingleJob from './Jobs/SingleJob';

class Jobs extends Component {
  state = {
    currentJob: [
      {
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "",
        statusId: "",
        techCompanyId: 0,
        skills: [""],
      },
    ],
    pageIndex: 0,
    pageSize: 5
  };

  componentDidMount() {
    getAll(this.state.pageIndex, this.state.pageSize).then(this.onGetAllSuccess).catch(this.onGetAllError);
  }

  onGetAllError = (err) => {
    console.error(err);
  };

  onGetAllSuccess = (response) => {
    let mappedJobs = response.data.item.pagedItems;
    console.log('response.data.item.pagedItems: ', response.data.item.pagedItems);
    this.setState(() => {
      // add to state the current index and the total number of records
      return { jobToMap: mappedJobs.map(this.mapJobs) }
    });
  }


  mapJobs = (oneJob) => {
    // return <SingleJob singleJob={oneJob} />;
    return (
    <div className="container" key={oneJob.id}>
          <div className="row">
            <Card className="col-md-3">
              <CardBody>
                <CardTitle tag="h1">{oneJob.pay}</CardTitle>
                <CardText tag="h3">{oneJob.title}</CardText>
              </CardBody>
            </Card>
          </div>
        </div>
    )
  };

  render() {
    return (
        <div>{this.state.companyToMap}</div>
    )
  }
};

export default Jobs;