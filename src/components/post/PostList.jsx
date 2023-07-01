import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BiSolidLike } from "react-icons/bi";

const PostList = () => {
  const posts = useSelector((state) => state.posts);
  const uid = useSelector((state) => state.logReducer.user.uid);
  const navigate = useNavigate();

  const sortByDate = (a, b) => {
    return new Date(a.postDate).getTime() - new Date(b.postDate).getTime();
  };
  const sortedPosts = posts.sort(sortByDate).reverse();

  return (
    <>
      <S.Title>All Post</S.Title>
      <S.PostWriteBox onClick={uid ? () => navigate("/postcreate") : () => alert("로그인 후 이용 바랍니다.")}>
        <S.PostWriteBoxCnt>✏️</S.PostWriteBoxCnt>
        <S.PostWriteBoxCnt>오늘 어떤 음식을 해먹었나요?</S.PostWriteBoxCnt>
      </S.PostWriteBox>
      <S.PostingBoxCtn>
        {sortedPosts.map((post) => {
          return (
            <S.PostingBox onClick={() => navigate(`/post/${post.postId}`)} key={post.postId}>
              {/* <p>글 아이디: {post.postId}</p> */}
              <S.PostingFoodPhoto src={post.photoURL ? post.photoURL : "https://velog.velcdn.com/images/darkfairy7/post/f0d9a0ca-ad26-4a4c-b1b3-756dfb4fb3d0/banner-rtan.png"} />
              <S.PostingTitle>{post.postTitle}</S.PostingTitle>

              {/* <S.PostingBody>{post.display}</S.PostingBody> */}
              <S.PostingBody>작성자</S.PostingBody>
              {/* <p>uid: {post.uid}</p> */}
              <S.PostingDateLikeBox>
                <p style={{ marginRight: "20px" }}> {post.postDate.slice(0, 11)}</p>
                <S.PostingLike>
                  <BiSolidLike size={20} style={{ color: "#b46060", marginRight: "5px"}} /> <span style={{marginRight: "3px"}}>{post.postWhoLiked?.length || 0}</span>
                </S.PostingLike>
              </S.PostingDateLikeBox>
            </S.PostingBox>
          );
        })}
      </S.PostingBoxCtn>
    </>
  );
};

export default PostList;

const S = {
  Title: styled.p`
    font-size: 2rem;
    font-weight: bold;
    margin: 40px auto 20px auto;
    color: #4d4d4d;
    text-align: center;
  `,

  PostWriteBox: styled.div`
    background-color: white;
    width: 92.5%;
    height: 70px;
    padding: 1rem;
    display: flex;
    align-items: center;
    border-radius: 20px;
    box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    margin: 30px auto;
    -webkit-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  `,

  PostWriteBoxCnt: styled.span`
    font-size: 23px;
    font-weight: 500;
    color: #4d4d4d;
    margin: 10px;
  `,

  PostingBoxCtn: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,

  PostingBox: styled.div`
    width: 240px;
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
    width: 230px;
    height: 230px;
    border-radius: 5px;
    margin-top: 5px;
  `,

  PostingTitle: styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 20px;
  `,

  PostingDateLikeBox: styled.div`
    display: flex;
    flex-direction: row;
    float: right;
    gap: 30px;
  `,

  PostingBody: styled.p`
    padding-bottom: 10px;
  `,
  PostingLike: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
