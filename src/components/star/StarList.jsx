import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { styled } from "styled-components";
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
    dispatch(showMembers(starList));
  }, []);

  const updateLikeHandler = async (uid, likes, isLiked) => {
    // where()함수는 쿼리에 필터를 추가하기 위해 사용된다.
    const q = query(collection(db, "starList"), where("uid", "==", uid));
    const starListRef = await getDocs(q);
    console.log("1", starListRef.docs[0].ref);

    // 좋아요 수와 isLiked 상태를 업데이트
    await updateDoc(starListRef.docs[0].ref, {
      likes: isLiked ? likes - 1 : likes + 1,
      isLiked: !isLiked,
    });

    const newStarList = starList.map((prevStar) => (prevStar.uid === uid ? { ...prevStar, likes: isLiked ? prevStar.likes - 1 : prevStar.likes + 1, isLiked: !prevStar.isLiked } : prevStar));
    dispatch(showMembers(newStarList));
  };

  return (
    <>
      <Title>Stellar Cooks</Title>
      <Container>
        {starList.map((star) => {
          return (
            <Profile key={star.uid} onClick={() => navigate(`/star/members/${star.uid} `)}>
              <LikesWrapper>
                <LikeBtn
                  onClick={(e) => {
                    // 프로필 클릭 이벤트 전파 방지
                    e.stopPropagation();
                    if (star.uid) {
                      updateLikeHandler(star.uid, star.likes, star.isLiked);
                    }
                  }}
                  isLiked={star.isLiked}
                  // uid가 없는 경우 버튼 비활성화
                  disabled={!star.uid}
                >
                  <BiSolidLike size={25} />
                </LikeBtn>
                <p>{star.likes || 0}</p>
              </LikesWrapper>
              <Photo src={star.photoURL} alt="member" />
              <Name>{star.displayName}</Name>
              <Cmt>{star.profileCmt}</Cmt>
            </Profile>
          );
        })}
      </Container>
    </>
  );
}

const Title = styled.h2`
  text-align: center;
  font-size: 3rem;
  padding-top: 70px;
  padding-bottom: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Profile = styled.div`
  width: 220px;
  text-align: center;
  padding: 1rem;
  background-color: var(--color-white);
  border-radius: 20px;
  box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
  margin: 10px;
  -webkit-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
    transform: translateY(-10px);
  }
`;

const LikesWrapper = styled.div`
  margin-left: 180px;
`;

const LikeBtn = styled.button`
  cursor: pointer;
  border: none;
  /* margin-left: 180px; */
  background-color: var(--color-white);
  color: ${({ isLiked }) => (isLiked ? "#B46060" : "#D3D3D3")};

  &:hover {
    color: #b46060;
  }
`;

const Photo = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 20px;
`;

const Cmt = styled.p`
  padding-bottom: 10px;
`;
