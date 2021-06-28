import React, { Component } from 'react';
import { getAll } from '../services/techService';
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import SingleCompany from './SingleCompany';
class Companies extends Component {
  state = {
    currentCompany: [
      {
        name: "",
        profile: "",
        summary: "",
        headline: "",
        contactInformation: "",
        slug: "",
        statusId: "active",
        images: [
          {
            imageTypeId: 0,
            imageUrl: ""
          }
        ],
        urls: [
          ""
        ],
        tags: [
          ""
        ],
        friendIds: [
          0
        ]
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
    let mappedCompanies = response.data.item.pagedItems;
    console.log('response.data.item.pagedItems: ', response.data.item.pagedItems);
    this.setState(() => {
      // add to state the current index and the total number of records
      return { companyToMap: mappedCompanies.map(this.mapCompanies) }
    });
  }
  mapCompanies = (oneCompany) => {
    // return <SingleCompany singleCompany={oneCompany} />;
    return (
    <div className="container" key={oneCompany.id}>
          <div className="row">
            <Card className="col-md-3">
              <CardImg
                top
                width="100%"
                src={oneCompany.images && oneCompany.images[0].imageUrl}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle tag="h1">{oneCompany.headline}</CardTitle>
                <CardText tag="h3">{oneCompany.title}</CardText>
                <CardText tag="h3">{oneCompany.contactInformation.data}</CardText>
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
export default Companies;