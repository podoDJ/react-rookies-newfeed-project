import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT, REMOVE_COMMENT, baseComment } from "../../redux/modules/comment";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Await, Link } from "react-router-dom";
import { styled } from "styled-components";
import CommentChange from "./CommentChange";

const PostComments = ({ post, id }) => {
  const uid = useSelector((state) => state.logReducer.user.uid);
  //2023-07-02 22:23 동준 commentUser 추가(댓글 작성자)
  const commentUser = useSelector((state) => state.logReducer.user.displayName);
  const comments = useSelector((state) => {
    return state.comment;
  });

  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [upDataCommentId, setUpDataCommentId] = useState("");

  //임시방편 패치 : 새로 작성한 글에 작성자가 바로 댓글을 달 때 렌더링이 되지 않아 표시되지 않는 이슈가 있었음. 
  //일단 useState와 useDispatch의 의존성배열에 on/off트리거로 임시패치 해 놓음. useEffect와 Redux에 대한 공부가 필요.
   
  const [trigger, setTrigger] = useState(false)
  const triggerOnOff = () => {
    console.log("trigger==>",trigger)
    setTrigger((prev)=>!prev)
  }
  const closeModal = () => {
    setUpDataCommentId(false);
  };

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
  }, [dispatch, trigger]);
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
            await setDoc(commentDocRef, { commentId: docRef.id, postId: id, userId: uid, commentUser: commentUser }, { merge: true });

            dispatch({
              type: ADD_COMMENT,
              payload: {
                postId: post.id,
                userId: uid,
                //2023-07-02 22:23 동준 commentUser 추가(댓글 작성자)
                commentUser: commentUser,
                commentId: docRef.id,
                comment,
              },
            });
            triggerOnOff()
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
                <StCmtUser>{comment.commentUser}</StCmtUser>
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

const StModalContents = styled.div`
  background-color: var(--color-bg);
  padding: 20px;
  width: 30%;
  height: 20%;
  border-radius: 8px;
`;

const StCmtUser = styled.div`
  color: #6e6e6ec4;
  text-align: right;
  margin-right: 30px;
`;
