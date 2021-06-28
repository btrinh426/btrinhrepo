import React from "react";
import Services from "../services/Sabio API Ajax/friendServices"

class Friends extends React.Component {

    state={
        friends: [],
        payload: {
          title: "",
          bio: "",
          summary: "",
          headline: "",
          slug: "",
          statusId: "",
          primaryImage: ""
        }
    };

  componentDidMount() {
        Services.get(0, 999)
            .then(this.getSuccess)
            .catch(this.onError);
  }

  getSuccess = (response) => {
    const mappedFriends = response.data.item.pagedItems.map(friend => {
      const fCopy = {... friend};
      fCopy.primaryImage = friend.primaryImage.imageUrl;
      return fCopy;
    });

    this.setState({friends: mappedFriends});
  }

  editOnClick = (e) => {
    const id = e.currentTarget.id;
    this.props.app.props.history.push("/friends/edit/"+id+"/");
    
    const stateCopy = {... this.state};
    const friend = stateCopy.friends.filter(f => {return f.id == id})[0];

    stateCopy.payload = {
      title: friend.title,
      bio: friend.bio,
      summary: friend.summary,
      headline: friend.headline,
      slug: friend.slug,
      statusId: friend.statusId,
      primaryImage: friend.primaryImage
    };

    this.setState(stateCopy);
  }

  deleteOnClick = (e) => {
    const id = e.currentTarget.id;
    Services.remove(id)
      .then(this.onDeleteSuccess)
      .catch(this.onError);
  }

  addOnClick = () => {
    this.props.app.props.history.push("/friends/add/");
  }

  historyToArray = () => {
    const hist = this.props.app.props.history.location.pathname;
    return hist.split("/").filter(i => {return i != ""});
  }

  onInputChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    this.setState(prevState => {prevState.payload[name] = value; return prevState;});
  }

  onSubmit = () => {
    const payload = {... this.state.payload};
    const editOrAdd = this.historyToArray()[1];
    
    if(editOrAdd === "edit"){
      const id = this.historyToArray()[2];
      payload.id = id;
      Services.put(payload, id)
        .then(this.onEditSuccess)
        .catch(this.onError);
    }

    if(editOrAdd === "add"){
      Services.add(payload)
        .then(this.onAddSuccess)
        .catch(this.onError);      
    }
  }

  onAddSuccess = (response) => {
    console.log(response);
    this.setState(prevState => {
      prevState.payload.id = response.data.item;
      prevState.friends.push(prevState.payload);
      prevState.payload = {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        primaryImage: ""
      };
      return prevState;})
    this.props.app.props.history.push("/home/friends/display/");
  }

  onEditSuccess = (id) => {
    const stateCopy = {... this.state};
    const editIndex = 0;

    for(let i = 0; i<stateCopy.friends.length; i++){
      if(stateCopy.friends.id == id){editIndex = i; break;}
    }

    const newState = (stateCopy.friends[editIndex] = this.state.payload);
    
    newState.id = id;
    newState.payload = {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: ""
    };
    this.setState(newState);
    this.props.app.props.history.push("/home/friends/display/");
  }

  onDeleteSuccess = (id) => {
    const stateCopy = {... this.state};
    const deleteIndex = 0;
    for(let i = 0; i<stateCopy.friends.length; i++){
      if(stateCopy.friends.id == id){deleteIndex = i; break;}
    }
    const newState = stateCopy.friends.splice(deleteIndex, 1);
    this.setState(newState);
  }

  onError = (error) => {
    console.log({error});
  }

  render() {
    return (
      <React.Fragment>

          {
          this.historyToArray()[2] === "display" &&
              <button
              type="button"
              className="btn btn-primary"
              onClick={this.addOnClick}
              >
                Add Friend
              </button>
          }

          {
            this.historyToArray()[2] === "display" &&

            [... this.state.friends].map(friend => {
              console.log(friend);
                return (<div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src={friend.primaryImage} alt="Card image cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{friend.title}</h5>
                        <p className="card-text">{friend.summary}</p>
                        <a className="btn btn-primary" onClick={this.editOnClick} id={friend.id}>Edit</a>
                        <a className="btn btn-primary" onClick={this.deleteOnClick} id={friend.id}>Delete</a>
                    </div>
                </div>)
            })         
          }

          {console.log(this.historyToArray())}

          {
            (this.historyToArray()[1] === "add" || this.historyToArray()[1] === "edit") && 
            <form className="friend-form">

            <p className="friend-form-label">Add A New Friend</p>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Title" 
                name="title" 
                onChange={this.onInputChange}
                value={this.state.payload.title}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Biography" 
                name="bio" 
                onChange={this.onInputChange}
                value={this.state.payload.bio}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Summary" 
                name="summary" 
                onChange={this.onInputChange}
                value={this.state.payload.summary}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Headline" 
                name="headline" 
                onChange={this.onInputChange}
                value={this.state.payload.headline}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Slug" 
                name="slug" 
                onChange={this.onInputChange}
                value={this.state.payload.slug}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="statusId" 
                name="statusId" 
                onChange={this.onInputChange}
                value={this.state.payload.statusId}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Primary Image" 
                name="primaryImage" 
                onChange={this.onInputChange}
                value={this.state.payload.primaryImage}
                />
            </div>

            <button 
            name="friend-submit-button" 
            type="button" 
            className="btn btn-primary" 
            onClick={this.onSubmit}
            >
            Submit
            </button>

            </form>
          }

      </React.Fragment>
    );
  }
}

export default Friends;
