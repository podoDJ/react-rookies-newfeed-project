import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { sortLikeMembers } from "../../redux/modules/logReducer";
import { useNavigate } from "react-router-dom";

const HomeComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(sortLikeMembers());
  const posts = useSelector((state) => state.posts);
  const starList = useSelector((state) => state.logReducer.members);
  const popSortPosts = posts.sort((a, b) => b.postWhoLiked.length - a.postWhoLiked.length);
  console.log(popSortPosts);

  return (
    <div style={{ marginBottom: "50px" }}>
      <S.Container>
        <S.Title>Stellar Post</S.Title>
        <S.CardContainer>
          {popSortPosts.slice(0, 5).map((item) => {
            return (
              <S.Card key={item.id} onClick={() => navigate(`/post/${item.postId}`)}>
                <S.Like>❤️ {item.postWhoLiked?.length || 0}</S.Like>
                <S.Name>{item.postTitle}</S.Name>
                <S.Cmt>작성자</S.Cmt>
              </S.Card>
            );
          })}
        </S.CardContainer>
      </S.Container>
      <S.Container>
        <S.Title>Stellar Member</S.Title>
        <S.CardContainer>
          {starList.slice(0, 5).map((item) => {
            return (
              <S.Card key={item.id}>
                <S.Like>❤️ {item.likes}</S.Like>
                <S.Img src={item.photoURL} />
                <S.Name>{item.displayName}</S.Name>
                <S.Cmt>{item.profileCmt}</S.Cmt>
              </S.Card>
            );
          })}
        </S.CardContainer>
      </S.Container>
    </div>
  );
};

export default HomeComp;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.p`
    font-size: 2rem;
    font-weight: bold;
    margin: 40px auto;
    color: #4d4d4d;
  `,
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
    margin: 0 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    cursor: pointer;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
      transform: translateY(-10px);
    }
  `,
  Img: styled.img`
    width: 250px;
    height: 250px;
    border-radius: 100%;
  `,
  Name: styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 20px;
    color: #4d4d4d;
  `,
  Cmt: styled.p`
    padding-bottom: 10px;
    color: #4d4d4d;
  `,
  Like: styled.p`
    font-size: 20px;
    margin: 0 0 20px auto;
    font-weight: bold;
  `,
};
