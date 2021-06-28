import React from "react";

class FriendSearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchCondition: "" };
  }

  onSearch = (e) => {
    console.log("child search");
    // this.props.parentSearch("Rita");
  };

  onFormFieldChange = (e) => {
    e.preventDefault();
    console.log(e);

    this.setState(() => {
      let newState = {};
      newState[e.target.name] = e.target.value;
      return newState;
    });
  };

  render = () => {
    return (
      <form className="form-inline my-2 my-lg-0">
        <input
          id="search"
          className="edit-control"
          type="text"
          name="search"
          onChange={this.onFormFieldChange}
          value={this.state.searchCondition}
          placeholder="Search"
        />
        <button
          style={{ color: "blue" }}
          className="btn btn-primary my-2 my-sm-0 ml-3"
          onClick={this.onSearch}
        >
          Search
        </button>
      </form>
    );
  }; // end render
} // end FriendSearchForm

export default FriendSearchForm;
