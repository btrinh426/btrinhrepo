import React from "react";
import userService from "../userService";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  state = {
    user: {
      name: false,
      id: " ",
    },
  };

  componentDidMount() {
    console.log("mounted");
    userService
      .currentUser()
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  getUserById = (userId) => {
    userService
      .userById(userId)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log(response);
    this.setState({
      user: {
        name: response.data.item.name,
        id: response.data.item.id,
      },
    });
  };

  onActionError = () => {
    console.log("error");
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="jumbotron"
          style={{
            backgroundImage: `url("https://media4.giphy.com/media/1rNWZu4QQqCUaq434T/giphy.gif?cid=ecf05e47ohc74w9d1hgmieubeapokxj45xhe356b945j7z6s&rid=giphy.gif")`,
            backgroundSize: "cover",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div className="container">
            {this.state.user.name && (
              <h4 className="display-3" style={{ color: "white" }}>
                Welcome, {this.state.user.name}
                <br />
              </h4>
            )}
          </div>

          <p style={{ color: "white" }}>
            Behold the gloriousness and beauty of this metallic box
            <br />
            floating away while engulfed: the perfect metaphor of our
            <br />
            connections here in this virtual dumpster fire world.
            <br />
          </p>
          <p>
            <button
              className="btn btn-primary btn-lg"
              onClick={this.getCurrent}
            >
              <NavLink to="/Friends" style={{ color: "white" }}>
                Follow the floating dumpster &raquo;
              </NavLink>
            </button>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

/*
getCurrentUser = (firstName) => {
    userService
      .userByName(firstName)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  getUserAvatar = (avatarUrl) => {
    userService
      .userByAvatar(avatarUrl)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };


showUserName = (user) => {
    console.log(user);
    let name = user.name;
    let thisUser = user.key;

    let showName = <p key={thisUser}>{name}</p>;
    return showName;
  };
*/
