import React from "react";

import Friends from "./Friends";

class HomePage extends React.Component {
  render() {
    return (
      <div className="container">
        <main>
          <Friends></Friends>
        </main>
      </div>
    );
  }
}

export default HomePage;
