import React from "react";
import PostList from "../components/post/PostList";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <>
    <Link to={"/postcreate"}>글 작성하기</Link>
      <PostList />
    </>
  );
};

export default Post;
