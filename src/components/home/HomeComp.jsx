import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { sortLikePosts, showPosts } from "../../redux/modules/postWrite";
import { useEffect } from "react";
import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "../../../src/firebase";
import { showMembers, sortLikeMembers } from "../../redux/modules/logReducer";

const HomeComp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortLikePosts());
    dispatch(sortLikeMembers());
  }, []);

  const popPosts = useSelector((state) => state.posts);
  const StarList = useSelector((state) => state.logReducer.members);

  return (
    <>
      <S.Container>
        <p>인기 게시글</p>
        <S.CardContainer>
          {popPosts.slice(0, 5).map((item) => {
            return (
              <S.Card key={item.id}>
                <p>{item.postWhoLiked?.length || 0}</p>
                <p>{item.postTitle}</p>
                <p>{item.postDate}</p>
                <p>작성자</p>
              </S.Card>
            );
          })}
        </S.CardContainer>
      </S.Container>
      <S.Container>
        <p>인기 멤버</p>
        <S.CardContainer>
          {StarList.slice(0, 5).map((item) => {
            return (
              <S.Card key={item.id}>
                <p>{item.displayName}</p>
                <p>{item.likes}</p>
                <p>게시글</p>
              </S.Card>
            );
          })}
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
