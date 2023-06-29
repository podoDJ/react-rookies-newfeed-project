import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { styled } from "styled-components";

const PostDetailBrowse = () => {
  console.log("여기는 POSTDETAILBROWSE");
  const { id } = useParams(); // id === documentId
  const posts = useSelector((state) => state.posts);
  const post = posts.filter((post) => post.postId === id)[0];
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if(!post) {
    navigate("/post")
    return;
  }
  return (
    <S.PostDetailBox>
      <p>{post.postId}</p>
      <p>{post.postTitle}</p>
      <p>{post.postBody}</p>
      <button
        onClick={async () => {

          console.log('post.id => ', post.postId)
          //문서아이디=필드아이디
          const postRef = doc(db, "posts", post.postId);
          await deleteDoc(postRef);
          dispatch({
            type: "DELETE_POST",
            payload: post.postId,
          });
        }}
      >
        삭제하기
      </button>
      <Link to={`/postupdate/${post.postId}`}>
      <button>
        수정하기
      </button>
      </Link>
    </S.PostDetailBox>
  );
};

export default PostDetailBrowse;

const S = {
  PostDetailBox: styled.div`
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
  `
}