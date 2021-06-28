import React from "react";
import * as service from "../services/userService";
class Presidents extends React.Component {
  state = {
    presidents: [
      {
        name: "George Washington",
        president: 1,
        id: 1,
        pp: "None, Federalist",
        tm: "1789-1801",
        avatar: "https://npg.si.edu/sites/default/files/vd_washington2.jpg",
      },
      {
        name: "Thomas Jefferson",
        id: 2,
        president: 3,
        pp: "Democratic-Republican",
        tm: "1789-1801",
        avatar:
          "https://www.biography.com/.image/t_share/MTY2NzAyNTE0NTAxMDY3ODMx/thomas-jefferson_editedjpg.jpg",
      },
      {
        name: "John Adams",
        id: 3,
        pp: "Federalist",
        president: 2,
        tm: "1789-1801",
        avatar:
          "https://www.bostonteapartyship.com/wp-content/uploads/2019/09/john-adams-portrait-3.jpg",
      },
    ],
  };

  componentDidMount() {
    // this.setState((preState) => {
    //   return { mappedPresidents: preState.presidents.map(this.mapPresidents) };
    // });

    service.getPresidents().then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (myPresidents) => {
    console.log(myPresidents);

    this.setState((preState) => {
      return { mappedPresidents: myPresidents.map(this.mapPresidents) };
    });
  };
  onGetError = (err) => {
    console.error(err);
  };

  mapPresidents = (onePresident) => {
    return (
      <React.Fragment key={`PresList-${onePresident.id}`}>
        <div className="card col-md-3">
          <img src={onePresident.avatar} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{onePresident.name}</h5>
            <p className="card-text">
              <strong>{onePresident.pp}</strong> Information about the
              Presidents.
            </p>
            <a className="btn btn-primary link-button">Go somewhere</a>
          </div>
        </div>
      </React.Fragment>
    );
  };

  mapPresidentSimple = (onePresident) => {
    return <p key={`PresList-${onePresident.id}`}>{onePresident.name}</p>;
  };

  render() {
    return (
      <div className="col-me-12 p-5">
        <h1>Presidents</h1>
        <hr />
        <div className="row">
          {/* {this.state.presidents.map(this.mapPresidents)} */}
          {this.state.mappedPresidents}
        </div>
      </div>
    );
  }
}

export default Presidents;
