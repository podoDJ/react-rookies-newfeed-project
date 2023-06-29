import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { UPDATE_COMMENT } from "../../redux/modules/comment";

const CommentChange = () => {
  const navigate = useNavigate();
  const [uptitle, setUpTitle] = useState();
  const [upComment, setUpComment] = useState();
  const { id } = useParams();

  const comments = useSelector((state) => state.comment);
  const comment = comments.find((comment) => comment.commentId === id);

  console.log("id", id);

  const dispatch = useDispatch();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const commentRef = doc(db, "comments", comment.commentId);

          await updateDoc(commentRef, { ...comment, title: uptitle, comment: upComment });

          dispatch({
            type: UPDATE_COMMENT,
            payload: {
              commentId: id,
              title: uptitle,
              comment: upComment,
            },
          });
          navigate(`/post/`);
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
        <button>수정</button>
      </form>
    </div>
  );
};

export default CommentChange;
