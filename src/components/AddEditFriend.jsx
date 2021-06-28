import React from "react"
import * as friendService from "../services/friendService";




class AddEditFriend extends React.Component {

    render() {
        return(
            <div class="w-50 mx-auto shadow p-3 mb-5 mt-5 bg-white rounded">
            <form id="form-content">
                <div>
                    <div class="title mx-auto text-center shadow p-2 mb-5 bg-white rounded">
                        <p>User Profile</p>
                    </div>
                    <div class="form-group mt-5">
                        <label for="friend-title">Title</label>
                        <input type="text" class="form-control" id="friend-title" placeholder="Title" />
                    </div>
                    <div class="form-group">
                        <label for="friendBio">Bio</label>
                        <textarea class="form-control" id="friendBio" rows="3"></textarea>
                      </div>
                    <div class="form-group">
                        <label for="friendSummary">Summary</label>
                        <input type="text" class="form-control" id="friendSummary" placeholder="Summary" />                       
                    </div>
                    <div class="form-group">
                        <label for="friendHeadline">Headline</label>
                        <input type="text" class="form-control" id="friendHeadline" placeholder="Headline" />                       
                    </div>
                    <div class="form-group">
                        <label for="friendSlug">Slug</label>
                        <input type="text" class="form-control" id="friendSlug" placeholder="Slug" />                       
                    </div>
                    <div class="form-group">
                        <label for="friendStatus">Status</label>
                        <input type="text" class="form-control" id="friendStatus" placeholder="Status" />                       
                    </div>
                    <div class="form-group">
                        <label for="friendAvatar">Avatar URL</label>
                        <input type="text" class="form-control" id="friendAvatar" placeholder="Avatar" />                       
                    </div>
                   <button type="submit" id="submitButton" class="btn btn-primary">Submit</button>
                   <button type="submit" id="updateButton" class="btn btn-primary d-none">Update</button>
                </div>
            </form>
        </div>
        )
    }
}



export default AddEditFriend;