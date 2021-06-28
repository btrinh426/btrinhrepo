import React from "react";
//import Update from "./Update";

function SingleFriend(props) {
  const aFriend = props.friend;

  const onDeleteClicked = function () {
    props.onClick(aFriend);
  };

  const onEditClicked = function () {
    
    props.onClick(aFriend);
  };

  return (
    <div className="card" key={`Names-${aFriend.id}`}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{aFriend.title}</h5>
        <p className="card-text">{aFriend.summary}</p>
        <button
          className="btn btn-primary link-btn"
          onClick={onEditClicked}
          data-id={aFriend.id}
        >
          edit
        </button>
        <button
          className="btn btn-primary link-btn"
          onClick={onDeleteClicked}
          data-id={aFriend.id}
        >
          delete
        </button>
      </div>
    </div>
  );
}

// renderUpdateForm = () => {
//   return (
//     <React.Fragment>
//       <div className=" update main">
//         <h3>Update Friend</h3>
//         <form id="updateForm">
//           <div className="form-group">
//             <label>Title</label>
//             <input
//               type="text"
//               className="form-control"
//               name="title"
//               value={this.state.updateForm.title}
//               onChange={this.onInputChanged}
//             />
//           </div>
//           <div className="form-group">
//             <label>Bio</label>
//             <input
//               type="text"
//               className="form-control"
//               name="bio"
//               value={this.state.updateForm.bio}
//               onChange={this.onInputChanged}
//             />
//           </div>
//           <div className="form-group">
//             <label>Summary</label>
//             <input
//               type="text"
//               className="form-control"
//               name="summary"
//               value={this.state.updateForm.summary}
//               onChange={this.onInputChanged}
//             />
//           </div>
//           <div className="form-group">
//             <label>Headline</label>
//             <input
//               type="text"
//               className="form-control"
//               name="headline"
//               value={this.state.updateForm.headline}
//               onChange={this.onInputChanged}
//             />
//           </div>
//           <div className="form-group">
//             <label>SLUG</label>
//             <input
//               type="text"
//               className="form-control"
//               name="slug"
//               value={this.state.updateForm.slug}
//               onChange={this.onInputChanged}
//             />
//           </div>
//           <div className="form-group">
//             <label>Status Id</label>
//             <input
//               type="text"
//               className="form-control"
//               name="statusId"
//               value={this.state.updateForm.statusId}
//               onChange={this.onInputChanged}
//             />
//           </div>
//           <div className="form-group">
//             <label>Primary Image</label>
//             <input
//               type="text"
//               className="form-control"
//               name="primaryImage"
//               value={this.state.updateForm.primaryImage}
//               onChange={this.onInputChanged}
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             onClick={this.onUpdateClicked}
//           >
//             Update Friend
//           </button>
//           <div></div>
//         </form>
//       </div>
//     </React.Fragment>
//   );
// };

export default React.memo(SingleFriend);
