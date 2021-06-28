import React from "react";

class AddFriend extends React.Component {
  render() {
    return (
      <div className="bg-text3" /*style={{display: 'none'}*/>
        <h1>Add New Friend</h1>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-wrapper">
                <label>Title</label>
                <input type="text" id="fTitle" className="form-control" />
              </div>
              <div className="form-wrapper">
                <label>Bio</label>
                <input type="text" id="fBio" className="form-control" />
              </div>
              <div className="form-wrapper">
                <label>Summary</label>
                <input type="text" id="fSummary" className="form-control" />
              </div>
              <div className="form-wrapper">
                <label>Headline</label>
                <input type="text" id="fHeadline" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrapper">
                <label>Slug</label>
                <input type="text" id="fSlug" className="form-control" />
              </div>
              <div className="form-wrapper">
                <label>StatusId</label>
                <input type="text" id="fStatus" className="form-control" />
              </div>
              <div className="form-wrapper">
                <label>image</label>
                <input type="text" id="fImage" className="form-control" />
              </div>
            </div>
          </div>
          <button type="submit" id="newFriendBtn" className="btn btn-primary">
            Add Friend
          </button>
        </form>
      </div>
    );
  }
}
export default AddFriend;
