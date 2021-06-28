import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Signup from './pages/Signup';
import Login from './pages/Login';
import "./App.css";

class App extends Component {
  state= {
    currentUser: {}
  }

  setCurrentUser = user => {
    this.setState({ currentUser: user})
  }

  render() {
    return (
      
      <Router>
        {console.log('curUser ',this.state.currentUser)}
        <Nav />
        <Switch>
            <Route path='/' exact render={ () => <Home user={this.state.currentUser} exact />} />
            <Route path='/about' component={About} />
            <Route path='/products' render={ (routeProps) => <Products {...routeProps}  user={this.state.currentUser } />} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' render={ (routeProps) => <Login {...routeProps} setCurrentUser={this.setCurrentUser} />} />
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
