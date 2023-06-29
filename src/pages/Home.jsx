import React from "react";
import HomeComp from "../components/home/HomeComp";
<<<<<<< HEAD
import { Link } from "react-router-dom";

const Home = () => {
=======
import { useSelector } from "react-redux";

const Home = () => {
  const currentUid = useSelector((state) => state.logReducer.user.uid);
  console.log("currentUid =>", currentUid);
>>>>>>> dev
  return (
    <>
      <HomeComp />
    </>
  );
};

export default Home;
