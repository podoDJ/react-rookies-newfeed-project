import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import shortid from "shortid";

const PostForm = () => {
  console.log("여기는 POSTFORM");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Link to={"/post"}>전체게시글보기</Link>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          // 이전에 사용했던 방법: const newPost = { postId: shortid.generate(), postTitle, postBody };
          const collectionRef = collection(db, "posts");
          const docRef = await addDoc(collectionRef, { postTitle, postBody });

          console.log("파이어스토어의 도큐먼트 아이디 => ", docRef.id);
          // 도큐먼트 아이디가 바로 필드에 반영되도록 하는 코드
          const postDocRef = doc(db, "posts", docRef.id);
          await setDoc(postDocRef, { postId: docRef.id }, { merge: true})


          //navigate : 등록하기 버튼 누르면 submit하고 전체 게시글로 나옴. postdetail로 가는 방법을 찾아야 함. (DJ : 해결)

          // dispatch 전에 async await로 통신 보내고 통신 보내면 아래 dispatch가 진행됨.
          // or .then
          // reducer로 새 데이터 넘겨주기
          dispatch({
            type: "ADD_POST",
            payload: {
              postId: docRef.id,
              postTitle,
              postBody,
            },
          });
          setPostTitle("");
          setPostBody("");
          navigate(`/post/${docRef.id}`);
        }}
      >
        <div>
          <label>제목</label>
          <input
            text="text"
            name="postTitle"
            value={postTitle}
            onChange={(event) => {
              setPostTitle(event.target.value);
            }}
          />
          <label>내용</label>
          <textarea
            text="text"
            name="postBody"
            value={postBody}
            onChange={(event) => {
              setPostBody(event.target.value);
            }}
          />
        </div>
        <button>등록하기</button>
      </form>
    </>
  );
};

export default PostForm;
