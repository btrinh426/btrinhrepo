import React from "react";
import FriendCard from "./FriendCard";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        {
          id: 1,
          bio:
            "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
          title: "Massimo Attersoll",
          summary: "extend bleeding-edge niches",
          headline: "Genderfluid",
          primaryImage: [{}],
          skills: null,
          slug: "aol.com",
          status: "Active",
        },
        {
          id: 2,
          bio:
            "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
          title: "Shirlene Reolfo",
          summary: "e-enable one-to-one web-readiness",
          headline: "Polygender",
          primaryImage: [{}],
          skills: null,
          slug: "mashable.com",
          status: "Active",
        },
        {
          id: 3,
          bio:
            "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
          title: "Arnie Semorad",
          summary: "cultivate holistic synergies",
          headline: "Female",
          primaryImage: [{}],
          skills: null,
          slug: "prnewswire.com",
          status: "Active",
        },
        {
          id: 4,
          bio: "In congue. Etiam justo. Etiam pretium iaculis justo.",
          title: "Culley Alden",
          summary: "productize vertical convergence",
          headline: "Male",
          primaryImage: [{}],
          skills: null,
          slug: "free.fr",
          status: "Active",
        },
        {
          id: 5,
          bio:
            "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
          title: "Bale Folkard",
          summary: "utilize B2C portals",
          headline: "Agender",
          primaryImage: [{}],
          skills: null,
          slug: "huffingtonpost.com",
          status: "Active",
        },
        {
          id: 6,
          bio:
            "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
          title: "Ferdie Lebreton",
          summary: "expedite user-centric e-markets",
          headline: "Genderfluid",
          primaryImage: [{}],
          skills: null,
          slug: "creativecommons.org",
          status: "Active",
        },
        {
          id: 7,
          bio:
            "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
          title: "Lydie Pendrick",
          summary: "brand global relationships",
          headline: "Bigender",
          primaryImage: [{}],
          skills: null,
          slug: "utexas.edu",
          status: "Active",
        },
        {
          id: 8,
          bio:
            "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
          title: "Iosep Elden",
          summary: "empower transparent deliverables",
          headline: "Bigender",
          primaryImage: [{}],
          skills: null,
          slug: "who.int",
          status: "Active",
        },
        {
          id: 9,
          bio:
            "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
          title: "Grace Kilius",
          summary: "grow transparent relationships",
          headline: "Genderfluid",
          primaryImage: [{}],
          skills: null,
          slug: "github.com",
          status: "Active",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <FriendCard name={"Branndon"} />
      </React.Fragment>
    );
  }
}

export default Friends;

// import { toast } from "react-toastify";
// import FriendCard from "./FriendCard";
// import * as friendService from "../services/friendService";

// class Friends extends React.Component {
//   const(props) {
//     super(props);
//     this.state = {
//       friends: [
//         {
//           id: "",
//           bio: "",
//           title: "",
//           summary: "",
//           headline: "",
//           primaryImage: [{}],
//           skills: null,
//           slug: "",
//           status: "",
//         },
//         {
//           id: "",
//           bio: "",
//           title: "",
//           summary: "",
//           headline: "",
//           primaryImage: [{}],
//           skills: null,
//           slug: "",
//           status: "",
//         },
//         {
//           id: "",
//           bio: "",
//           title: "",
//           summary: "",
//           headline: "",
//           primaryImage: [{}],
//           skills: null,
//           slug: "",
//           status: "",
//         },
//         {
//           id: "",
//           bio: "",
//           title: "",
//           summary: "",
//           headline: "",
//           primaryImage: [{}],
//           skills: null,
//           slug: "",
//           status: "",
//         },
//         {
//           id: "",
//           bio: "",
//           title: "",
//           summary: "",
//           headline: "",
//           primaryImage: [{}],
//           skills: null,
//           slug: "",
//           status: "",
//         },
//         {
//           id: "",
//           bio: "",
//           title: "",
//           summary: "",
//           headline: "",
//           primaryImage: [{}],
//           skills: null,
//           slug: "",
//           status: "",
//         },
//         {
//           id: "",
//           bio: "",
//           title: "",
//           summary: "",
//           headline: "",
//           primaryImage: [{}],
//           skills: null,
//           slug: "",
//           status: "",
//         },
//       ],
//       index: 0,
//       size: 3,
//     };
//   }

//   componentDidMount = () => {
//     console.log("friends loaded");
//     friendService
//       .getFriends()
//       .then(this.onGetFriendsSuccess)
//       .catch(this.onGetFriendsError);

//     // this.setState((prevState) => {
//     //   return { mappedFriends: prevState.friends.map(this.mapFriend) };
//     // });
//   };

//   onGetFriendsSuccess = (response) => {
//     console.log(response.data.item.pagedItems);
//     toast.success("congrats you have friends");

//     this.setState((prevState) => {
//       return {
//         mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
//       };
//     });
//   };

//   onGetFriendsError = (response) => {
//     console.warn(response);
//     toast.error("there was a problem loading friends");
//   };

//   onOpenAddFriends = (e) => {
//     e.preventDefault();
//     console.log("add friend button pressed");
//     this.props.history.push("/AddFriends");
//   };

//   // onDeleteSuccessClick = (e) => {
//   //   console.log(e.currentTarget);
//   //   toast.success("friend deleted");
//   // };

//   // onDeleteError = (response) => {
//   //   console.warn(response);
//   //   toast.error("friend not deleted");
//   // };

//   onEditFriendClick = (e) => {
//     console.log(e.currentTarget);
//     toast.success("friend updated");
//   };

//   // onEditError = (response) => {
//   //   console.warn(response);
//   //   toast.error("friend not updated");
//   // };

//   mapFriend = (friend) => {
//     return (
//       <React.Fragment key={friend.id}>
//         <FriendCard
//           friend={friend}
//           //onClick={this.onDeleteSuccess(friend.id)}
//           onEditClick={this.onEditFriend(friend.id)}
//         />
//       </React.Fragment>
//     );
//   };

//   render() {
//     return (
//       <>
//         <div className="container">
//           <h1>reel-life</h1>
//           <form className=".d-lg-inline-flex">
//             <button
//               type="button"
//               id="openAddFriends"
//               className="btn btn-outline-dark"
//               onClick={this.onOpenAddFriends}
//             >
//               add new friend
//             </button>
//           </form>
//         </div>
//         <div className="card-container col">
//           <h1>the family we choose</h1>
//           {/* <FriendCard /> */}
//         </div>
//         <div className="row pb-5 col-md-12 container">{this.state.friends}</div>
//       </>
//     );
//   }
// }
