import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';

const PostUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatePostTitle, setUpdatePostTitle] = useState("");
  const [updatePostBody, setUpdatePostBody] = useState("");

  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const post = posts.filter((post) => post.postId === id)[0];
  console.log("post가 =>>",id)
  if(!post) {
    navigate("/post")
    return;
  }
  
  return (
    <>
      <div>
        <Link to={"/post"}>전체게시글보기</Link>
      </div>
      <form onSubmit={async (event)=> {
        event.preventDefault();
        const postRef = doc(db, "posts", post.postId);
        await updateDoc(postRef, { ...post, postTitle: updatePostTitle, postBody: updatePostBody })
        console.log("postRef",postRef)
        dispatch({
          type: "UPDATE_POST",
          payload: {
            postId: id,
            postTitle: updatePostTitle,
            postBody: updatePostBody,
          }
        })
        navigate("/post")
      }}
      >
        <div>
          <label>제목</label>
          <input
            text="text"
            name="postTitle"
            value={updatePostTitle}
            placeholder={post.postTitle}
            onChange={(event) => {
              setUpdatePostTitle(event.target.value)
            }}
          />
          <label>내용</label>
          <textarea
            text="text"
            name="postBody"
            value={updatePostBody}
            onChange={(event) => {
              setUpdatePostBody(event.target.value);
            }}
          />
        </div>
        <button>수정완료</button>
      </form>
    </>
  );
};


export default PostUpdate