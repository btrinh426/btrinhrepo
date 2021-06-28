import React from "react";
import * as JobService from "../../services/FriendService";

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        profile: "",
        summary: "",
        headline: "",
        contactInformation: "",
        slug: "",
        statusId: "",
        images: [
          {
            imageTypeId: "",
            imageUrl: "",
          },
        ],
        tags: ["string"],
        friendIds: [0],
      },
    };
  }

  render() {
    return <form className="form-inline my-2 my-lg-0"></form>;
  }
}

export default Job;
