import React from "react";
import friendService from "../friendService";
import { toast } from "react-toastify";

class AddFriends extends React.Component {
  state = {
    friendData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
  };

  onAddFriendForm = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let friendData = { ...this.state.friendData };

      friendData[inputName] = newValue;

      return { friendData };
    });
  };

  buttonClicked = (e) => {
    e.preventDefault();

    friendService
      .addFriend({ ...this.state.friendData })
      .then(this.onAddFriendSuccess)

      .catch(this.onAddFriendError);
  };

  onAddFriendSuccess = () => {
    toast.success("Friend added!");
  };

  onAddFriendError = () => {
    console.log("error");
    toast.error("You have no friends, loser!");
  };

  render() {
    return (
      <div
        className="form-content row justify-content-center"
        style={{
          backgroundImage: `url("https://www.pngkit.com/png/detail/559-5599435_justin-bieber-purpose-dumpster-fire-clipart.png")`,
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="col-4">
          <div className="form-group   row justify-content-center">
            <div
              style={{
                padding: "5px",
                color: "dark-gray",
                float: "left",
                textDecoration: "underline",
                marginTop: "5px",
                marginBottom: "30px",
              }}
            />
            <h3>ADD FRIEND / ENEMY / FRENEMY </h3>
          </div>
          <div>
            <h6
              style={{
                margin: "5px",
                color: "dark-gray",
                align: "center",
              }}
            >
              NAME
            </h6>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.onAddFriendForm}
              value={this.state.friendData.title}
            />
          </div>

          <div>
            <h6
              style={{
                margin: "5px",
                color: "dark-gray",
                align: "center",
              }}
            >
              BIO
            </h6>
            <input
              type="text"
              className="form-control"
              name="bio"
              onChange={this.onAddFriendForm}
              value={this.state.friendData.bio}
            />
          </div>

          <div>
            <h6
              style={{
                margin: "5px",
                color: "dark-gray",
                align: "center",
              }}
            >
              SUMMARY
            </h6>
            <input
              type="text"
              className="form-control"
              name="summary"
              onChange={this.onAddFriendForm}
              value={this.state.friendData.summary}
            />
          </div>

          <div>
            <h6
              style={{
                margin: "5px",
                color: "dark-gray",
                align: "center",
              }}
            >
              HEADLINE
            </h6>
            <input
              type="text"
              className="form-control"
              name="headline"
              onChange={this.onAddFriendForm}
              value={this.state.friendData.headline}
            />
          </div>

          <div>
            <h6
              style={{
                margin: "5px",
                color: "dark-gray",
                align: "center",
              }}
            >
              SLUG
            </h6>
            <input
              type="text"
              className="form-control"
              name="slug"
              onChange={this.onAddFriendForm}
              value={this.state.friendData.slug}
            />
          </div>

          <div>
            <h6
              style={{
                margin: "5px",
                color: "dark-gray",
                align: "center",
              }}
            >
              STATUS
            </h6>
            <input
              type="text"
              className="form-control"
              name="statusId"
              onChange={this.onAddFriendForm}
              value={this.state.friendData.statusId}
            />
          </div>

          <div>
            <h6
              style={{
                margin: "5px",
                color: "dark-gray",
                align: "center",
              }}
            >
              SKILLS
            </h6>
            <input
              type="text"
              className="form-control"
              name="skills"
              onChange={this.onAddFriendForm}
              value={this.state.friendData.skills}
            />
          </div>

          <div>
            <h6
              style={{
                margin: "5px",
                color: "dark-gray",
                align: "center",
              }}
            >
              IMAGE
            </h6>
            <input
              type="url"
              className="form-control"
              name="primaryImage"
              onChange={this.onAddFriendForm}
              value={this.state.friendData.primaryImage}
            />
            <div>
              <p>
                <button
                  className="btn btn-secondary btn-lg"
                  style={{ margin: "25px 0 50px 350px" }}
                  onClick={this.getCurrent}
                >
                  ADD
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddFriends;
