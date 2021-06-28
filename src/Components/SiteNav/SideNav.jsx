import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText} from 'react-sidebar-ui'
import 'react-sidebar-ui/dist/index.css';
import * as userService from "../../services/UserService";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";


class SiteNav extends React.Component{
  onButtonClicked = (e) =>{
    e.preventDefault();
    const data = {email: "mgcraig78@gmail.com", password: "1a$3TYx%4", tenantId: "U01GYCKSGAV"};
    userService.logIn(data)
    .then(this.onLoginSuccess)
    .catch(this.onLoginError);
  }

  onLoginSuccess = (response)=>{
    toast.success("Login Successful", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    console.log(response);
  }
  onLoginError = (errResponse)=>{
    console.log(errResponse)
  }
 
  render(){
return(
  <React.Fragment>

  <div className="container">
  <Sidebar bgColor='black' isCollapsed={false}>
    <Logo
      image='https://media1.giphy.com/media/12jwC6juDxXH8c/200w.webp?cid=ecf05e47wwlsbggvsugvaraonyw9efmubhnbpnuou02vjss0&rid=200w.webp'
      imageName='free gif'/>
    <LogoText>HELLO</LogoText>
    <DropdownItem
      values={['First', 'Second', 'Third']}
      bgColor={'black'}>
      Main Navigation
    </DropdownItem> 

    <Link to="/Home">
    <Item bgColor='black'>
      <Icon><i className="fas fa-home"/></Icon>    
      Home
    </Item>
    </Link>
    <Link to="/Register">       
    <Item bgColor='black'>
      <Icon><i className="fas fa-info"/></Icon>
      Register
    </Item>
    </Link>
    <Link to="/Form">
    <Item bgColor='black'>
      <Icon><i className="fas fa-sitemap"/></Icon>
      Add Record
    </Item>
    </Link>
    <Link to="/Content">
    <Item bgColor='black'>
      <Icon><i className="far fa-address-book"/></Icon>
      Static Page
    </Item>
    </Link>
    <Link to="/">
    <Item bgColor='black'>
      <Icon><i className="fas fa-rss-square"/></Icon>
      Login
    </Item>
    </Link>

    <InputItem type='text' className="form-control mr-sm-2" aria-label="Search" placeholder={'Search...'}/>
    <form className="form-inline my-2 my-lg-0">
           <button
             className="btn btn-outline-light my-2 my-sm-0"
             type="submit"
           >
             Search
           </button>
    </form>
  </Sidebar>
</div>

</React.Fragment>
    )
}
}


export default SiteNav;




  /*
import * as userService from "../../services/UserService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";





const mql = window.matchMedia(`(min-width: 800px)`);


    constructor(props) {
      super(props);
      this.state = {
        sidebarDocked: mql.matches,
        sidebarOpen: false
      };
   
      this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
   
    componentWillMount() {
      mql.addListener(this.mediaQueryChanged);
    }
   
    componentWillUnmount() {
      this.state.mql.removeListener(this.mediaQueryChanged);
    }
   
    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }
   
    mediaQueryChanged() {
      this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    } 
    

  onButtonClicked = (e) =>{
    e.preventDefault();
    const data = {email: "mgcraig78@gmail.com", password: "1a$3TYx%4", tenantId: "U01GYCKSGAV"};
    userService.logIn(data)
    .then(this.onLoginSuccess)
    .catch(this.onLoginError);
  }

  onLoginSuccess = (response)=>{
    toast.success("Login Successful", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    console.log(response);
  }
  onLoginError = (errResponse)=>{
    console.log(errResponse)
  }
 
  

render(){
    return(
      
      <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <b>
        <React.Fragment>
       
       <button className="link-button navbar-brand">Hello</button>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarsExampleDefault"
         aria-controls="navbarsExampleDefault"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>


       <div className="collapse navbar-collapse" id="navbarsExampleDefault">
         <ul className="navbar-nav mr-auto">
           <li className="nav-item active">
             <Link to="/" className="nav-link link-button">
               Home <span className="sr-only">(current)</span>
             </Link>
           </li>
           <li className="nav-item">
             <Link to="/Form" className="nav-link link-button">
               General Form
             </Link>
           </li>
           <li className="nav-item">
             <Link to="/Form2" className="nav-link link-button">
               Register
             </Link>
           </li>
           <li className="nav-item">
             <Link to="/Content" className="nav-link link-button">
               Other Content
               </Link>
           </li>
         </ul>

         <form className="form-inline my-2 my-lg-0">
           <input
             className="form-control mr-sm-2"
             type="text"
             placeholder="Search"
             aria-label="Search"
           />
           <button
             className="btn btn-outline-success my-2 my-sm-0"
             type="submit"
           >
             Search
           </button>
         </form>
         <button
             className="btn btn-outline-info my-2 my-sm-0"
             type="button" onClick={this.onButtonClicked}
           >
             Login
           </button>
       </div>

</React.Fragment>



        </b>



      </Sidebar>
    */