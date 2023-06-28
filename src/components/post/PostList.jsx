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
          console.log(post)
          return (
            <S.PostingBox key={post.postId}>
              <Link to={`/post/${post.postId}`}>글 상세보기</Link>
              
              <div><span onClick={() => {}}>👍{(post?.whoLiked?.length) || 0}</span></div>
              <p>글 아이디: {post.postId}</p>
              <p>제목: {post.postTitle}</p>
              <p>내용: {post.postBody}</p>
              <p>UID: {post.UID}</p>
              <p>작성일: {post.postDate}</p>
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
