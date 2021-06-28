import React, { Component } from "react";
//import "../assets/index.less";
//import "rc-select/assets/index.less";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import ProductForm from "./components/ProductForm";
import Friends from "./components/Friends";
import FriendsSearch from "./components/FriendsSearch";
import Jobs from "./components/Jobs";
import TechCompanies from "./components/TechCompanies";
import AddOrEditTechCompanies from "./components/AddOrEditTechCompanies";

import TechCompaniesCard from "./components/TechCompaniesCard";

//import JobsCard from "./components/JobsCard";
import AddOrEditJobs from "./components/AddOrEditJobs";
import FriendsFilter from "./components/FriendsFilter";
import FriendCard from "./components/FriendCard";
import AddOrEditFriends from "./components/AddOrEditFriends";
import CarsPage from "./components/CarsPage";
import CarsFilter from "./components/CarsFilter";
import CarsSearch from "./components/CarsSearch";
import Events from "./components/Events";
import Houses from "./components/Houses";
import AddOrEditHouses from "./components/AddOrEditHouses";
import HouseCard from "./components/HouseCard";

//import ConditionalRendering from "./components/ConditionalPractice";
import { currentUser } from "./services/userService";

//import Pagination from "./components/Pagination";
//import CarsPractice from "./components/CarsPractice";

// To have navbar conditionally render elements
// Navbar needs to know who the user is AFTER they login, and WITHOUT reloating the navboar (this is a single page app, psome parts will not re-render)
// The component that logs in the user should give the app component state that info
// app component needs to store the user in state (as is below)
// app component needs a function that can set it's own state, like loginUser
// app component needs to PASS this function to the login component (as a prop)
// the login component needs to call that function, passing in the user data
// this will alter the state of app, now app has the user data
// app will pass that user data to navBar, as a prop (starts as null, no value)
// Nabvar will now conditionally render different links depending on whether there is a user or not
// using {true && <element>}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  loginUser = () => {
    console.log("LOGGIN IN USER IN APP");
    currentUser()
      .then((response) => {
        console.log(response);
        this.setState({ user: response.data.item });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  logoutUser = () => {
    this.setState({ user: null });
  };

  //pass a prop called 'is logged in',if it's true in site nav, then display

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SiteNav user={this.state.user} />
          <main role="main">
            <Route path="/jumbo" exact component={Jumbo} />
            <Route path="/content" exact component={Content} />
            <Route path="/registration" exact component={Registration} />
            {/* <Route path="/login" exact component={Login} /> */}
            <Route
              path="/login"
              exact
              render={(props) => {
                return <Login loginUser={this.loginUser} {...props} />;
              }}
            />
            <Route path="/home" exact component={Home} />
            <Route path="/productForm" exact component={ProductForm} />
            <Route path="/friends" exact component={Friends} />

            <Route path="/techCompanies" exact component={TechCompanies} />
            <Route
              path="/AddOrEditTechCompanies"
              exact
              component={AddOrEditTechCompanies}
            />

            <Route
              path="/techCompaniesCard"
              exact
              component={TechCompaniesCard}
            />

            <Route path="/friendsFilter" exact component={FriendsFilter} />

            <Route path="/friendsSearch" exact component={FriendsSearch} />
            <Route path="/jobs" exact component={Jobs} />
            {/* <Route path="/paginations" exact component={Pagination} /> */}

            <Route path="/addOrEditJobs" exact component={AddOrEditJobs} />
            <Route path="/jobs/:id/edit" exact component={AddOrEditJobs} />
            {/* <Route path="/jobsCard" exact component={JobsCard} /> */}
            <Route path="/carsPage" exact component={CarsPage} />
            {/* <Route path="/carsPractice" exact component={CarsPractice} /> */}
            <Route path="/carsSearch" exact component={CarsSearch} />
            <Route path="/carsFilter" exact component={CarsFilter} />
            <Route path="/events" exact component={Events} />
            <Route path="/houses" exact component={Houses} />
            <Route path="/addOrEditHouses" exact component={AddOrEditHouses} />
            <Route path="/houseCard" exact component={HouseCard} />

            <Route path="/friendCard" exact component={FriendCard} />
            <Route
              path="/addOrEditFriends"
              exact
              component={AddOrEditFriends}
            />
            <Route
              path="/friends/:id/edit"
              exact
              component={AddOrEditFriends}
            />
          </main>
          {/* <ConditionalRendering /> */}
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
