import React from "react";
import debug from "sabio-debug";
import UserSimple from "./UserSimple";
import * as userService from "../services/userService";
const _logger = debug.extend("StatePage");

const _cbLogger = _logger.extend("Call-Back-StateChanged");

class SetState extends React.Component {
  constructor(props) {
    super(props);
    _logger("constructor");
    this.state = {
      count: 0,
      people: [
        { name: "Allen", id: 1 },
        { name: "Bob", id: 2 },
      ],
      peopleComponents: [],
    };
  }

  onClickChangeState = (e) => {
    this.setState({ one: 1 }, () => {
      _cbLogger("changed to { one: 1 }", this.state);
    });

    _logger(
      "after call to setState. Wanted { one: 1 } and we have:",
      this.state
    );

    this.setState({ two: 2 }, () => {
      _cbLogger("changed to { two: 2 }", this.state);
    });

    _logger(
      "after call to setState. Wanted { two: 2 } and we have:",
      this.state
    );

    this.setState({ three: 3 }, () => {
      _cbLogger("changed to  { three: 3}", this.state);
      _cbLogger("will now change state here based on current this.state");
      //this.finalChange();
    });

    _logger(
      "after call to setState. Wanted { two: 3 } and we have:",
      this.state
    );
  };

  onGetUsersSuccess = (e) => {
    _logger("onGetUsersSuccess");

    this.setState(
      () => {
        _logger("changing state in onGetUsersSuccess");
        return { one: 11 };
      },
      () => {
        _cbLogger("changed to { one: 11 }", this.state);
      }
    );

    _logger(
      "after call to setState. Wanted { one: 11 } and we have:",
      this.state
    );

    this.setState({ two: 22 }, () => {
      _cbLogger("changed to { two: 22 }", this.state);
    });

    _logger(
      "after call to setState. Wanted { two: 22 } and we have:",
      this.state
    );

    this.setState({ three: 33 }, () => {
      _cbLogger("changed to  { three: 33}", this.state);
    });

    _logger(
      "after call to setState. Wanted { three: 33 } and we have:",
      this.state
    );
  };
  onClickGetUsers = (e) => {
    _logger("onClickGetUsers");
    userService.getUsers().then(this.onGetUsersSuccess);
  };

  finalChange = () => {
    this.setState((prev) => {
      return { count: prev.count + 1 };
    });
  };

  onAddUsers = (e) => {
    //let newUser = { name: "NewUser", id: new Date().getMilliseconds() };

    // let timsPeople = [...this.state.people];
    // timsPeople.push(newUser);
    // let somethingElse = timsPeople.map(this.mapUser);

    this.setState(
      (prevState) => {
        const newUser = { name: "NewUser", id: new Date().getMilliseconds() };
        let newPeople = [...prevState.people];
        newPeople.push(newUser);
        let somethingElse = newPeople.map(this.mapUser);
        return {
          people: newPeople,
          peopleComponents: somethingElse,
        };
      },
      () => {
        _cbLogger("onAddUser state changed ", this.state);
      }
    );
  };

  mapUser = (user) => {
    _logger("mapUser", { user });
    return (
      <div key={user.id}>
        <UserSimple name={user.name} count={this.state.people.length} />
      </div>
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    _logger("shouldComponentUpdate firing in Life Cycle", { nextState });
    return true;
  }

  static getDerivedStateFromProps(props, state) {
    _logger("getDerivedStateFromProps firing in Life Cycle");
    let stateToReturn = null;
    return stateToReturn;
  }

  componentDidMount() {
    _logger("componentDidMount firing in Life Cycle");
    let peopleComponents = this.state.people.map(this.mapUser);

    this.setState(
      () => {
        _logger("componentDidMount return new state to React");
        return { peopleComponents };
      },
      () => {
        _cbLogger("state changed within componentDidMount", this.state);
      }
    );

    _logger("----------end of cycle (componentDidMount)---------------");
  }

  componentDidUpdate() {
    _logger("componentDidUpdate firing in Life Cycle");
    _logger("----------end of cycle---------------");
  }

  render() {
    _logger("rendering", { state: this.state });

    return (
      <div className="container state-calls">
        <div className="row">
          <div className="col-6">
            <h1>Set State Calls</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ul>
              <li className="py-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={this.onClickChangeState}
                >
                  Change State Three Times on Click
                </button>
              </li>

              <li className="py-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={this.onClickGetUsers}
                >
                  Get Users
                </button>
              </li>
              <li className="py-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={this.onAddUsers}
                >
                  Add Users
                </button>
              </li>
            </ul>
          </div>
        </div>
        {this.state.peopleComponents}
      </div>
    );
  }
}

export default SetState;
