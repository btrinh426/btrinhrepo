import React from "react";
// import * as service from "../services/presidentService";

class Presidents extends React.Component {
  state = {
    names: ["George Washington", "John Adams", "Thomas Jefferson"],
    presidents: [
      {
        id: 1,
        president: 1,
        nm: "George Washington",
        pp: "None, Federalist",
        tm: "1789-1797",
        avatar:
          "data:image/jpeg;base64,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",
      },
      {
        id: 2,
        president: 2,
        nm: "John Adams",
        pp: "Federalist",
        tm: "1797-1801",
        avatar:
          "data:image/jpeg;base64,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",
      },
      {
        id: 3,
        president: 3,
        nm: "Thomas Jefferson",
        pp: "Democratic-Republican",
        tm: "1801-1809",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/b/b1/Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29%28cropped%29.jpg",
      },
    ],
  };

  componentDidMount() {
    this.setState((preState) => {
      return { mappedPresidents: preState.presidents.map(this.mapPresident) };
    });
  }

  // componentDidMount() {
  //   service.getPresidents().then(this.onGetSuccess).catch(this.onGetError);
  // }

  // onGetSuccess = (response) => {
  //   console.log(response);
  // };

  // onGetError = (err) => {
  //   console.log(err);
  // };

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
