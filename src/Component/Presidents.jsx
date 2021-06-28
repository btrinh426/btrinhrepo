import React from "react";
import service from "../services/presidentService";

class Presidents extends React.Component {
  state = {
    names: ["George Washington", "John Adams", "Thomas Jefferson"],
  };

  componentDidMount() {
    service.getPresidents().then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    console.log(response);
  };

  onGetError = (err) => {
    console.log(err);
  };

  mapPresident = (onePresident) => {
    return (
      <React.Fragment key={`Presidents-${onePresident.id}`}>
        <div className="card col-md-3">
          <img src={onePresident.avatar} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{onePresident.nm}</h5>
            <p className="card-text">
              <strong>{onePresident.pp}</strong>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button className="btn btn-primary link-button">
              Go somewhere
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  mapPresidentSimple = (onePresident) => {
    return <p key={`Presidents-${onePresident.id}`}>{onePresident.nm}</p>;
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Presidents</h1>
        <hr />
        <div className="row">
          {/* {this.state.presidents.map(this.mapPresident)} */}
          {this.state.mappedPresidents}
        </div>
      </div>
    );
  }
}

export default Presidents;
