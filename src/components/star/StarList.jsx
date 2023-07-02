import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore";
import { S } from "../star/starList.styles";
import { BiSolidLike } from "react-icons/bi";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { showMembers } from "../../redux/modules/logReducer";
// import InfiniteScroll from "react-infinite-scroll-component";

export default function StarList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const starList = useSelector((state) => state.logReducer.members);

  useEffect(() => {
    // showMembers 액션을 디스패치하여 멤버 정보 표시
    dispatch(showMembers(starList));
  }, []);

  const updateLikeHandler = async (memberId) => {
    // 해당 memberId와 일치하는 starList 컬렉션의 문서를 쿼리
    let target = {};

    const q = query(collection(db, "members"), where("memberId", "==", memberId));
    const docSnap = await getDocs(q);
    docSnap.forEach(async (x) => {
      target.id = x.id;
      target.likes = x.data().likes;
    });

    // 좋아요 수 업데이트
    await updateDoc(doc(db, "members", target.id), { likes: target.likes + 1, isLiked: true });

    // 새로운 starList 업데이트
    const newStarList = starList.map((x) => (x.memberId === memberId ? { ...x, likes: x.likes + 1 } : x));
    dispatch(showMembers(newStarList));
  };

  return (
    <>
      <S.Title>Stellar Cooks</S.Title>
      <S.Container>
        {starList.map((star) => {
          return (
            <S.Profile key={star.memberId} onClick={() => navigate(`/star/members/${star.memberId}/guestbook `)}>
              <S.LikesWrapper>
                <S.LikeBtn
                  onClick={(e) => {
                    // 프로필 클릭 이벤트 전파 방지
                    e.stopPropagation();
                    updateLikeHandler(star.memberId);
                  }}
                  // star.isLiked이 true일 때만 liked prop을 전달
                  isLiked={star.isLiked ? true : undefined}
                >
                  <BiSolidLike size={25} />
                </S.LikeBtn>
                <S.LikeCut>{star.likes || 0}</S.LikeCut>
              </S.LikesWrapper>
              <S.Photo src={star.photoURL} alt="member" />
              <S.Name>{star.displayName}</S.Name>
              <S.Cmt>{star.profileCmt}</S.Cmt>
            </S.Profile>
          );
        })}
      </S.Container>
    </>
  );
}
