import React from "react";
import { Card, CardText, CardBody, CardHeader } from "reactstrap";

class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something: "",
    };
  }
  render() {
    return (
      <div>
        {this.state.selectedIndividual && (
          <Card className="">
            {" "}
            <CardHeader style={{ fontWeight: "bold" }}>
              {this.props.name}
            </CardHeader>
            <CardBody>
              <CardText>
                <span>({this.state.selectedIndividual.id})</span> -{" "}
                <span>{this.state.selectedIndividual.summary}</span>
              </CardText>
              <button
                onClick={this.onCancel}
                className="btn btn-primary btn-sm"
              >
                {this.state.selectedIndividual.id ? "Update" : "Insert"}
              </button>
              <button
                onClick={this.onCancel}
                className="btn btn-default btn-sm"
              >
                Cancel
              </button>
              <button onClick={this.onCancel} className="btn btn-danger btn-sm">
                Delete
              </button>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

export default FriendForm;
