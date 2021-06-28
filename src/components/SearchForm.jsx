import React from "react";

class SearchForm extends React.Component {
  state = {
    searchBox: "",
  };

  onFieldChanged = (e) => {
    // console.log(e)

    var currentTarget = e.currentTarget;
    var newValue = currentTarget.value;

    // console.log(newValue)

    this.setState(
      (prevState) => {
        var searchBox = { ...prevState.searchBox };

        searchBox = newValue;

        return { searchBox };
      }
      // ,
      // () => console.log(this.state)
    );
  };

  onSearchSubClicked = (e) => {
    e.preventDefault();
    var searchInfo = this.state.searchBox;

    this.props.onSearchSubmit(searchInfo);
    //you want to return the inforation you need to make the ajax call.
    //you dont want the ajax call ehre because you dont know if youre going ot use it on other components....
  };

  render() {
    // console.log("youll need a function call to enable this in page....")
    // console.log(
    //   this.props.onSearchSubmit
    //     ? `onSearchSubmit is hooked up to props`
    //     : `make sure you wire up this.props.onSearchSubmit correctly`
    // );
    return (
      <React.Fragment>
        <form className="d-flex">
          <input
            className="form-control me-2"
            id="search"
            name="search"
            type="search"
            placeholder="Search by Name"
            value={this.state.searchBox}
            onChange={this.onFieldChanged}
          />
          <button
            className="btn btn-outline-primary btn-sm"
            type="submit"
            onClick={this.onSearchSubClicked}
          >
            Search
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default SearchForm;
