import React from "react";
import { Card, CardText, CardBody, CardHeader } from "reactstrap";
import debug from "sabio-debug";
const _logger = debug.extend("E-2");
const _cbLogger = _logger.extend("CallBacks");
const _loggerState = _logger.extend("State-Updater");

class Example02 extends React.Component {
  constructor(props) {
    super(props);
    _logger("constructor");

    this.state = {
      people: [
        { id: 3, stageName: "Larry Fine", legalName: "Louis Fienberg" },
        { id: 17, stageName: "Curly Fine", legalName: "Jerome Lester Horwitz" },
        { id: 12, stageName: "Moe Howard", legalName: "Moe Howard" },
        { id: 13, stageName: "Curly Joe DeRita", legalName: "Joseph Wardell" },
      ],
      selectedPerson: null,
      peopleComponents: [],
    };
  }
  onSelectedItemChange = (person, event) => {
    _logger("onSelectedItemChange", { person });

    this.setState(() => {
      _loggerState("updater in onSelectedItemChange");
      return { selectedPerson: person };
    }, this.stateChanged);

    _logger("end of onSelectedItemChange", {
      selectedPerson: { ...this.state.selectedPerson },
    });
  };

  render() {
    //this is looping inside the render. it works, but we will make this better in a later example
    // look for the listItems used in the return statment below within a div like so: {listItems}
    const listItems = this.state.people.map((person) => {
      _logger("map call", person);

      return (
        <React.Fragment key={"PeopleTop_" + person.id}>
          <Card
            className=""
            onClick={(e) => this.onSelectedItemChange(person, e)}
          >
            <CardHeader style={{ fontWeight: "bold" }}>
              {person.stageName}
            </CardHeader>
            <CardBody>
              <CardText>
                <span>({person.id})</span> - <span>{person.legalName}</span>
              </CardText>
            </CardBody>
          </Card>
        </React.Fragment>
      );
    });

    return (
      <React.Fragment>
        {/* code remove */}
        <div className="row">
          <div className="col-sm-6">
            <div className="panel panel-default">
              <div className="panel-heading">People</div>
              <div className="panel-body">{listItems}</div>
            </div>
          </div>
          {/* code remove to focus on listItems */}
        </div>
      </React.Fragment>
    );
  }
}

export default Example02;
