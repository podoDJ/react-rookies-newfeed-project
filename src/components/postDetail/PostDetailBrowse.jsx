import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { styled } from "styled-components";
import { deletePosts, updatePostsLike } from "../../redux/modules/postWrite";
import { BiSolidLike } from "react-icons/bi";

//"Pages" dir => PostDetail.jsx props
const PostDetailBrowse = ({ post, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.logReducer.user.uid);

  const [updatedPostWhoLiked, setUpdatedPostWhoLiked] = useState(post?.postWhoLiked || []);
  if (!post) {
    navigate("/post");
    return null;
  }

  const deletePost = async () => {
    if (post.uid !== uid) {
      alert("회원님이 등록하신 글이 아닙니다.");
      return;
    } else if (post.uid === uid) {
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        //문서아이디=필드아이디
        const postRef = doc(db, "posts", post.postId);
        await deleteDoc(postRef);
        dispatch(deletePosts(post.postId));
        navigate("/post");
      } else {
        alert("삭제를 취소하였습니다.");
      }
    }
  };

  const updateLike = async (event) => {
    //삼항연산자로 선언한 뒤 setState에 넣기.(친구가 조언..)
    const updatedPostWhoLiked = post.postWhoLiked.includes(uid) ? post.postWhoLiked.filter((like) => like !== uid) : [...post.postWhoLiked, uid];
    setUpdatedPostWhoLiked(updatedPostWhoLiked);
    const postRef = doc(db, "posts", post.postId);
    await updateDoc(postRef, { ...post, postWhoLiked: updatedPostWhoLiked });
    dispatch(
      updatePostsLike({
        postId: post.postId,
        // postLike: updatedPostLike,
        postWhoLiked: updatedPostWhoLiked,
      })
    );
  };

  return (
    <>
      <S.PostWrapper>
        <S.PostDetailBox>
          <S.PrevBtn marginTop="10px" onClick={() => navigate("/post")}>
            이전으로
          </S.PrevBtn>

          <S.PostTitle>{post.postTitle}</S.PostTitle>
          <S.PostDate>{post.postDate}</S.PostDate>
          <S.PostBtnCtn uid={uid} postuid={post.uid}>
            <Link to={`/postupdate/${post.postId}`}>
              <S.UpdateBtn>수정</S.UpdateBtn>
            </Link>
            <S.DeleteBtn onClick={deletePost}>삭제</S.DeleteBtn>
          </S.PostBtnCtn>
          {/* 삼항연산자로 uid가 false(undefined)일 경우 updateLike 함수 실행, 아닐 경우 alert창 띄우는 익명함수 실행. ()=> 이부분이 포인트 */}
          <S.PostDetailLike onClick={uid ? updateLike : () => alert("로그인 후 이용 바랍니다.")}>
            <BiSolidLike size={19} color={updatedPostWhoLiked.includes(uid) ? "#B46060" : "#c5c5c5c8"} />
            <S.LikeNum>{updatedPostWhoLiked.length || 0}</S.LikeNum>
          </S.PostDetailLike>

          <S.PostImg src={post.photoURL} photoURL={post.photoURL} />
          <S.Body>
            <S.Label>CooK Story</S.Label>
            <S.Text>{post.postBody}</S.Text>
            <S.Label>CooK Ingredient</S.Label>
            <S.Text>{post.postIngredient}</S.Text>
            <S.Label>Cook recipe</S.Label>
            <S.Text>{post.postRecipe}</S.Text>
          </S.Body>
        </S.PostDetailBox>
      </S.PostWrapper>
    </>
  );
};

export default PostDetailBrowse;

const S = {
  PostWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
  `,

  PostDetailBox: styled.div`
    position: relative;
    width: 800px;
    height: 470px;
    padding: 20px;
    border: none;
    border-radius: 5px;
    background-color: #fff4e0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `,

  PrevBtn: styled.button`
    position: absolute;
    right: 20px;
    width: 80px;
    height: 30px;
    color: white;
    background-color: #b46060;
    border-color: transparent;
    border-radius: 10px;
    cursor: pointer;
  `,

  PostTitle: styled.p`
    font-size: 2.7rem;
    text-align: center;
    padding-top: 35px;
    color: #333;
  `,

  PostDate: styled.p`
    text-align: center;
    color: var(--color-text);
    padding-top: 20px;
  `,

  PostDetailLike: styled.div`
    position: absolute;
    z-index: 1;
    top: 180px;
    right: 430px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 50px;
    height: 15px;
    border: 1px solid lightgray;
    border-radius: 30px;
    padding: 4px;
    color: var(--color-text);
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition-duration: 250ms;
    cursor: pointer;
    &:hover {
      transform: scale(1.1) rotateZ(-10deg);
      transition-duration: 250ms;
    }
  `,
  LikeNum: styled.span`
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,

  DeleteBtn: styled.button`
    position: absolute;
    top: 115px;
    right: 20px;
    color: var(--color-text);
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      color: black;
      text-decoration: underline;
    }
  `,

  UpdateBtn: styled.button`
    position: absolute;
    top: 115px;
    right: 55px;
    color: var(--color-text);
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      color: black;
      text-decoration: underline;
    }
  `,

  PostImg: styled.img`
    position: absolute;
    bottom: 0;
    width: 400px;
    height: 320px;
    max-width: 100%;
    max-height: 100%;
    padding: 20px 0px;
    margin-bottom: 5;
  `,

  Body: styled.div`
    position: absolute;
    bottom: 0px;
    right: 20px;
    margin-bottom: 5px;
  `,

  Label: styled.h3`
    color: #333;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 1px;
    padding: 5px;
  `,

  Text: styled.p`
    background-color: #f7f7f7;
    color: #666;
    font-size: 16px;
    margin-bottom: 10px;
    padding: 8px 20px;
    width: 340px;
    height: 60px;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  `,

  PostBtnCtn: styled.div`
    display: ${(props) => (props.uid === props.postuid ? "flex" : "none")};
  `,
};
