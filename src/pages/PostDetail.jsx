import React from "react";
import PostDetailBrowse from "../components/postDetail/PostDetailBrowse";
import PostComments from "../components/postComments/PostComments";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams(); // id === documentId
  const posts = useSelector((state) => state.posts);
  const post = posts.filter((post) => post.postId === id)[0];

  return (
    <div>
      <PostDetailBrowse post = {post} id = { id } />
      <PostComments post = {post} id = { id } />
    </div>
  );
};

export default PostDetail;
