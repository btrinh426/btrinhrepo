import React from "react";
/*
friends list in same component as search box & button
concant to url + Id for Put url incorporate page index and page count as parameters for GET by pagination request (string concatenation or string interpolationin)
for pagination you are basically incrementing page with a certain amount of search results per pay () dont forget about the zero-based index
*/

class Friends extends React.Component {
  state = {
    friends: [
      {
        title: "JC",
        bio: "Example bio",
        summary: "Example summary",
        headline: "Example headline",
        slug: "@JCMZ",
        statusId: "Active",
        primaryImage:
          "https://c8.alamy.com/comp/MFP9A1/chimpanzee-pan-troglodytes-trained-animal-with-man-clothes-MFP9A1.jpg",
      },
      {
        title: "Looch",
        bio: "Example bio",
        summary: "Example summary",
        headline: "Example headline",
        slug: "@L00CH",
        statusId: "Active",
        primaryImage:
          "https://www.rd.com/wp-content/uploads/2020/11/GettyImages-889552354-e1606774439626.jpg",
      },
      {
        title: "Joey",
        bio: "Example bio",
        summary: "Example summary",
        headline: "Example headline",
        slug: "@JOE-Y",
        statusId: "Active",
        primaryImage:
          "https://movia.media/wp-content/uploads/covidrecession.jpg",
      },
      {
        title: "Sam",
        bio: "Example bio",
        summary: "Example summary",
        headline: "Example headline",
        slug: "@Sammi3",
        statusId: "Active",
        primaryImage:
          "https://numeralpaint.com/wp-content/uploads/2020/08/Third-eye-psychedelic-art-adult-paint-by-numbers.jpg",
      },
      {
        title: "Ruth-Anne",
        bio: "Example bio",
        summary: "Example summary",
        headline: "Example headline",
        slug: "@RuthAnne",
        statusId: "Active",
        primaryImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxC9JnOh3q3a8uofEQHrZNSU-h2oXnqHkiqA&usqp=CAU",
      },
      {
        title: "Yulet",
        bio: "Example bio",
        summary: "Example summary",
        headline: "Example headline",
        slug: "@YSR",
        statusId: "Active",
        primaryImage:
          "https://i.pinimg.com/564x/7f/03/ed/7f03ede8a2b6341ccc42f205c36479b7.jpg",
      },
    ],
  };

  componentDidMount() {}

  mapFriend = (oneFriend) => {
    return (
      <div className="card col-md-5">
        <img src={oneFriend.primaryImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{oneFriend.title}</h5>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <hr />
        <div className="row">
          <div className="col">{this.state.friends.map(this.mapFriend)}</div>
        </div>
      </div>
    );
  }
}
export default Friends;
