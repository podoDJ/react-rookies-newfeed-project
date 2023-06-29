import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { styled } from "styled-components";
import { BiSolidLike } from "react-icons/bi";
import { db } from "../../firebase";
// import InfiniteScroll from "react-infinite-scroll-component";

export default function StarList() {
  const navigate = useNavigate();
  const [starList, setStarList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // q = 요청 객체
      const q = query(collection(db, "starList"));
      const querySnapshot = await getDocs(q);
      const initialStarList = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initialStarList.push(data);
      });
      setStarList(initialStarList);
    };

    fetchData();
  }, [setStarList]);

  const updateLikeHandler = async (uid, likes, isLiked) => {
    const q = query(collection(db, "starList"), where("uid", "==", uid));
    const starListRef = await getDocs(q);
    // console.log(starListRef);

    console.log("1", starListRef.docs[0].ref);
    // 업데이트할 문서를 참조
    // const starListRef = doc(db, "starList", uid);

    // 좋아요 수와 isLiked 상태를 업데이트
    await updateDoc(starListRef.docs[0].ref, {
      likes: isLiked ? likes - 1 : likes + 1,
      isLiked: !isLiked,
    });

    // starList 상태 업데이트
    setStarList((prevStarList) => prevStarList.map((star) => (star.id === uid ? { ...star, isLiked: !isLiked } : star)));
  };

  return (
    <>
      <Title>Stellar Cooks</Title>
      <Container>
        {starList.map((star) => {
          return (
            <Profile key={star.uid} onClick={() => navigate(`/star/members/${star.uid}`)}>
              <LikesWrapper>
                <LikeBtn onClick={() => updateLikeHandler(star.uid, star.likes, star.isLiked)} isLiked={star.isLiked}>
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
