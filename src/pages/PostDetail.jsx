import React from "react";
import PostDetailBrowse from "../components/postDetail/PostDetailBrowse";
import PostComments from "../components/postComments/PostComments";

const PostDetail = () => {
  return (
    <div>
      <PostDetailBrowse />
      <PostComments />
    </div>
  );
};

export default PostDetail;
