import React from "react";

class BackgroundImage extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${require("./services/Images/dumpster-fire.gif")})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
      ></div>
    );
  }
}

export default BackgroundImage;
