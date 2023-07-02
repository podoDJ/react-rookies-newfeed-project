import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT, REMOVE_COMMENT, baseComment } from "../../redux/modules/comment";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Await, Link } from "react-router-dom";
import { styled } from "styled-components";

const PostComments = ({ post, id }) => {
  const uid = useSelector((state) => state.logReducer.user.uid);
  const [upDataCommentId, setUpDataCommentId] = useState("");
  const comments = useSelector((state) => {
    return state.comment;
  });

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const closeModal = () => {
    setUpDataCommentId(false);
  };
  // 함수의 리턴값 const abc  = (a)=> return a+1  abc(1) const b = abc(1512341)
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "comments"));
      const querySnapshot = await getDocs(q);
      const abc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      dispatch(baseComment(abc));
    };
    fetchData();
  }, [dispatch]);
  const isOpen = comment.userId !== uid;
  return (
    <>
      <StCommentContainer>
        <StTitle>댓글</StTitle>
        <StForm
          onSubmit={async (e) => {
            e.preventDefault();
            if (!comment) {
              alert("내용을 추가해주세요");
              return false;
            }

            const collectionRef = collection(db, "comments");
            const docRef = await addDoc(collectionRef, { comment });
            const commentDocRef = doc(db, "comments", docRef.id);
            await setDoc(commentDocRef, { commentId: docRef.id, postId: id, userId: uid }, { merge: true });

            dispatch({
              type: ADD_COMMENT,
              payload: {
                postId: post.id,
                userId: uid,
                commentId: docRef.id,

                comment,
              },
            });
          }}
        >
          <StinputText
            type="text"
            placeholder="내용을적어주세요"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />

          {isOpen && <StCreateBtn>작성</StCreateBtn>}
        </StForm>
      </StCommentContainer>
      <div>
        {comments
          .filter((item) => {
            return item.postId === id;
          })
          .map((comment) => {
            const isOpen = comment.userId === uid;
            const isModal = comment.commentId === upDataCommentId;
            return (
              <Stlist key={comment.commentId}>
                <StCommentList>
                  {isOpen && <StUpdatebtn onClick={() => setUpDataCommentId(comment.commentId)}>수정</StUpdatebtn>}
                  {isOpen && (
                    <StDeleteBtn
                      onClick={async () => {
                        const commentRef = doc(db, "comments", comment.commentId);
                        await deleteDoc(commentRef);

                        dispatch({
                          type: REMOVE_COMMENT,
                          payload: comment.commentId,
                        });
                      }}
                    >
                      삭제
                    </StDeleteBtn>
                  )}
                  <StComment>{comment.comment}</StComment>
                </StCommentList>

                {/* {isOpen && <Stbutton onClick={openModal}>수정</Stbutton>} */}
                {isModal && (
                  // <Link to={`/post/commentup/${comment.commentId}`}>
                  //   <button>수정</button>
                  // </Link>
                  <StModalBox>
                    <StModalContents>
                      <CommentChange closeModal={closeModal} commentId={comment.commentId} />
                    </StModalContents>
                  </StModalBox>
                )}

                {isOpen && (
                  <button
                    onClick={async () => {
                      const commentRef = doc(db, "comments", comment.commentId);
                      await deleteDoc(commentRef);

                      dispatch({
                        type: REMOVE_COMMENT,
                        payload: comment.commentId,
                      });
                    }}
                  >
                    삭제
                  </button>
                )}
              </Stlist>
            );
          })}
      </div>
    </>
  );
};

export default PostComments;

const StCommentContainer = styled.div`
  position: relative;
  max-width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  padding-top: 40px;
  gap: 10px;
  color: var(--color-text);
`;

const StTitle = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
`;

const StForm = styled.form`
  position: absolute;
  top: 10px;
  left: 10px;
  margin: 10px auto;
`;

const StinputText = styled.input`
  position: absolute;
  top: 20px;
  left: -8px;
  width: 813px;
  height: 40px;
  background-color: var(--color-bg);
  border: 1px solid rgba(77, 77, 77, 0.5);
  border-radius: 3px;
  padding: 15px;
`;

const StCreateBtn = styled.button`
  position: absolute;
  top: 100px;
  left: 790px;
  width: 45px;
  height: 28px;
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  background: var(--color-accent);
  cursor: pointer;
`;

const Stlist = styled.div`
  position: relative;
  top: 100px;
  max-width: 850px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding-top: 80px;
  color: var(--color-text);
`;

const StUpdatebtn = styled.button`
  position: absolute;
  right: 50px;
  color: #a8a7a7c4;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--color-text);
    text-decoration: underline;
  }
`;

const StDeleteBtn = styled.button`
  position: absolute;
  right: 15px;
  color: #a8a7a7c4;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--color-text);
    text-decoration: underline;
  }
`;

const StCommentList = styled.div`
  position: absolute;
  top: 10px;
  left: 15px;
  border-bottom: 1px solid rgba(77, 77, 77, 0.5);
  width: 97%;
  overflow: auto;
`;

const StComment = styled.p`
  width: 95%;
  height: 50px;
  margin-top: 20px;
  padding: 15px;
`;

const StModalBox = styled.div`
  position: relative;
  width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  padding-top: 40px;
  color: var(--color-text);
`;

// const StModalBox = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: var(--color-text);
// `;

const StModalContents = styled.div`
  background-color: var(--color-bg);
  padding: 20px;
  width: 30%;
  height: 20%;
  border-radius: 8px;
`;
