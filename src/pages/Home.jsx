import React from "react";
import HomeComp from "../components/home/HomeComp";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>홈 화면입니다.</div>
      <HomeComp />
      <Link to={"/post"}>전체게시글로</Link>
    </>
  );
};

export default Home;
