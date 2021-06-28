import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";


function SingleCompany(props) {
    
    const oneJob = props.singleJob;

    return (
        <div className="container" key={oneJob.id}>
          <div className="row">
            <Card className="col-md-3">
              <CardImg
                top
                width="100%"
                src={oneJob.images}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle tag="h1">{oneJob.pay}</CardTitle>
                <CardText tag="h3">{oneJob.title}</CardText>
                <CardText tag="h3">{oneJob.contactInformation}</CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    };

export default React.memo(SingleCompany);
// export default SingleJob;