import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import shortid from "shortid";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

const PostForm = () => {
  //uid는 여기서 가져옵니다.
  const uid = useSelector((state) => state.logReducer.user.uid);
  console.log("uid =>", uid);

  // const postLike = 0
  const postWhoLiked = [];
  //========================오늘 날짜 불러오는 함수==============================//
  const today = new Date(); // 현재 날짜와 시간을 가져옴
  const year = today.getFullYear(); // 연도를 가져옴
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월을 가져오고, 한 자리 수인 경우 앞에 0을 추가
  const day = String(today.getDate()).padStart(2, "0"); // 일을 가져오고, 한 자리 수인 경우 앞에 0을 추가
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  const postDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 연도, 월, 일을 조합하여 날짜 문자열 생성
  //========================오늘 날짜 불러오는 함수==============================//
  console.log("여기는 POSTFORM");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ========================
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const photoURL = await getDownloadURL(imageRef);
    setPhotoURL(photoURL);
  };
  console.log("ssss", photoURL);
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
          const docRef = await addDoc(collectionRef, { postTitle, postBody, uid, postWhoLiked, postDate, photoURL });

          console.log("파이어스토어의 도큐먼트 아이디 => ", docRef.id);
          // 도큐먼트 아이디가 바로 필드에 반영되도록 하는 코드
          const postDocRef = doc(db, "posts", docRef.id);
          await setDoc(postDocRef, { postId: docRef.id }, { merge: true });


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
              uid,
              // postLike,
              postWhoLiked,
              postDate,
              photoURL,
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
        <div style={{ backgroundColor: "green", height: "200px" }}>
          <input type="file" onChange={handleFileSelect} />
          <button onClick={handleUpload}>업로드</button>
        </div>
        <button>등록하기</button>
      </form>
    </>
  );
};

export default PostForm;
