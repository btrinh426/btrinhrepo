import React from "react";

class Form extends React.Component{
    render(){
        return(
            <React.Fragment>
            <div class= "container">
            <div class="card mx-12 px-12 card-record col-md-4">
            <h5>Add Info:</h5>
            <form id="formTwo">
              <div class="form-group">
                <label for="artist-name"></label>
                <input id="artist-name" name="artist-name" class="form-group" placeholder="Your Name" />
                <label for="album-title"></label>
                <input id="album-title" name="album-title" class="form-group" placeholder="Title" />
                <label for="year-released"></label>
                <input id="year-released" name="year-released" class="form-group" placeholder="Favorite Food" />
                <label for="image"></label>
                <input id="image" name="image" type="url" class="form-group" placeholder="Website" />
                <button id="addRecord" type="submit" class="btn btn-info mx-6">Submit</button>
              </div>
            </form>
          </div>
          </div>
          </React.Fragment>
        )
    }
}
export default Form;