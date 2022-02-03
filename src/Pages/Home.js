import React from "react";
import Posts from "../Components/Posts";
import Profile from "../Components/Profile";
import Works from "./Works";

const Home = () => {
  return (
    <>
      <Profile />
      <Posts />
      <Works/>
    </>
  );
};

export default Home;
