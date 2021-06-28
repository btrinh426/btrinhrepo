import React, { Component } from "react";
import { NavLink } from "react-router-dom";




class NavBar extends Component {
    state = {
        formData: {
            search: "",
        }
    }

    onFormSearchChange = (e) => {
        console.log(e.currentTarget.name, e.currentTarget.value);
        const currentTarget = e.currentTarget;
        const newValue =
            currentTarget.type === "checkbox"
                ? currentTarget.checked
                : currentTarget.value;
        const inputName = currentTarget.name;

        this.setState(() => {
            const formData = { ...this.state.formData };
            formData[inputName] = newValue;
            return { formData };
        });
    };

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark sabio">
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <button className="nav-link link-button">
                                    <NavLink to="/welcome">Home</NavLink>
                                    <span className="sr-only">(current)</span>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link link-button">
                                    <NavLink to="/Register">People</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link link-button">
                                    <NavLink to="/Register">Blogs</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link ">
                                    <NavLink to="/login">Tech Co.</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link ">
                                    <NavLink to="/jumbo">Jobs</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link ">
                                    <NavLink to="/jumbo">Events</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link ">
                                    <NavLink to="/productList">Products</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link ">
                                    <NavLink to="/friendsList">Friends</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link ">
                                    <NavLink to="/cars">Cars</NavLink>
                                </button>
                            </li>
                        </ul>

                        <form className="form-inline my-2 my-lg-0">
                            <div id="searchBar">

                                <input
                                    className="form-control mr-sm-2"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={this.onFormSearchChange}
                                    name="search"
                                />
                                <button
                                    className="btn btn-outline-success my-2 my-sm-0"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
export default NavBar;
