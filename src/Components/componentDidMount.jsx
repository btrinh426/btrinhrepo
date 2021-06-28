import React from "react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "danielm1013@yahoo.com",
      password: "!QAZ2wsx",
      tenantId: "U01N8MYLM8C",
    };
  }

  componentDidMount() {
    fetch("https://api.remotebootcamp.dev/api/users/login")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map((item) => (
            <li key={item.email}>
              {item.password} {item.tenantId}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default MyComponent;
