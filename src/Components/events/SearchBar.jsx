import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="input-group col-8">
          <input
            type="text"
            className="form-control"
            name="searchString"
            onChange={this.onSearchBarChanged}
          />
          <button
            type="button"
            className="btn btn-outline-dark "
            style={{ color: "#5f5f5f", height: "75%" }}
            onClick={this.onSearchClicked}
          >
            Search
          </button>
          <button
            type="button"
            className="btn btn-outline-dark "
            style={{ color: "#5f5f5f", height: "75%" }}
            onClick={this.onAddClicked}
          >
            Reset
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBar;
