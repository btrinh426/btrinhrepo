import React from 'react';
import Services from '../scripts/services';
import EventHandler from '../scripts/eventHandler'
import Misc from '../scripts/misc';

class SiteNav extends React.Component {
  
  onRegisterClick = () => {
    Misc.historySet(this.props, "/register/");
  }

  onFriendsClick = () => {
    Misc.historySet(this.props, "/home/friendsDisplay/");
  }

  onJobsClick = () => {
    Misc.historySet(this.props, "/jobs/");
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
    Misc.historySet(this.props, "/home/");
  }

  onLogoutClick = () => {
    Services.userLogout()
        .then(() => {EventHandler.onLoggedInChange(false, this.props);})
        .catch();
  };

    render(){
         return (
           <React.Fragment>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
            <button className="link-button navbar-brand" onClick={this.onHomeClick}>Home</button>
  
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav mr-auto">

                {this.props.getAppState.isLoggedIn === undefined ? null :
                this.props.getAppState.isLoggedIn ? 
                this.state.loggedInItemsArray.map(this.liMap) : 
                this.state.loggedOutItemsArray.map(this.liMap)}

              </ul>
            </div>
          </nav>

          {this.props.getAppState.isLoggedIn ?
          <button 
          name="user-logout-button" 
          className="btn btn-primary" 
          onClick={this.onLogoutClick}
          style={{marginTop: '80px'}}
          >
          Logout
          </button>
          :
          null}
          </React.Fragment>
         );
    }
}

export default SiteNav;