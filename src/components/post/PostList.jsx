import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const PostList = () => {
  const posts = useSelector((state) => {
    return state.posts;
  });
  const navigate = useNavigate();
  // console.log(typeof posts[0].postDate);

  const sortByDate = (a, b) => {
    return new Date(a.postDate).getTime() - new Date(b.postDate).getTime();
  };
  const sortedPosts = posts.sort(sortByDate).reverse();

  return (
    <>
      <h1>전체게시글</h1>
      <S.PostingBoxCtn>
        {sortedPosts.map((post) => {
          console.log(post);
          return (
            <S.PostingBox onClick={() => navigate(`/post/${post.postId}`)} key={post.postId}>
              <S.PostingLike>👍{post.postWhoLiked?.length || 0}</S.PostingLike>
              {/* <p>글 아이디: {post.postId}</p> */}
              <S.PostingFoodPhoto src={post.photoURL} />
              <S.PostingTitle>{post.postTitle}</S.PostingTitle>
              <S.PostingBody>{post.postBody}</S.PostingBody>
              {/* <p>uid: {post.uid}</p> */}
              <p>작성일: {post.postDate}</p>
            </S.PostingBox>
          );
        })}
      </S.PostingBoxCtn>
    </>
  );
};

export default PostList;

const S = {
  PostingBoxCtn: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,

  PostingBox: styled.div`
    width: 220px;
    text-align: center;
    padding: 1rem;
    background-color: var(--color-white);
    border-radius: 20px;
    box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    margin: 10px;
    -webkit-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    cursor: pointer;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
      transform: translateY(-10px);
    }
  `,
  PostingFoodPhoto: styled.img`
    width: 200px;
    height: 200px;
    border-radius: 100%;
  `,

  PostingTitle: styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 20px;
  `,
  PostingBody: styled.p`
    padding-bottom: 10px;
  `,
  PostingLike: styled.div`
    float: right;
  `,
};
