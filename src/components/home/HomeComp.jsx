import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { sortLikePosts, showPosts } from "../../redux/modules/postWrite";
import { useEffect } from "react";
import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "../../../src/firebase";

const HomeComp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const newArr = [];
    const fetchData = async () => {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newArr.push({ id: doc.id, ...doc.data() });
      });
      dispatch(showPosts(newArr));
      dispatch(sortLikePosts());
      return newArr;
    };
    fetchData();
  }, []);

  const popPosts = useSelector((state) => state.posts);
  console.log(popPosts);

  return (
    <>
      <S.Container>
        <p>인기 게시글</p>
        <S.CardContainer>
          {popPosts.slice(0, 5).map((item) => {
            return (
              <S.Card key={item.id}>
                <p>{item.like}</p>
                <p>{item.postTitle}</p>
                <p>{item.id}</p>
              </S.Card>
            );
          })}
        </S.CardContainer>
      </S.Container>
      <S.Container>
        <p>인기 멤버</p>
        <S.CardContainer>
          <S.Card>
            <p>이름</p>
            <p>좋아요</p>
            <p>게시글</p>
          </S.Card>
        </S.CardContainer>
      </S.Container>
    </>
  );
};

export default HomeComp;

const S = {
  Container: styled.div``,
  CardContainer: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: auto;
    padding: 20px;
  `,
  Card: styled.div`
    background-color: white;
    min-width: 250px;
    height: 400px;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
  `,
};
