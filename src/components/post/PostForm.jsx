import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { addPosts } from "../../redux/modules/postWrite";
import { styled } from "styled-components";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

const PreviewModal = ({ photoURL, setOpenModal, setPhotoURL, selectedFile }) => {
  return (
    <S.ModalDiv>
      <S.Modal>
        <S.PreviewImgDiv>
          <S.ImgPreview src={photoURL} />
        </S.PreviewImgDiv>
        <S.PreviewBtnDiv>
          <S.PreviewBtn
            onClick={async (event) => {
              event.stopPropagation();
              event.preventDefault();
              document.querySelector("#inputFile").click();
            }}
          >
            <S.PreviewBtnTxt>파일 선택</S.PreviewBtnTxt>
          </S.PreviewBtn>
          <S.PreviewBtn
            onClick={async (event) => {
              event.stopPropagation();
              event.preventDefault();
              const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
              await uploadBytes(imageRef, selectedFile);
              const imgURL = await getDownloadURL(imageRef);
              setPhotoURL(imgURL);
            }}
          >
            <S.PreviewBtnTxt>파일 확인</S.PreviewBtnTxt>
          </S.PreviewBtn>
          <S.PreviewBtn onClick={() => setOpenModal(false)}>
            <S.PreviewBtnTxt>닫기</S.PreviewBtnTxt>
          </S.PreviewBtn>
        </S.PreviewBtnDiv>
      </S.Modal>
    </S.ModalDiv>
  );
};

const FileForm = ({ handleUpload, handleFileSelect, photoURL }) => {
  return (
    <S.FileBox>
      <S.FileLabel for="inputFile">
        <span style={{ marginRight: "10px" }}>📎</span>
        <span>{photoURL ? `${photoURL.slice(0, 45)} ...` : "파일 선택"}</span>
      </S.FileLabel>
      <S.ImgInput type="file" id="inputFile" onChange={handleFileSelect} />
      <S.ImgBtn onClick={handleUpload}>업로드</S.ImgBtn>
    </S.FileBox>
  );
};

const PostForm = () => {
  //uid get
  const user = useSelector((state) => state.logReducer.user);
  const postWhoLiked = [];
  //Posting Date===
  const today = new Date(); // 현재 날짜와 시간을 가져옴
  const year = today.getFullYear(); // 연도를 가져옴
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월을 가져오고, 한 자리 수인 경우 앞에 0을 추가
  const day = String(today.getDate()).padStart(2, "0"); // 일을 가져오고, 한 자리 수인 경우 앞에 0을 추가
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  const postDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 연도, 월, 일을 조합하여 날짜 문자열 생성
  //===============
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postIngredient, setPostIngredient] = useState("");
  const [postRecipe, setPostRecipe] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ========================
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (selectedFile) {
      const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);
      const imgURL = await getDownloadURL(imageRef);
      setPhotoURL(imgURL);
      setOpenModal(true);
    } else alert("이미지가 선택되지 않았습니다.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (photoURL) {
      // 이전에 사용했던 방법: const newPost = { postId: shortid.generate(), postTitle, postBody };
      const collectionRef = collection(db, "posts");
      const docRef = await addDoc(collectionRef, { postTitle, postBody, uid: user.uid, displayName: user.displayName, postWhoLiked, postDate, photoURL });

      // 도큐먼트 아이디가 바로 필드에 반영되도록 하는 코드
      const postDocRef = doc(db, "posts", docRef.id);
      await setDoc(postDocRef, { postId: docRef.id }, { merge: true });

      //navigate : 등록하기 버튼 누르면 submit하고 전체 게시글로 나옴. postdetail로 가는 방법을 찾아야 함. (DJ : 해결)

      // dispatch 전에 async await로 통신 보내고 통신 보내면 아래 dispatch가 진행됨.
      // or .then
      // reducer로 새 데이터 넘겨주기
      dispatch(
        addPosts({
          postId: docRef.id,
          postTitle,
          photoURL,
          postBody,
          postIngredient,
          postRecipe,
          uid: user.uid,
          displayName: user.displayName,
          // postLike,
          postWhoLiked,
          postDate,
        })
      );
      setPostTitle("");
      setPostBody("");
      navigate(`/post/${docRef.id}`);
    } else if (!photoURL) alert("이미지가 업로드 되지 않았습니다.\n이미지 선택 후 업로드 버튼을 클릭해주세요!");
  };

  //최대 글자수 제한
  const MAX_TITLE_LENGTH = 15;
  const titleLimit = (event) => {
    event.target.value.length <= MAX_TITLE_LENGTH ? setPostTitle(event.target.value) : alert(`글자수 제한 ${MAX_TITLE_LENGTH}자 입니다.`);
  };
  const MAX_LENGTH = 80;
  const inputLimit = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const limitAlert = (inputValue, setInputValue) => {
      if (inputValue.length <= MAX_LENGTH) {
        setInputValue(inputValue);
      } else {
        alert(`글자수 제한 ${MAX_LENGTH}자 입니다.`);
      }
    };
    switch (inputName) {
      case "postBody":
        limitAlert(inputValue, setPostBody);
        break;
      case "postIngredient":
        limitAlert(inputValue, setPostIngredient);
        break;
      case "postRecipe":
        limitAlert(inputValue, setPostRecipe);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <S.PostForm onSubmit={handleSubmit}>
        <div>
          <div>
            <S.PostLabel for="postTitle">Today HonCook</S.PostLabel>
            <S.PostInput
              text="text"
              name="postTitle"
              value={postTitle}
              onChange={(event) => {
                titleLimit(event);
              }}
            />
          </div>

          <div>
            <S.PostLabel for="postBody">CooK Story</S.PostLabel>
            <S.PostTextarea
              text="text"
              name="postBody"
              value={postBody}
              onChange={(event) => {
                inputLimit(event);
              }}
            />
          </div>

          <div>
            <S.PostLabel for="postIngredient">CooK Ingredient</S.PostLabel>
            <S.PostTextarea
              text="text"
              name="postIngredient"
              value={postIngredient}
              onChange={(event) => {
                inputLimit(event);
              }}
            />
          </div>

          <div>
            <S.PostLabel for="postRecipe">Cook recipe</S.PostLabel>
            <S.PostTextarea
              text="text"
              name="postRecipe"
              value={postRecipe}
              onChange={(event) => {
                inputLimit(event);
              }}
            />
          </div>
          <S.PostLabel for="postImg">Cook Image</S.PostLabel>
          <div>
            <FileForm photoURL={photoURL} handleUpload={handleUpload} handleFileSelect={handleFileSelect} />
          </div>
          {openModal ? <PreviewModal photoURL={photoURL} setOpenModal={setOpenModal} setPhotoURL={setPhotoURL} selectedFile={selectedFile} /> : null}
        </div>

        <S.PostBtnCtn>
          <S.PostBtn>등록하기</S.PostBtn>
          {/* window.history.back()은 뒤로가는 메서드(window.history : 윈도우 히스토리 객체) */}
          <S.PostBtn
            type="button"
            onClick={() => {
              window.history.back();
            }}
          >
            취소
          </S.PostBtn>
        </S.PostBtnCtn>
        {openModal ? <PreviewModal photoURL={photoURL} setOpenModal={setOpenModal} setPhotoURL={setPhotoURL} selectedFile={selectedFile} /> : null}
      </S.PostForm>
    </>
  );
};
export default PostForm;

