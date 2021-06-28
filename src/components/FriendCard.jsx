import React from "react";

// class FriendCard extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     // statelkess
//     return (
//       <>
//         <div className="card">
//           <img
//             className="card-img-top"
//             src={this.props.friend.primaryImage.imageUrl}
//             alt={this.props.friend.title}
//           />
//           <div className="card-body">
//             <h5 className="card-title">{this.props.friend.title}</h5>
//             <p className="card-text">
//               <strong>{this.props.friend.bio}</strong>... Lorem Ipsum Sed ut
//               perspiciatis unde omnis iste natus error sit voluptatem
//               accusantium doloremque laudantium, totam rem aperiam,{" "}
//               {this.props.friend.id} eaque ipsa quae ab illo inventore veritatis
//               et quasi architecto beatae vitae dicta sunt explicabo.
//             </p>
//             <p className="card-text">
//               <small className="text-muted">{this.props.friend.headline}</small>
//             </p>
//             <footer className="card-footer">
//               <button
//                 className="btn btn-primary" // local fucn calls parent fun
//                 onClick={() => this.props.onEditClick(this.props.friend.id)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="btn btn-outline-danger"
//                 onClick={() => this.props.onDeleteClick(this.props.friend.id)}
//               >
//                 Delete
//               </button>
//             </footer>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

const FriendCard = (props) => {
  return (
    <>
      <div className="card">
        <img
          className="card-img-top"
          src={props.friend.primaryImage.imageUrl}
          alt={props.friend.title}
        />
        <div className="card-body">
          <h5 className="card-title">{props.friend.title}</h5>
          <p className="card-text">
            <strong>{props.friend.bio}</strong>... Lorem Ipsum Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, {props.friend.id} eaque
            ipsa quae ab illo inventore veritatis et quasi architecto beatae
            vitae dicta sunt explicabo.
          </p>
          <p className="card-text">
            <small className="text-muted">{props.friend.headline}</small>
          </p>
          <footer className="card-footer">
            <button
              className="btn btn-primary"
              onClick={() => props.onEditClick(props.friend.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => props.onDeleteClick(props.friend.id)}
            >
              Delete
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default FriendCard;
