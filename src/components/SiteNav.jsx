import React from 'react';
import UserServices from '../services/Sabio API Ajax/userServices';

class SiteNav extends React.Component {
  
  onRegisterClick = () => {
    this.props.app.props.history.push("/register/");
  }

  onFriendsClick = () => {
    this.props.app.props.history.push("/home/friends/display/");
  }

  onJobsClick = () => {
    this.props.app.props.history.push("/jobs/");
  }

  state = {
    loggedInItemsArray:
      [{value: "Friends", onClick: this.onFriendsClick},
      {value: "Blogs", onClick: null},
      {value: "Tech Co", onClick: null},
      {value: "Jobs", onClick: this.onJobsClick},
      {value: "Events", onClick: null},
      {value: "Register", onClick: this.onRegisterClick}],
    loggedOutItemsArray: [{value: "Register", onClick: this.onRegisterClick}]
  };

  liMap = (item, i) => {
    return <li className="nav-item" key={i}><button className="nav-link" onClick={item.onClick}>{item.value}</button></li>;
  }

  onHomeClick = () => {
    this.props.app.props.history.push("/home/");
  }

  onLogoutClick = () => {
    UserServices.logout()
        .then(this.onLogoutSuccess)
        .catch(this.onError);
  };

  onLogoutSuccess = () => {
    this.props.app.setState(prevState => {prevState.isLoggedIn = false; prevState.userData = []; return prevState;})
  }

  onError = (response) => {
    console.log(response);
  }

    render(){
         return (
           <React.Fragment>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
            <button className="link-button navbar-brand" onClick={this.onHomeClick}>Home</button>
  
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav mr-auto">

                {this.props.app.state.isLoggedIn === undefined ? null :
                this.props.app.state.isLoggedIn ? 
                this.state.loggedInItemsArray.map(this.liMap) : 
                this.state.loggedOutItemsArray.map(this.liMap)}

              </ul>
            </div>
          </nav>

          {
          this.props.app.state.isLoggedIn && this.props.app.props.history.location.pathname.split("/").filter(i => {return i != ""})[0] === "home" ?
          <div style={{marginTop: '80px'}}>
            <p>Welcome to the site</p>
            <button 
            name="user-logout-button" 
            className="btn btn-primary" 
            onClick={this.onLogoutClick}
            >
            Logout
            </button>
          </div>
          :
          null
          }
          </React.Fragment>
         );
    }
}

export default SiteNav;