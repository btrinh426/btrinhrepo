import React from "react";
// import Nav from '../components/Nav';
import Jumbo from "../components/Jumbo";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Home = ({ user }) => {
  return (
    <>
      <main role="main">
        <Jumbo user={user} />
        <Content />
      </main>
      <Footer />
    </>
  );
};

export default Home;
