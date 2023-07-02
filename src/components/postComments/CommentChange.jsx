import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { UPDATE_COMMENT } from "../../redux/modules/comment";

const CommentChange = ({ commentId }) => {
  const navigate = useNavigate();
  const [uptitle, setUpTitle] = useState();
  const [upComment, setUpComment] = useState();
  const { id } = useParams();
  const comments = useSelector((state) => state.comment);
  const comment = comments.find((comment) => comment.commentId === id);

  const dispatch = useDispatch();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!uptitle || !upComment) {
            alert("내용을 추가해주세요");
            return false;
          }

          const commentRef = doc(db, "comments", comment.commentId);

          await updateDoc(commentRef, { ...comment, title: uptitle, comment: upComment });
          dispatch({
            type: UPDATE_COMMENT,
            payload: {
              title: uptitle,
              comment: upComment,
              postId: id,
              commentId,
            },
          });
        }}
      >
        <input
          type="text"
          value={uptitle || ""}
          onChange={(e) => {
            setUpTitle(e.target.value);
          }}
        />
        <input
          type="text"
          value={upComment || ""}
          onChange={(e) => {
            setUpComment(e.target.value);
          }}
        />

        <br />
        <STUpBtn>수정</STUpBtn>
        <STDeBtn onClick={closeModal}>닫기</STDeBtn>

      </form>
    </div>
  );
};

export default CommentChange;


const StUpInput = styled.input`
  position: absolute;
  top: 10px;
  left: 25px;
  width: 90%;
  height: 40px;
  padding: 15px;
  background-color: var(--color-bg);
  border: 1px solid rgba(77, 77, 77, 0.796);
  border-radius: 3px;
`;

const STUpBtn = styled.button`
  position: absolute;
  top: 55px;
  right: 65px;
  color: #a8a7a7c4;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--color-text);
    text-decoration: underline;
  }
`;

const STDeBtn = styled.button`
  position: absolute;
  top: 55px;
  right: 30px;
  color: #a8a7a7c4;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--color-text);
    text-decoration: underline;
  }
`;

