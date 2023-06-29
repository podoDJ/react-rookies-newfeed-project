import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { ADD_COMMENT, REMOVE_COMMENT } from "../../redux/modules/comment";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const PostComments = () => {
  const comments = useSelector((state) => {
    return state.comment;
  });

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "comments"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        //console.log("data", data);
        comments.push(data);
      });
    };
    fetchData();
  }, []);

  //console.log(comments);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <h3>댓글</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addDoc(
            collection(db, "comments"),
            dispatch({
              type: ADD_COMMENT,
              payload: {
                id: shortid.generate(),
                title,
                comment,
              },
            })
          );
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
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.id}</p>
              <p>{comment.title}</p>
              <p>{comment.comment}</p>
              <button>수정</button>
              <button
                onClick={() => {
                  dispatch({
                    type: REMOVE_COMMENT,
                    payload: comment.id,
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
