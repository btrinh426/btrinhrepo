import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Product from './components/ProductForm';
import Friends from './components/Friends';
import Cars from './components/Cars';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import './index.css';
import Navigation from './components/NavBar';
// import register from './registerServiceWorker';

function App() {
	// var loggedInUser = localStorage.getItem('user');

	// var checkLoginStatus=()=>{
	//   console.log(loggedInUser);
	//   if (!loggedInUser) {
	//     replace({
	//     pathname: "/login",
	//     });
	// }
	// next();
	// }

	//*********************************** */

	// checkLoginStatus(){
	//   userService.getCurrent()
	//   .then(this.onGetCurrentSuccess)
	//   .catch(this.onGetCurrentError);
	// }

	// onGetCurrentSuccess = (response) => {
	//   //localStorage.setItem('user', response.data);
	//   console.log(response.data);

	// }

	// onGetCurrentError= (errResponse) => {
	//   console.log(errResponse);
	//   this.props.history.push('/login');
	// }

	// componentDidMount() {
	//   this.checkLoginStatus();
	// }
	return (
		<Router>
			<Navigation />
			<Route component={Cars}></Route>
			<Route path="/products" component={Home}>
				<Route path="/login" exact component={Login}></Route>
				<Route path="/register" exact component={Register}></Route>
				<Route path="/products" exact component={Product}></Route>
				<Route path="/friends" exact component={Friends}></Route>
			</Route>

			<main role="main">
				<div className="conatiner">
					<div></div>
				</div>
			</main>
		</Router>
	);
}

export default withRouter(App);
