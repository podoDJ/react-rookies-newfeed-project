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

  const comment = comments.filter((comment) => comment.id === id);
  console.log("id", id);

  const dispatch = useDispatch();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const commentRef = doc(db, "comments", comment.commentId);
          await updateDoc(commentRef, { title: uptitle, comment: upComment });
          console.log("commentRef", commentRef);
          dispatch({
            type: UPDATE_COMMENT,
            payload: {
              commentId: id,
              title: uptitle,
              comment: upComment,
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
        <button>수정하기</button>
      </form>
    </div>
  );
};

export default CommentChange;
// const CommentChange = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [updateCommentTitle, setUpdateCommentTitle] = useState("");
//   const [updateCommentBody, setUpdateCommentBody] = useState("");

//   const { id } = useParams();
//   const comments = useSelector((state) => state.comment);
//   const comment = comments.filter((comment) => comment.commentId === id)[0];

//   if (!comment) {
//     navigate("/post");
//     return;
//   }

//   return (
//     <>
//       <form
//         onSubmit={async (event) => {
//           event.preventDefault();
//           const commentRef = doc(db, "comments", comment.commentId);
//           await updateDoc(commentRef, { ...comment, commentTitle: updateCommentTitle, commentBody: updateCommentBody });

//           dispatch({
//             type: "UPDATE_POST",
//             payload: {
//               commentId: id,
//               commentTitle: updateCommentTitle,
//               commentBody: updateCommentBody,
//             },
//           });
//           navigate("/post");
//         }}
//       >
//         <div>
//           <label>제목</label>
//           <input
//             text="text"
//             name="postTitle"
//             value={updateCommentTitle}
//             placeholder={comment.commentTitle}
//             onChange={(event) => {
//               setUpdateCommentTitle(event.target.value);
//             }}
//           />
//           <label>내용</label>
//           <textarea
//             text="text"
//             name="postBody"
//             value={updateCommentBody}
//             onChange={(event) => {
//               setUpdateCommentBody(event.target.value);
//             }}
//           />
//         </div>
//         <button>수정완료</button>
//       </form>
//     </>
//   );
// };

// export default CommentChange;
