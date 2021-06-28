import React from "react";
import { addFriend } from "./components/apiCalls.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

class AddFriend extends React.Component {
  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "Active",
    primaryImage: "",
  };

  tempFriendsAr = [
    {
      title: "Isabel Fraire",
      bio: "Splash me with stars",
      summary: "Silken butterflies concealed in his fingers",
      headline: "Silken Butterflies",
      slug: "Night shines like lightning 17",
      statusId: "Active",
      primaryImage:
        "https://www.cidcli.com/images/autores/_thumb2/isabel-fraire1.jpg",
    },
    {
      title: "Willliam Carlos Williams",
      bio: "American poet",
      summary:
        "Snow:years of anger following hours that float idly down — the blizzard drifts its weight deeper and deeper for three days or sixty years, eh?",
      headline: "Blizzard",
      slug: "One Red Wheelbarrow 18",
      statusId: "Active",
      primaryImage:
        "https://media.poetryfoundation.org/uploads/media/default/0001/22/b1538427e0ee77471a396be295eb85b4baa27e5a.jpeg?w=970&h=&fit=max&970",
    },
    {
      title: "Allen Ginsberg",
      bio: "Love",
      summary:
        "The weight of the world is love. Under the burden of solitude, under the burden of dissatisfaction the weight, the weight we carry is love.",
      headline: "Howl",
      slug: "The weight of the world is love 13",
      statusId: "Active",
      primaryImage:
        "https://legacyprojectchicago.org/sites/default/files/styles/person_primary_image/public/2019-08/Allen%20Ginsberg.jpg?itok=8RIRvkpg",
    },
    {
      title: "Emily Dickinson",
      bio: '"Hope" is the thing with feathers',
      summary:
        "To makea praire it takes a clover and one bee, One clover and a bee, And revery",
      headline: "Perching in the soul",
      slug: "Bee! I'm expecting you! 14",
      statusId: "Active",
      primaryImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Black-white_photograph_of_Emily_Dickinson2.png/220px-Black-white_photograph_of_Emily_Dickinson2.png",
    },
    {
      title: "Rita Dove",
      bio: "American poet",
      summary:
        "Imagine you wake up with a second chance: The blue jay hawks his pretty wares and the oak still stands, spreading glorious shade. If you don't look back, the future never happens.",
      headline: "Imagine you wake up with a second chance",
      slug: "Dawn Revisited 15",
      statusId: "Active",
      primaryImage:
        "https://d1tdv5xoeixo5.cloudfront.net/sites/vqr.virginia.edu/files/styles/medium/public/story-images/ritadove_credit_photo_by_fred_viebahn.jpg?itok=_8R4cqMb",
    },
    // {
    //   title: "",
    //   bio: "",
    //   summary: "",
    //   headline: "",
    //   slug: "",
    //   statusId: "Active",
    //   primaryImage: "",
    // },
  ];

  onFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let inputValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      newState[inputName] = inputValue;
      return newState;
    });
  };

  // I don't know how I added a friend with an empty URL,
  //  but I'm not doing that again!
  isValidForm(friend) {
    if (friend.title.length === 0) {
      Swal.fire("Please enter a title");
      return false;
    }
    if (friend.bio.length === 0) {
      Swal.fire("Please enter a biography");
      return false;
    }
    if (friend.summary.length === 0) {
      Swal.fire("Please enter a summary");
      return false;
    }
    if (friend.headline.length === 0) {
      Swal.fire("Please enter a headline");
      return false;
    }
    if (friend.slug.length === 0) {
      Swal.fire("Please enter a slug");
      return false;
    }
    if (friend.statusId.length === 0) {
      Swal.fire("Please enter a statusId");
      return false;
    }
    if (friend.primaryImage.length === 0) {
      Swal.fire("Please enter a primaryImage");
      return false;
    }

    return true;
  }

  // dummy to add friends while I test delete
  onAdd = (e) => {
    e.preventDefault();

    for (let index = 0; index < this.tempFriendsAr.length; index++) {
      const friend = this.tempFriendsAr[index];

      // validation - no fields should be blank
      if (!this.isValidForm(friend)) {
        return;
      }

      console.log("adding friend");
      addFriend(friend).then(this.onAddSuccess).catch(this.onAddError);
    }
  };

  // real function
  onAdd2 = (e) => {
    e.preventDefault();

    let friend = { ...this.state };

    // validation - no fields should be blank
    if (!this.isValidForm(friend)) {
      return;
    }

    console.log("adding friend");
    addFriend(friend).then(this.onAddSuccess).catch(this.onAddError);
  };

  onAddSuccess = (result) => {
    Swal.fire("Friend added.");
    this.clearForm();
  };

  clearForm = () => {};

  onAddError = (result) => {
    Swal.fire("Error adding a friend. Check form values and try again.");
  };

  render() {
    return (
      <form id="addFriendForm">
        <div className="form-floating">
          <h1 className="h3 mb-3 fw-normal">Add Friend / Contact</h1>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Title</label>
            <input
              id="title"
              className="edit-control"
              type="text"
              name="title"
              onChange={this.onFieldChange}
              value={this.state.title}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Bio</label>
            <input
              id="bio"
              className="edit-control"
              type="text"
              name="bio"
              onChange={this.onFieldChange}
              value={this.state.bio}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Summary</label>
            <input
              id="summary"
              className="edit-control"
              type="text"
              name="summary"
              onChange={this.onFieldChange}
              value={this.state.summary}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Headline</label>
            <input
              id="headline"
              className="edit-control"
              type="text"
              name="headline"
              onChange={this.onFieldChange}
              value={this.state.headline}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Slug</label>
            <input
              id="slug"
              className="edit-control"
              type="url"
              name="slug"
              onChange={this.onFieldChange}
              value={this.state.slug}
            />
          </div>

          <label className="col-sm-1 col-form-label">Status Id</label>
          <select
            className="form-select"
            // aria-label="Status Id"
            id="statusId"
            name="statusId"
            onChange={this.onFieldChange}
            value={this.state.statusId}
          >
            <option value="0"></option>
            <option value="Active">Active</option>
          </select>

          <div className="form-group-row">
            <label className="col-sm-1 col-form-label">Image</label>
            <input
              id="primaryImage"
              className="edit-control"
              type="img"
              name="primaryImage"
              onChange={this.onFieldChange}
              value={this.state.primaryImage}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          id="btn-add"
          onClick={this.onAdd}
        >
          Add
        </button>
      </form>
    );
  }
}

export default AddFriend;
