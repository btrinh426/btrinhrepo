import React from "react";
// import { NavbarToggler } from "reactstrap";
// import { Link } from "react-router-dom";

import { NavbarToggler, Button } from "reactstrap";

function NavbarTop() {
  const clickHamburger = (e) => {
    console.log("Clicked NavbarTop hamburger.");
  };

  const clickHomeButton = (e) => {
    e.preventDefault();
    console.log("Clicked home button.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath != "") {
      window.location.assign("/");
    }
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <Button
          color="link"
          id="homeButton"
          className="navbar-brand"
          data-toggle="collapse"
          data-target="#myNavbarSide"
          aria-controls="myNavbarSide"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={clickHomeButton}
        >
          Starter Tasks
        </Button>
        <NavbarToggler onClick={clickHamburger} />
        <a className="btn navbar-toggler" type="submit" href="/login" id="loginOutButton">
          Login/out<span className="fas fa-sign-in-alt"></span>
        </a>

        <form className="form-inline">
          <input className="form-control" id="searchInput" type="search" placeholder="" aria-label="Search" />
          <Button
            color="link"
            id="searchButton"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              console.log("Clicked search bar button.");
            }}
          >
            Go
          </Button>
          {/* <a className="btn navbar-toggler" id="searchButton" type="submit" href="#">
            Go<span className="fas fa-search"></span>
          </a> */}
        </form>
      </nav>
    </React.Fragment>
  );
}

// const NavbarTop = (props) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggle = () => setIsOpen(!isOpen);

//     return (
//         <div>
//           <Navbar color="light" light expand="md">
//             <NavbarBrand href="/">reactstrap</NavbarBrand>
//             <NavbarToggler onClick={toggle} />
//             <Collapse isOpen={isOpen} navbar>
//               <Nav className="mr-auto" navbar>
//                 <NavItem>
//                   <NavLink href="/components/">Components</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//                 </NavItem>
//                 <UncontrolledDropdown nav inNavbar>
//                   <DropdownToggle nav caret>
//                     Options
//                   </DropdownToggle>
//                   <DropdownMenu right>
//                     <DropdownItem>
//                       Option 1
//                     </DropdownItem>
//                     <DropdownItem>
//                       Option 2
//                     </DropdownItem>
//                     <DropdownItem divider />
//                     <DropdownItem>
//                       Reset
//                     </DropdownItem>
//                   </DropdownMenu>
//                 </UncontrolledDropdown>
//               </Nav>
//               <NavbarText>Simple Text</NavbarText>
//             </Collapse>
//           </Navbar>
//         </div>
//       );
//     }

export default NavbarTop;