const S = {
  PostForm: styled.form`
    background-color: #ffbf9b;
    color: #4d4d4d;
    width: 500px;
    height: 750px;
    margin: 10px auto;
    padding: 50px;
    border-radius: 20px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  PostLabel: styled.label`
    font-size: 20px;
    font-weight: 700;
    margin: 0 auto 20px 10px;
  `,

  PostInput: styled.input`
    width: 500px;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 10px;
    border-color: transparent;
    font-size: 18px;
  `,

  PostTextarea: styled.textarea`
    width: 500px;
    height: 100px;
    margin-top: 5px;
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 10px;
    border-color: transparent;
    font-size: 18px;
    resize: none;
    /* 스크롤바 설정. https://www.geeksforgeeks.org/how-to-style-scrollbar-thumb-for-the-webkit-browsers-and-what-are-components-of-scrollbar/ */
    overflow: auto;
    scrollbar-width: thin; /* 스크롤바 너비설정 */
    scrollbar-color: transparent; /* 스크롤바 색깔 설정 */
    &::-webkit-scrollbar {
      width: 1px; /* Set the width of the scrollbar */
    }
  `,

  PostBtn: styled.button`
    width: 200px;
    height: 40px;
    color: white;
    background-color: #b46060;
    border-color: transparent;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 20px;
    cursor: pointer;
  `,

  PostBtnCtn: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  `,
  ImgInput: styled.input`
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
  `,
  FileBox: styled.div`
    display: flex;
    margin-top: 5px;
  `,
  FileLabel: styled.label`
    display: flex;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border-radius: 10px;
    width: 78%;
    color: #999999;
    background-color: white;
    margin-bottom: 30px;
    align-items: center;
    cursor: pointer;
  `,
  ImgBtn: styled.button`
    color: white;
    background-color: #b46060;
    border-color: transparent;
    margin-left: 10px;
    width: 80px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
  `,
  ImgPreview: styled.img`
    width: 400px;
    height: 375px;
    margin: 0 auto;
    border-radius: 10px;
  `,
  ModalDiv: styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Modal: styled.div`
    width: 400px;
    height: 450px;
    margin: 0 auto;
    border-radius: 0.5rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    padding: 20px;
  `,
  PreviewImgDiv: styled.div`
    height: 400px;
  `,
  PreviewBtnDiv: styled.div`
    display: flex;
    justify-content: space-around;
  `,
  PreviewBtn: styled.div`
    color: white;
    background-color: #b46060;
    border-color: transparent;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  PreviewBtnTxt: styled.p`
    font-size: 20px;
    font-weight: 500;
  `,
};
