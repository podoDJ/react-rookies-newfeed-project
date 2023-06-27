import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import GlobalStyle from "../style/GlobalStyle";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Post from "../pages/Post";
import PostDetail from "../pages/PostDetail";
import StarDetail from "../pages/StarDetail";
import Star from "../pages/Star";
import About from "../pages/About";
import Mypage from "../pages/Mypage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/:id" element={<PostDetail />} />
            <Route path="/post" element={<Post />} />
            <Route path="/:id" element={<StarDetail />} />
            <Route path="/star" element={<Star />} />
            <Route path="/about" element={<About />} />
            <Route path="/:id" element={<Mypage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default Router;
