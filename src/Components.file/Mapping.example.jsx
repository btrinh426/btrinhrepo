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

  stateChanged = () => {
    _cbLogger("state change", this.state);
  };

  static getDerivedStateFromProps(props, state) {
    _logger("getDeriverStateFromProps", { props, state });
    //this function must return something. we return null to signal that no state is being derived from props
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = true;
    // _logger("shouldComponentUpdate", {
    //   shouldUpdate,
    //   nextState,
    //   thisState: this.state
    // });

    if (nextState.selectedPerson === this.state.selectedPerson) {
      shouldUpdate = false;
    }
    _logger("shouldComponentUpdate", {
      shouldUpdate,
      nextState,
      thisState: this.state,
    });
    return shouldUpdate;
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
    _logger("render with this state", {
      state: this.state,
      selectedPerson: this.state.selectedPerson,
    });

    //this is looping inside the render. it works, but we will make this better in a later example
    // look for the listItems used in the return statment below within a div like so: {listItems}
    const listItems = this.state.people.map((person) => {
      _logger("map call", person);

      return (
        <React.Fragment key={"PeopleTop_" + person.id}>
          <Card
            className=""
            onClick={(e) => this.onSelectedItemChange(person, e)} //this arrow function works, but it is an opportunity for us to improve performance later
          >
            {" "}
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
        <h3>Example 2 - Displaying a List</h3>
        <h5>Demonstrates</h5>
        <ul>
          <li>More complex Component State with Array properties</li>
          <li>Rendering list with map()</li>
          <li>Events with parameters</li>
        </ul>
        <div className="row">
          <div className="col-sm-6">
            <div className="panel panel-default">
              <div className="panel-heading">People</div>
              <div className="panel-body">{listItems}</div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-default">
              <div className="panel-heading">Selected Person</div>
              <div className="panel-body">
                {this.state.selectedPerson && (
                  <Card className="">
                    {" "}
                    <CardHeader style={{ fontWeight: "bold" }}>
                      {this.state.selectedPerson.stageName}
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        <span>({this.state.selectedPerson.id})</span> -{" "}
                        <span>{this.state.selectedPerson.legalName}</span>
                      </CardText>
                    </CardBody>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Example02;
