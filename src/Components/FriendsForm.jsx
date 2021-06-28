import React from "react";
import * as friendService from "../services/friendService";
import debug from "sabio-debug";

const _logger = debug.extend("example");

class FriendsForm extends React.Component {
  constructor(props) {
    super(props);
    _logger("constructor");
    this.state = {
      friend:{} 
       
    };
  }
  
  onFriendChanged = (event) => {
    console.log("onChange", {syntheticEvent: event})
    
    // capture the info you need from the event here as the event object will fall out of scope quickly

    // this is the value of the inpie

    const target = event.target;
    
    
    const value = target.value;
    
    
    const name = target.name;

    this.setState(prevState => {
      const updatedFormData = { 
        ...prevState.friend 
      };
      
      updatedFormData[name] = value;
      
      return { friend: updatedFormData };
    }, this.stateChanged);
  };


 
  
  render() {
    return (
      <div className="m-container">
        <form>
          <div className="row"></div>
          <div className="col-me-12 p-5">
            <h1>User Profile</h1>
            <hr />
            <div className="row">
              <div className="col-3"></div>
            </div>
            <div className="col-3">
              <label htmlFor="email">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Name"
                onChange={this.onFriendChanged}
                value={this.state.friend.title}
              />
            </div>
            <div className="col-3">
              <label htmlFor="email">Bio</label>
              <input
                type="text"
                className="form-control"
                name="bio"
                placeholder="Bio"
                onChange={this.onFriendChanged}
                value={this.state.friend.bio}
              />
            </div>
            <div className="col-3">
              <label htmlFor="exampleInputPassword1">Summary</label>
              <input
                type="text"
                className="form-control"
                name="summary"
                placeholder="Sum it up"
                onChange={this.onFriendChanged}
                value={this.state.friend.summary}
              />
            </div>
            <div className="col-3">
              <label htmlFor="exampleInputPassword1">Headline</label>
              <input
                type="text"
                className="form-control"
                name="headline"
                placeholder="Quick Quote"
                onChange={this.onFriendChanged}
                value={this.state.friend.headline}
              />
            </div>
            <div className="col-3">
              <label htmlFor="exampleInputPassword1">Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                placeholder="Say a little something"
                onChange={this.onFriendChanged}
                value={this.state.friend.slug}
              />
            </div>
            <div className="col-3">
              <label htmlFor="exampleInputPassword1">Status</label>
              <input
                type="text"
                className="form-control"
                name="status"
                placeholder="1"
                onChange={this.onFriendChanged}
                value={this.state.friend.status}
              />
            </div>
            <div className="col-3">
              <label htmlFor="exampleInputPassword1">Skills</label>
              <input
                type="text"
                className="form-control"
                name="skills"
                placeholder="Skill Set"
                onChange={this.onFriendChanged}
                value={this.state.friend.skills}
              />
            </div>
            <div className="col-3">
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  {" "}
                  Primary Image
                </label>
                <input
                  onChange={this.onFriendChanged}
                  value={this.state.friend.primaryImage}
                  type="text"
                  className="form-control"
                  multiple
                />
              </div>

              <div class="invalid-feedback">
                Example invalid form file feedback
              </div>
            </div>
            <div className="col-3 p-3 bg " />
            <button
              type="button"
              className="btn btn-primary btn"
              onClick={this.onSubmitClick}
            >
              {this.state.friend.id ? "Update" : "Add Friend"}
            </button>
            &nbsp;
            <div className="p-3"></div>
          </div>
        </form>
      </div>
    );
  }
}

export default FriendsForm;
