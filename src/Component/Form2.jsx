import React from "react";

class Form2 extends React.Component {
  render() {
    return (
      <form style={{ margin: "100px " }}>
        <div>
          <label>
            <h1 style={{ margin: "30px" }}>I grabbed these values</h1>
          </label>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="title"
              name="title"
              placeholder="ie. Web Developer"
              value={this.state.formData.title}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="body">Body</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="body"
              name="body"
              placeholder="Add info here to create a short personal bio"
              value={this.state.formData.body}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="userId">UserId</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="userId"
              name="userId"
              placeholder="Here would be a good place to list a few of your accomplishments"
              value={this.state.formData.userId}
            ></input>
          </div>
        </div>
      </form>
    );
  }
}
export default Form2;
