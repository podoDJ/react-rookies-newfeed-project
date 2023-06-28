import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const PostList = () => {
  console.log("여기는 POSTLIST");

  const posts = useSelector((state) => {
    return state.posts;
  });
  
  return (
    <>
      <div>
        <h1>전체게시글</h1>
        {posts.map((post) => {
          return (
            <S.PostingBox key={post.postId}>
              <Link to={`/post/${post.postId}`}>글 상세보기</Link>
              <p>{post.postId}</p>
              <p>{post.postTitle}</p>
              <p>{post.postBody}</p>
            </S.PostingBox>
          );
        })}
      </div>
    </>
  );
  
};

export default PostList;

const S = {
  PostingBox: styled.div`
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
  `,
};
