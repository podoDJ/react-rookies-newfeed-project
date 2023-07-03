import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { updatePosts } from "../../redux/modules/postWrite";

const PostDetailUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const post = posts.find((post) => post.postId === id);

  const [updatePostTitle, setUpdatePostTitle] = useState(post?.postTitle);
  const [updatePostBody, setUpdatePostBody] = useState(post?.postBody);
  const [updatedPostIngredient, setUpdatedPostIngredient] = useState(post?.postIngredient);
  const [updatedPostRecipe, setUpdatedPostRecipe] = useState(post?.postRecipe);

  useEffect(() => {
    if (!post) {
      navigate(`/post/${id}`);
    }
  }, [post, navigate]);

  const PostingUpdate = async (event) => {
    event.preventDefault();
    const postRef = doc(db, "posts", post.postId);
    await updateDoc(postRef, { ...post, postTitle: updatePostTitle, postBody: updatePostBody, postIngredient: updatedPostIngredient, postRecipe: updatedPostRecipe });
    dispatch(
      updatePosts({
        postId: id,
        postTitle: updatePostTitle,
        postBody: updatePostBody,
        postIngredient: updatedPostIngredient,
        postRecipe: updatedPostRecipe,
      })
    );

    navigate(`/post/${id}`);
  };
  console.log("post=>", post);
  // Input Limit
  const MAX_TITLE_LENGTH = 15;
  const titleLimit = (event) => {
    event.target.value.length <= MAX_TITLE_LENGTH ? setUpdatePostTitle(event.target.value) : alert(`글자수 제한 ${MAX_TITLE_LENGTH}자 입니다.`);
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
      case "updatePostBody":
        limitAlert(inputValue, setUpdatePostBody);
        break;
      case "updatedPostIngredient":
        limitAlert(inputValue, setUpdatedPostIngredient);
        break;
      case "updatedPostRecipe":
        limitAlert(inputValue, setUpdatedPostRecipe);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <S.UpdatePostForm onSubmit={PostingUpdate}>
        <div>
          <div>
            <S.UpdatePostLabel>오늘의 혼쿡</S.UpdatePostLabel>
            <S.UpdatePostInput name="updatePostTitle" value={updatePostTitle} onChange={(event) => titleLimit(event)} />
          </div>

          <div>
            <S.UpdatePostLabel>CooK'Story</S.UpdatePostLabel>
            {/* <S.UpdatePostTextarea name="updatePostBody" value={updatePostBody} onChange={(event) => inputLimit(event)}></S.UpdatePostTextarea> */}
            <S.UpdatePostTextarea name="updatePostBody" value={updatePostBody} onChange={(event) => inputLimit(event)}/>
          </div>
          <div></div>

          <div>
            <S.UpdatePostLabel>오늘의 재료</S.UpdatePostLabel>
            <S.UpdatePostTextarea name="updatedPostIngredient" value={updatedPostIngredient} onChange={(event) => inputLimit(event)}/>
          </div>

          <div>
            <S.UpdatePostLabel>레시피</S.UpdatePostLabel>
            <S.UpdatePostTextarea name="updatedPostRecipe" value={updatedPostRecipe} onChange={(event) => inputLimit(event)} />
          </div>
        </div>
        <S.UpdateBtnCtn>
          <S.UpdatePostBtn>수정완료</S.UpdatePostBtn>
          {/* type="button"으로 form의 자동 onSubmit 속성 해제.
        window.history.back()은 뒤로가는 메서드(window.history : 윈도우 히스토리 객체) */}
          <S.UpdatePostBtn
            type="button"
            onClick={() => {
              if (window.confirm("취소하시겠습니까?")) {
                window.history.back();
              } else {
                return;
              }
            }}
          >
            취소
          </S.UpdatePostBtn>
        </S.UpdateBtnCtn>
      </S.UpdatePostForm>
    </>
  );
};

export default PostDetailUpdate;

const S = {
  UpdatePostForm: styled.form`
    background-color: #ffbf9b;
    color: #4d4d4d;
    width: 500px;
    height: 700px;
    margin: 10px auto;
    padding: 50px;
    border-radius: 20px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  UpdatePostLabel: styled.label`
    font-size: 20px;
    font-weight: 700;
    margin: 0 auto 20px 10px;
  `,

  UpdatePostInput: styled.input`
    width: 500px;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 10px;
    border-color: transparent;
    font-size: 18px;
  `,

  UpdatePostTextarea: styled.textarea`
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
    scrollbar-width: thin; /* Set the width of the scrollbar */
    scrollbar-color: transparent; /* Set the color of the scrollbar */
    &::-webkit-scrollbar {
      width: 1px; /* Set the width of the scrollbar */
    }
  `,

  UpdatePostBtn: styled.button`
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

  UpdateBtnCtn: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  `,
};
