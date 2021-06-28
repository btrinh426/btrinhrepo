import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
//import Navbar from 'bootstrap-css-only/css/bootstrap.min.css';
//import Navbar from 'react-bootstrap/Navbar';
// import "mdbreact/dist/css/mdb.css";
import './index.css';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<App />
		<ToastContainer />
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();
