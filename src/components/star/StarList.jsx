import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "styled-components";
import { db } from "../../firebase";

export default function StarList() {
  const [starList, setStarList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "starList"));
      const querySnapshot = await getDocs(q);
      const initialStarList = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.uid,
          ...doc.data(),
        };
        console.log("data", data);
        initialStarList.push(data);
      });
      setStarList(initialStarList);
    };
    fetchData();
  }, []);

  return (
    <>
      <Title>Stellar Cooks</Title>
      <Container>
        {starList.map((star) => {
          return (
            <Profile key={star.uid}>
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
`;

const Profile = styled.div`
  width: 220px;
  text-align: center;
  padding: 1rem;

  background-color: var(--color-white);
  border-radius: 20px;
  box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
  margin: 6px;
  -webkit-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
`;

const Photo = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  margin-top: 10px;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 20px;
`;

const Cmt = styled.p`
  padding-bottom: 10px;
`;
