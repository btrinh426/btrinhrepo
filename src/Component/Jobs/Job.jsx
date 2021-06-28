import React from "react";

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
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default Job;
