import React from "react";
import PostDetailBrowse from "../components/postDetail/PostDetailBrowse";
import PostComments from "../components/postComments/PostComments";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PostDetail = () => {
  const { id } = useParams(); // id === documentId
  const posts = useSelector((state) => state.posts);
  const post = posts.find((post) => post.postId === id);
  return (
    <div>
      <PostDetailBrowse post={post} id={id} />
      <PostComments post={post} id={id} />
    </div>
  );
};

export default PostDetail;
