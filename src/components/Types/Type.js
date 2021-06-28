import React, { Component } from "react";
import Types from "./Types";

class Type extends Component {
  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: true,
    primaryImage: "",
  };
  logBio = () => {
    console.log(this.state.bio);
  };

  render() {
    return (
      <Types
        title={this.state.title}
        bio={this.state.bio}
        summary={this.state.summary}
        headline={this.state.headline}
        slug={this.state.slug}
        statusId={this.state.statusId}
        primaryImage={this.state.primaryImage}
        logBio={this.state.logBio}
      />
    );
  }
}

export default Type;
