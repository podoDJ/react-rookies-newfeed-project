import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT, REMOVE_COMMENT } from "../../redux/modules/comment";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const PostComments = ( {post}, {id} ) => {
  console.log("ididididid", id)
  console.log("postostost ==> ",post)
  const comments = useSelector((state) => {
    return state.comment;
  });
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  // const deletComment = comments.filter((comment) => comment.commentId === id)[0];
  return (
    <div>
      <h3>댓글</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const collectionRef = collection(db, "comments");
          const docRef = await addDoc(collectionRef, { title, comment });
          console.log(docRef.id)
          const commentDocRef = doc(db, "comments", docRef.id);
          await setDoc(commentDocRef, { commentId: docRef.id, postId: post.id }, { merge: true });
          dispatch({
            type: ADD_COMMENT,
            payload: {
              commentId: docRef.id,
              title,
              comment,
              postId: post.id
            },
          });
        }}
      >
        제목 :{" "}
        <input
          type="text"
          placeholder="제목을적어주세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        내용 :{" "}
        <input
          type="text"
          placeholder="내용을적어주세요"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button>작성</button>
      </form>
      <div>
        <h2>댓글</h2>
        {comments
        // .filter((comment) => comment.)
        .map((comment) => {
          console.log("comments =>", comments);
          return (
            <div key={comment.commentId}>
              <p>{comment.commentId}</p>
              <p>{comment.title}</p>
              <p>{comment.comment}</p>
              <Link to={`/post/commentup/${comment.commentId}`}>
                <button>수정</button>
              </Link>

              <button
                onClick={async () => {
 
                  const commentRef = doc(db, "comments", comment.commentId);
                  console.log("commentRef=>", commentRef);
                  await deleteDoc(commentRef);

                  dispatch({
                    type: REMOVE_COMMENT,
                    payload: comment.commentId,
                  });
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostComments;
