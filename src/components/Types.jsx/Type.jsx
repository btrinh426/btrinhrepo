import React, { Component } from "react";
import Types from "./Types";
import debug from "sabio-debug";

const _logger = debug.extend("Type");

class Type extends Component {
  state = {
    title: "John Doe",
    bio: "bio",
    summary: "summary",
    headline: "headline",
    slug: "slug",
    statusId: 1,
    imageTypeId: 2,
    imageString: "imageString",
    primaryImageId: 1,
  };

  render() {
    _logger("rendering...");
    return (
      <Types
        title={this.state.title}
        bio={this.state.bio}
        summary={this.state.summary}
        headline={this.state.headline}
        slug={this.state.slug}
        statusId={this.state.statusId}
        imageTypeId={this.state.imageTypeId}
        imageString={this.state.imageString}
        primaryImageId={this.state.primaryImageId}
      />
    );
  }
}

export default Type;
